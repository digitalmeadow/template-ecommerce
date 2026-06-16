import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import SanityImage from "@/fields/SanityImage";
import MuxVideo from "@/fields/MuxVideo";

interface Props {
  mediaData: MediaFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
  mediaId?: string | null;
}

export default function SanityMedia({
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

  return null;
}
