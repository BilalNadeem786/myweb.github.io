import { describe, expect, it } from "vitest";
import { MEMORY_PHOTO_SRC } from "@/lib/photo";

describe("permanent memory photo", () => {
  it("uses one project-owned photo without browser state", async () => {
    expect(MEMORY_PHOTO_SRC).toBe("/our-photo.jpg");
    const reloaded = await import("@/lib/photo");
    expect(reloaded.MEMORY_PHOTO_SRC).toBe("/our-photo.jpg");
  });
});