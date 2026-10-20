import { describe, it, expect } from "vitest";
import { validateName, validateImageUrl } from "@/lib/love";

describe("name validation", () => {
  it("rejects empty and whitespace-only names", () => {
    expect(validateName("").ok).toBe(false);
    expect(validateName("   ").ok).toBe(false);
  });
  it("trims a valid name", () => {
    expect(validateName("  Ayesha ")).toEqual({ ok: true, name: "Ayesha" });
  });
});

describe("image url", () => {
  it("rejects non-http schemes", () => {
    expect(validateImageUrl("javascript:alert(1)")).toBeNull();
  });
});
