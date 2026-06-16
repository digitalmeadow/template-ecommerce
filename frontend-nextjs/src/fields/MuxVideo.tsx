import type { MuxVideoFragment } from "sanity-nextjs/generated/graphql";
import { createBlurUp } from "@mux/blurup";
import MuxVideoPlayer from "@/fields/MuxVideoPlayer";

interface Props {
  videoData: MuxVideoFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
  mediaId?: string | null;
}

export default async function MuxVideo({
  videoData,
  layout = "width",
  loading = "lazy",
  mediaId,
}: Props) {
  if (!videoData?.asset?.playbackId) return null;

  const playbackId = videoData.asset.playbackId;
  const aspectRatio =
    videoData.asset.data?.aspect_ratio?.replace(":", "/") ?? "16/9";
  const posterURL = `https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&time=0`;
  const filename = videoData.asset.filename ?? undefined;

  const { imageDataURL } = await createBlurUp(playbackId, {});

  return (
    <MuxVideoPlayer
      playbackId={playbackId}
      aspectRatio={aspectRatio}
      posterURL={posterURL}
      filename={filename}
      blurDataURL={imageDataURL}
      layout={layout}
      loading={loading}
      mediaId={mediaId ?? undefined}
    />
  );
}
