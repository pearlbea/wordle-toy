import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as axeMatchers from "vitest-axe/matchers";

// Extend Vitest's expect with axe accessibility matchers
expect.extend(axeMatchers);

// Automatically unmount components after each test
afterEach(() => {
  cleanup();
});
