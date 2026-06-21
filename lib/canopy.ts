// Generic client for the Canopy CMS. One call per category (by slug) returns
// that category's entries; build section-specific helpers on top of this.

const DEFAULT_BASE_URL = "https://canopy.alinsafawi.com/api/v1/golden-garden";

function config() {
  const baseUrl = process.env.CANOPY_API_URL ?? DEFAULT_BASE_URL;
  const apiKey =
    process.env.CANOPY_API_KEY ?? process.env.NEXT_PUBLIC_CANOPY_API_KEY;
  return { baseUrl, apiKey };
}

// CMS field values come back as strings (booleans included, e.g. "true").
export type CanopyEntry = {
  id: string;
  [field: string]: string;
};

const isDefault = (entry: CanopyEntry) => entry.Default === "true";

const VIDEO_EXTENSIONS = ["mp4", "webm", "ogg", "ogv", "mov", "m4v"];

// Classify a CMS url field as image or video by its file extension,
// ignoring any query string.
export function mediaType(url: string): "image" | "video" {
  const path = url.split(/[?#]/)[0];
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  return VIDEO_EXTENSIONS.includes(ext) ? "video" : "image";
}

/**
 * Fetches all entries for a category by slug. Returns [] when the CMS is
 * unreachable or the API key is missing.
 */
export async function getCategoryEntries(slug: string): Promise<CanopyEntry[]> {
  const { baseUrl, apiKey } = config();
  if (!apiKey) {
    console.warn("Canopy API key is not set — no entries.");
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/${slug}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      // Content rarely changes; revalidate hourly rather than on every request.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`Canopy "${slug}" request failed (${res.status}).`);
      return [];
    }

    const json = (await res.json()) as { data?: CanopyEntry[] };
    return json.data ?? [];
  } catch (err) {
    console.warn(`Canopy "${slug}" request errored.`, err);
    return [];
  }
}

/**
 * Returns the last entry of a category flagged as the default, or null when
 * there is none.
 */
export async function getDefaultEntry(slug: string): Promise<CanopyEntry | null> {
  const entries = await getCategoryEntries(slug);
  return [...entries].reverse().find(isDefault) ?? null;
}
