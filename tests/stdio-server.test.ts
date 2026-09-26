// @ts-nocheck - module mocks stand in for SDK classes

import { beforeEach, describe, expect, jest, test } from "@jest/globals";

jest.mock("@modelcontextprotocol/sdk/client/index.js", () => ({
  Client: jest.fn(),
}));

jest.mock("@modelcontextprotocol/sdk/server/index.js", () => ({
  Server: jest.fn(),
}));

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: jest.fn(),
}));

jest.mock("@modelcontextprotocol/sdk/client/streamableHttp.js", () => ({
  StreamableHTTPClientTransport: jest.fn(),
}));

jest.mock("@modelcontextprotocol/sdk/client/auth.js", () => ({
  UnauthorizedError: class UnauthorizedError extends Error {},
}));

jest.mock("../src/client-detector.js", () => ({
  extractClientInfoFromParent: jest.fn(),
}));

jest.mock("../src/proxy-server.js", () => ({
  proxyServer: jest.fn(),
}));

jest.mock("../src/browser-oauth.js", () => ({
  createBrowserOAuth: jest.fn(),
}));

import { UnauthorizedError } from "@modelcontextprotocol/sdk/client/auth.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createBrowserOAuth } from "../src/browser-oauth.js";
import { extractClientInfoFromParent } from "../src/client-detector.js";
import { proxyServer } from "../src/proxy-server.js";
import {
  BRIDGE_CAPABILITIES,
  BRIDGE_SERVER_INFO,
  startStdioServer,
} from "../src/stdio-server.js";

const SERVER_URL = "https://www.foundrole.com/mcp";
const CLIENT_INFO = { name: "macOS//TestApp", version: "1.2.3" };

describe("startStdioServer", () => {
  let upstreamClient;
  let stdioServer;
  const authProvider = { redirectUrl: "http://127.0.0.1:1/callback" };
  const authorizationCode = jest.fn();

  const getUpstream = () => proxyServer.mock.calls[0][0].getClient;

  beforeEach(() => {
    jest.clearAllMocks();
    upstreamClient = { connect: jest.fn(async () => {}) };
    stdioServer = { connect: jest.fn(async () => {}) };
    Client.mockImplementation(() => upstreamClient);
    Server.mockImplementation(() => stdioServer);
    StdioServerTransport.mockImplementation(() => ({}));
    StreamableHTTPClientTransport.mockImplementation(() => ({}));
    extractClientInfoFromParent.mockResolvedValue(CLIENT_INFO);
    proxyServer.mockResolvedValue(undefined);
    createBrowserOAuth.mockResolvedValue({
      authorizationCode,
      provider: authProvider,
    });
  });

  test("serves stdio right away with the bridge identity, before the upstream connects", async () => {
    upstreamClient.connect.mockImplementation(() => new Promise(() => {}));

    const server = await startStdioServer({ url: SERVER_URL });

    expect(server).toBe(stdioServer);
    expect(Server).toHaveBeenCalledWith(BRIDGE_SERVER_INFO, {
      capabilities: BRIDGE_CAPABILITIES,
    });
    expect(stdioServer.connect).toHaveBeenCalled();
    expect(proxyServer).toHaveBeenCalledWith(
      expect.objectContaining({
        server: stdioServer,
        serverCapabilities: BRIDGE_CAPABILITIES,
      })
    );
  });

  test("connects upstream with the parent client's identity and the OAuth provider", async () => {
    await startStdioServer({ url: SERVER_URL });

    expect(await getUpstream()()).toBe(upstreamClient);
    expect(StreamableHTTPClientTransport).toHaveBeenCalledWith(
      new URL(SERVER_URL),
      { authProvider }
    );
    expect(Client).toHaveBeenCalledWith(CLIENT_INFO, { capabilities: {} });
    expect(createBrowserOAuth).toHaveBeenCalledWith({ serverUrl: SERVER_URL });
  });

  test("reuses one upstream connection across requests", async () => {
    await startStdioServer({ url: SERVER_URL });

    await getUpstream()();
    await getUpstream()();

    expect(upstreamClient.connect).toHaveBeenCalledTimes(1);
  });

  test("finishes the browser sign-in and reconnects when the server demands auth", async () => {
    const unauthorizedTransport = { finishAuth: jest.fn(async () => {}) };
    const signedInTransport = {};
    StreamableHTTPClientTransport.mockImplementationOnce(
      () => unauthorizedTransport
    ).mockImplementationOnce(() => signedInTransport);
    upstreamClient.connect.mockRejectedValueOnce(new UnauthorizedError());
    authorizationCode.mockResolvedValueOnce("code-from-browser");

    await startStdioServer({ url: SERVER_URL });

    expect(await getUpstream()()).toBe(upstreamClient);
    expect(unauthorizedTransport.finishAuth).toHaveBeenCalledWith(
      "code-from-browser"
    );
    expect(upstreamClient.connect).toHaveBeenLastCalledWith(signedInTransport);
  });

  test("keeps serving when sign-in cannot start, and retries on the next request", async () => {
    const noBrowser = new Error("Open this address in a browser");
    upstreamClient.connect
      .mockRejectedValueOnce(noBrowser)
      .mockRejectedValueOnce(noBrowser)
      .mockResolvedValueOnce(undefined);

    const server = await startStdioServer({ url: SERVER_URL });
    await new Promise((resolve) => setImmediate(resolve));

    expect(server).toBe(stdioServer);
    await expect(getUpstream()()).rejects.toThrow(
      "Open this address in a browser"
    );
    expect(await getUpstream()()).toBe(upstreamClient);
    expect(upstreamClient.connect).toHaveBeenCalledTimes(3);
  });

  test("does not start a sign-in for errors other than Unauthorized", async () => {
    upstreamClient.connect.mockRejectedValue(new Error("offline"));

    await startStdioServer({ url: SERVER_URL });

    await expect(getUpstream()()).rejects.toThrow("offline");
    expect(authorizationCode).not.toHaveBeenCalled();
  });
});
