import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import { fetchVimeoOEmbed } from "@/lib/video";
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
    return <MuxVideo videoData={mediaData.video} layout={layout} mediaId={mediaId} />;
  }

  if (mediaData?.type === "vimeo" && mediaData.vimeo?.url) {
    const oEmbed = await fetchVimeoOEmbed(mediaData.vimeo.url);
    // Server-side so the ratio and placeholder are in the first paint; consumers crop rather than letterbox.
    const aspectRatio = oEmbed?.width && oEmbed.height ? oEmbed.width / oEmbed.height : undefined;

    return (
      <VimeoVideo
        url={mediaData.vimeo.url}
        aspectRatio={aspectRatio}
        thumbnailUrl={oEmbed?.thumbnail_url}
        title={oEmbed?.title}
        layout={layout}
        loading={loading}
        mediaId={mediaId}
      />
    );
  }

  return null;
}
