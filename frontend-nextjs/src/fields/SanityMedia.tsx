import type { MediaFragment } from "sanity-nextjs/generated/graphql";
import MuxVideo from "@/fields/MuxVideo";
import SanityImage from "@/fields/SanityImage";
import VimeoVideo from "@/fields/VimeoVideo";
import { fetchVimeoOEmbed } from "@/lib/video";

interface Props {
  media: MediaFragment | null | undefined;
  layout?: "width" | "height" | "cover" | "contain";
  sizes?: [number, number, number];
  loading?: "lazy" | "eager";
}

export default async function SanityMedia({
  media,
  layout = "width",
  sizes = [100, 100, 100],
  loading = "lazy",
}: Props) {
  if (media?.type === "image") {
    return <SanityImage image={media.image} layout={layout} sizes={sizes} loading={loading} />;
  }

  if (media?.type === "video") {
    return <MuxVideo video={media.video} layout={layout} loading={loading} />;
  }

  if (media?.type === "vimeo" && media.vimeo?.url) {
    const oEmbed = await fetchVimeoOEmbed(media.vimeo.url);

    return (
      <VimeoVideo
        url={media.vimeo.url}
        aspectRatio={oEmbed?.width && oEmbed.height ? oEmbed.width / oEmbed.height : undefined}
        thumbnailUrl={oEmbed?.thumbnail_url}
        title={oEmbed?.title}
        layout={layout}
        loading={loading}
      />
    );
  }

  return null;
}
