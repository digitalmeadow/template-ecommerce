import type { MuxVideoFragment } from "sanity-nextjs/generated/graphql";
import { fetchMuxBlurUp } from "@/lib/video";
import MuxVideoPlayer from "@/fields/MuxVideoPlayer";

interface Props {
  videoData: MuxVideoFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  mediaId?: string | null;
}

export default async function MuxVideo({ videoData, layout = "width", mediaId }: Props) {
  if (!videoData?.asset?.playbackId) return null;

  const playbackId = videoData.asset.playbackId;
  const aspectRatio = videoData.asset.data?.aspect_ratio?.replace(":", "/") ?? "16/9";
  const posterURL = `https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&time=0`;
  const filename = videoData.asset.filename ?? undefined;

  const placeholderSrc = (await fetchMuxBlurUp(playbackId)).imageDataURL;

  return (
    <MuxVideoPlayer
      playbackId={playbackId}
      aspectRatio={aspectRatio}
      posterURL={posterURL}
      filename={filename}
      placeholderSrc={placeholderSrc}
      layout={layout}
      mediaId={mediaId ?? undefined}
    />
  );
}
