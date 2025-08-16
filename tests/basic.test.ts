/**
 * Basic test to verify the testing setup works
 */

import { describe, expect, test } from "@jest/globals";

describe("Basic Test Suite", () => {
  test("basic arithmetic works", () => {
    expect(1 + 1).toBe(2);
  });

  test("string concatenation works", () => {
    expect("hello" + " " + "world").toBe("hello world");
  });

  test("boolean logic works", () => {
    expect(true && true).toBe(true);
    expect(true && false).toBe(false);
  });

  test("async function works", async () => {
    const result = await Promise.resolve("async test");
    expect(result).toBe("async test");
  });
});
