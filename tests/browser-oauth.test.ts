import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from "@jest/globals";

import { CALLBACK_PATH, createBrowserOAuth } from "../src/browser-oauth.js";

const SERVER_URL = "https://www.foundrole.com/mcp";
const AUTHORIZATION_URL = new URL("https://www.foundrole.com/oauth/authorize");

describe("createBrowserOAuth", () => {
  let stateDir: string;
  const openBrowser = jest.fn(async (_url: string) => {});

  beforeEach(() => {
    stateDir = fs.mkdtempSync(path.join(os.tmpdir(), "foundrole-oauth-"));
    openBrowser.mockClear();
  });

  afterEach(() => {
    fs.rmSync(stateDir, { force: true, recursive: true });
  });

  const create = () =>
    createBrowserOAuth({ openBrowser, serverUrl: SERVER_URL, stateDir });

  test("registers a loopback redirect URL and keeps it across restarts", async () => {
    const first = await create();
    const second = await create();

    expect(String(first.provider.redirectUrl)).toMatch(
      new RegExp(`^http://127\\.0\\.0\\.1:\\d+${CALLBACK_PATH}$`)
    );
    expect(second.provider.redirectUrl).toBe(first.provider.redirectUrl);
    expect(first.provider.clientMetadata.redirect_uris).toEqual([
      first.provider.redirectUrl,
    ]);
    expect(first.provider.clientMetadata.token_endpoint_auth_method).toBe(
      "none"
    );
  });

  test("stores tokens privately and reads them back in a new process", async () => {
    const { provider } = await create();
    const tokens = { access_token: "access", token_type: "Bearer" };

    await provider.saveTokens(tokens);

    expect(await (await create()).provider.tokens()).toEqual(tokens);
    const stateFile = path.join(stateDir, "mcp-auth.json");
    expect(fs.statSync(stateFile).mode & 0o777).toBe(0o600);
  });

  test("forgets the client and its tokens when the client is invalidated", async () => {
    const { provider } = await create();
    await provider.saveClientInformation?.({ client_id: "client-1" });
    await provider.saveTokens({ access_token: "access", token_type: "Bearer" });

    await provider.invalidateCredentials?.("client");

    expect(await provider.clientInformation()).toBeUndefined();
    expect(await provider.tokens()).toBeUndefined();
  });

  test("opens the browser and returns the code the callback delivers", async () => {
    const { authorizationCode, provider } = await create();
    const state = await provider.state?.();

    await provider.redirectToAuthorization(AUTHORIZATION_URL);
    const response = await fetch(
      `${String(provider.redirectUrl)}?code=code-1&state=${state}`
    );

    expect(openBrowser).toHaveBeenCalledWith(AUTHORIZATION_URL.toString());
    expect(response.status).toBe(200);
    expect(await authorizationCode()).toBe("code-1");
  });

  test("rejects a callback whose state does not match", async () => {
    const { authorizationCode, provider } = await create();
    await provider.state?.();

    await provider.redirectToAuthorization(AUTHORIZATION_URL);
    const response = await fetch(
      `${String(provider.redirectUrl)}?code=code-1&state=forged`
    );

    expect(response.status).toBe(400);
    await expect(authorizationCode()).rejects.toThrow(
      "FoundRole sign-in failed"
    );
  });

  test("surfaces the sign-in address when no browser can be opened", async () => {
    openBrowser.mockRejectedValueOnce(
      new Error("Open this address in a browser to sign in to FoundRole")
    );
    const { authorizationCode, provider } = await create();

    await expect(
      provider.redirectToAuthorization(AUTHORIZATION_URL)
    ).rejects.toThrow("Open this address in a browser");
    await fetch(`${String(provider.redirectUrl)}?error=access_denied`);
    await expect(authorizationCode()).rejects.toThrow("access_denied");
  });
});
