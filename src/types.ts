export interface ProxyConfig {
  debugMode: boolean;
  targetUrl: string;
}

export interface ClientInfo {
  name: string;
  version: string;
  [x: string]: unknown;
}

export interface VersionExtractionResult {
  source: "executable" | "plist" | "fallback";
  error?: string;
  version?: string;
}

export interface ApplicationInfo {
  name: string;
  version: string;
  bundlePath?: string;
  executablePath?: string;
}

export interface PlistInfo {
  CFBundleShortVersionString?: string;
  CFBundleVersion?: string;
  CFBundleVersionString?: string;
}
