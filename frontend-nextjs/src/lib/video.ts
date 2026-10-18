import { createBlurUp } from "@mux/blurup";
import { buildScopedByKey } from "@/lib/cache";

export interface VimeoOEmbed {
  thumbnail_url?: string;
  title?: string;
  width?: number;
  height?: number;
}

// The same video recurs across pages; one oEmbed request per URL for the build.
export const fetchVimeoOEmbed = buildScopedByKey(async (url): Promise<VimeoOEmbed | null> => {
  try {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
    );
    return response.ok ? ((await response.json()) as VimeoOEmbed) : null;
  } catch {
    console.error("Failed to fetch Vimeo thumbnail for", url);
    return null;
  }
});

export const fetchMuxBlurUp = buildScopedByKey((playbackId) => createBlurUp(playbackId, {}));
