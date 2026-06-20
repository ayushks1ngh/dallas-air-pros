import { describe, it, expect } from "vitest";
import { BUSINESS } from "@/lib/constants";

describe("constants", () => {
  it("has required business info", () => {
    expect(BUSINESS.phone).toBeDefined();
    expect(BUSINESS.email).toContain("@");
    expect(BUSINESS.phoneHref.startsWith("tel:")).toBe(true);
  });
});
