import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import SanityImage from "@/fields/SanityImage";
import MuxVideo from "@/fields/MuxVideo";
import VimeoVideo from "@/fields/VimeoVideo";

interface Props {
  mediaData: MediaFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
  mediaId?: string | null;
}

interface VimeoOEmbed {
  thumbnail_url?: string;
  title?: string;
  width?: number;
  height?: number;
}

// Server-side so the ratio and placeholder are in the first paint; consumers crop rather than letterbox.
async function fetchVimeoOEmbed(url: string): Promise<VimeoOEmbed> {
  try {
    const response = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
    );
    if (response.ok) return (await response.json()) as VimeoOEmbed;
  } catch {
    console.error("Failed to fetch Vimeo oEmbed for", url);
  }
  return {};
}

export default async function SanityMedia({
  mediaData,
  layout = "width",
  sizes = [100, 100, 100],
  loading = "lazy",
  mediaId,
}: Props) {
  if (mediaData?.type === "image") {
    return (
      <SanityImage
        imageData={mediaData.image}
        layout={layout}
        sizes={sizes}
        loading={loading}
        mediaId={mediaId}
      />
    );
  }

  if (mediaData?.type === "video") {
    return (
      <MuxVideo
        videoData={mediaData.video}
        layout={layout}
        loading={loading}
        mediaId={mediaId}
      />
    );
  }

  if (mediaData?.type === "vimeo" && mediaData.vimeo?.url) {
    const oEmbed = await fetchVimeoOEmbed(mediaData.vimeo.url);
    const aspectRatio =
      oEmbed.width && oEmbed.height ? oEmbed.width / oEmbed.height : undefined;

    return (
      <VimeoVideo
        url={mediaData.vimeo.url}
        aspectRatio={aspectRatio}
        thumbnailUrl={oEmbed.thumbnail_url}
        title={oEmbed.title}
        layout={layout}
        loading={loading}
        mediaId={mediaId}
      />
    );
  }

  return null;
}
