/**
 * Maps a guest name (or slug) → local image filenames in public/images/guests/.
 *
 * Resolution order in components:
 *   1. local file at /images/guests/<slug>.jpg
 *   2. Supabase guest.photo_url
 *   3. typographic placeholder
 *
 * To pin a custom slug for a specific guest, add an override below.
 */

export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const overrides: Record<string, string> = {
  // "Original Guest Name": "custom-slug",
};

export const guestSlug = (name: string): string => {
  if (!name) return "";
  return overrides[name] ?? slugify(name);
};

export const guestPortrait = (name: string): string =>
  `/images/guests/${guestSlug(name)}.jpg`;

export const guestActionShot = (name: string): string =>
  `/images/guests/${guestSlug(name)}-action.jpg`;
