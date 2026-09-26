import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";

import type { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import type {
  OAuthClientInformationMixed,
  OAuthClientMetadata,
  OAuthTokens,
} from "@modelcontextprotocol/sdk/shared/auth.js";

export const OAUTH_CLIENT_NAME = "FoundRole MCP bridge";
export const CALLBACK_PATH = "/callback";
export const LOOPBACK_HOST = "127.0.0.1";
export const SIGN_IN_TIMEOUT_MS = 5 * 60 * 1000;

const STATE_FILE_NAME = "mcp-auth.json";
const SIGNED_IN_PAGE =
  "<!doctype html><title>FoundRole</title><p>Signed in to FoundRole. You can close this tab and return to your assistant.</p>";
const SIGN_IN_FAILED_PAGE =
  "<!doctype html><title>FoundRole</title><p>FoundRole sign-in did not complete. Return to your assistant and try again.</p>";

export interface ServerAuthState {
  callbackPort?: number;
  clientInformation?: OAuthClientInformationMixed;
  codeVerifier?: string;
  oauthState?: string;
  tokens?: OAuthTokens;
}

export type BrowserOpener = (url: string) => Promise<void>;

export interface BrowserOAuth {
  provider: OAuthClientProvider;
  authorizationCode: () => Promise<string>;
}

export const defaultStateDir = (): string =>
  path.join(
    process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config"),
    "foundrole"
  );

export const openInBrowser: BrowserOpener = (url) =>
  new Promise((resolve, reject) => {
    const [command, args] =
      process.platform === "darwin"
        ? ["open", [url]]
        : process.platform === "win32"
          ? ["cmd", ["/c", "start", "", url]]
          : ["xdg-open", [url]];
    const noBrowser = new Error(
      `Open this address in a browser to sign in to FoundRole: ${url}`
    );
    const child = spawn(command, args, { stdio: "ignore" });
    child.once("error", () => reject(noBrowser));
    child.once("exit", (code) => (code === 0 ? resolve() : reject(noBrowser)));
  });

const findFreePort = (): Promise<number> =>
  new Promise((resolve, reject) => {
    const probe = http.createServer();
    probe.once("error", reject);
    probe.listen(0, LOOPBACK_HOST, () => {
      const { port } = probe.address() as AddressInfo;
      probe.close(() => resolve(port));
    });
  });

class AuthStateStore {
  constructor(
    private readonly filePath: string,
    private readonly serverKey: string
  ) {}

  read(): ServerAuthState {
    try {
      const all = JSON.parse(fs.readFileSync(this.filePath, "utf8")) as Record<
        string,
        ServerAuthState
      >;
      return all[this.serverKey] ?? {};
    } catch {
      return {};
    }
  }

  update(changes: ServerAuthState): void {
    this.write({ ...this.read(), ...changes });
  }

  forget(...keys: (keyof ServerAuthState)[]): void {
    const next = this.read();
    for (const key of keys) delete next[key];
    this.write(next);
  }

  private write(serverState: ServerAuthState): void {
    let all: Record<string, ServerAuthState> = {};
    try {
      all = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    } catch {
      all = {};
    }
    all[this.serverKey] = serverState;
    fs.mkdirSync(path.dirname(this.filePath), { mode: 0o700, recursive: true });
    fs.writeFileSync(this.filePath, `${JSON.stringify(all, null, 2)}\n`, {
      mode: 0o600,
    });
  }
}

const awaitCallback = (
  port: number,
  expectedState: string | undefined
): Promise<string> =>
  new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url ?? "/", `http://${LOOPBACK_HOST}`);
      if (requestUrl.pathname !== CALLBACK_PATH) {
        response.writeHead(404).end();
        return;
      }
      const code = requestUrl.searchParams.get("code");
      const stateMatches =
        expectedState === undefined ||
        requestUrl.searchParams.get("state") === expectedState;
      const succeeded = Boolean(code) && stateMatches;
      response
        .writeHead(succeeded ? 200 : 400, { "Content-Type": "text/html" })
        .end(succeeded ? SIGNED_IN_PAGE : SIGN_IN_FAILED_PAGE);
      clearTimeout(timeout);
      server.close();
      if (succeeded && code) {
        resolve(code);
      } else {
        reject(
          new Error(
            `FoundRole sign-in failed: ${requestUrl.searchParams.get("error") ?? "invalid callback"}`
          )
        );
      }
    });
    const timeout = setTimeout(() => {
      server.close();
      reject(new Error("FoundRole sign-in timed out; start the server again"));
    }, SIGN_IN_TIMEOUT_MS);
    timeout.unref();
    server.once("error", (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    server.listen(port, LOOPBACK_HOST);
  });

export const createBrowserOAuth = async ({
  openBrowser = openInBrowser,
  serverUrl,
  stateDir = defaultStateDir(),
}: {
  serverUrl: string;
  openBrowser?: BrowserOpener;
  stateDir?: string;
}): Promise<BrowserOAuth> => {
  const store = new AuthStateStore(
    path.join(stateDir, STATE_FILE_NAME),
    serverUrl
  );
  const callbackPort = store.read().callbackPort ?? (await findFreePort());
  store.update({ callbackPort });
  const redirectUrl = `http://${LOOPBACK_HOST}:${callbackPort}${CALLBACK_PATH}`;
  let pendingCode: Promise<string> | undefined;

  const provider: OAuthClientProvider = {
    clientInformation: () => store.read().clientInformation,
    get clientMetadata(): OAuthClientMetadata {
      return {
        client_name: OAUTH_CLIENT_NAME,
        grant_types: ["authorization_code", "refresh_token"],
        redirect_uris: [redirectUrl],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      };
    },
    codeVerifier: () => {
      const { codeVerifier } = store.read();
      if (!codeVerifier) throw new Error("No PKCE code verifier saved");
      return codeVerifier;
    },
    invalidateCredentials: (scope) => {
      if (scope === "all" || scope === "client") {
        store.forget("clientInformation", "tokens");
      }
      if (scope === "all" || scope === "tokens") store.forget("tokens");
      if (scope === "all" || scope === "verifier") store.forget("codeVerifier");
    },
    redirectToAuthorization: async (authorizationUrl) => {
      pendingCode = awaitCallback(callbackPort, store.read().oauthState);
      pendingCode.catch(() => undefined);
      await openBrowser(authorizationUrl.toString());
    },
    get redirectUrl() {
      return redirectUrl;
    },
    saveClientInformation: (clientInformation) =>
      store.update({ clientInformation }),
    saveCodeVerifier: (codeVerifier) => store.update({ codeVerifier }),
    saveTokens: (tokens) => store.update({ tokens }),
    state: () => {
      const oauthState = randomBytes(16).toString("hex");
      store.update({ oauthState });
      return oauthState;
    },
    tokens: () => store.read().tokens,
  };

  return {
    authorizationCode: () => {
      if (!pendingCode) {
        return Promise.reject(new Error("FoundRole sign-in was not started"));
      }
      return pendingCode;
    },
    provider,
  };
};
