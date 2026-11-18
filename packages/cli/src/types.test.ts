import { describe, expect, test } from "bun:test";

import packageJson from "../package.json" with { type: "json" };
import { DEFAULT_REGISTRY } from "./types";

describe("the default registry", () => {
  test("reads the release this CLI came from, not a branch", () => {
    expect(DEFAULT_REGISTRY).toContain(`/v${packageJson.version}/`);
    expect(DEFAULT_REGISTRY).not.toContain("/main/");
  });

  test("keeps the name a template", () => {
    expect(DEFAULT_REGISTRY).toContain("/public/r/{name}.json");
  });
});
