import type { MuxVideoFragment } from "sanity-nextjs/generated/graphql";
import MuxVideoPlayer from "@/fields/MuxVideoPlayer";
import { fetchMuxBlurUp } from "@/lib/video";

interface Props {
  video: MuxVideoFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
}

export default async function MuxVideo({ video, layout = "width", loading = "lazy" }: Props) {
  const playbackId = video?.asset?.playbackId;
  if (!playbackId) return null;

  const placeholderSrc = (await fetchMuxBlurUp(playbackId)).imageDataURL;

  return (
    <MuxVideoPlayer
      playbackId={playbackId}
      aspectRatio={video.asset?.data?.aspect_ratio?.replace(":", "/")}
      posterUrl={`https://image.mux.com/${playbackId}/thumbnail.jpg?fit_mode=crop&time=0`}
      filename={video.asset?.filename ?? undefined}
      placeholderSrc={placeholderSrc}
      layout={layout}
      loading={loading}
    />
  );
}
