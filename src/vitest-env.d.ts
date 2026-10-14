import "vitest";
import type { AxeMatchers } from "vitest-axe/matchers";

declare module "vitest" {
  export interface Assertion<R = void, T = any> extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

declare global {
  namespace jest {
    interface Matchers<R, T = {}> extends AxeMatchers {}
  }
}
