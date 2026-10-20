export function validateName(raw: string): { ok: true; name: string } | { ok: false; error: string } {
  const name = raw.trim().replace(/\s+/g, " ");
  if (!name) return { ok: false, error: "Please write your name, sweetheart ♡" };
  if (name.length > 40) return { ok: false, error: "That's a little long — 40 characters at most ♡" };
  return { ok: true, name };
}

export function validateImageUrl(raw: string): string | null {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
