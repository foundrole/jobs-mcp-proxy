/**
 * Custom Jest matcher type declarations
 */

import type { expect } from "@jest/globals";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidUrl(): R;
    }
  }
}

declare module "expect" {
  interface Matchers<R> {
    toBeValidUrl(): R;
  }
}

export {};
