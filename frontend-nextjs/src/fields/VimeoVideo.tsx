"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Player from "@vimeo/player";
import { cn } from "@/lib/utils";

interface Props {
  url: string;
  aspectRatio?: number;
  thumbnailUrl?: string;
  title?: string;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
  mediaId?: string | null;
}

const EMBED_PARAMS = {
  title: "0",
  byline: "0",
  portrait: "0",
  controls: "0",
  autoplay: "1",
  muted: "1",
  loop: "1",
  autopause: "0",
};

// width/height size the box from the ratio; cover/contain fill the parent and size the frame with container units.
const containerClasses: Record<string, string> = {
  width: "relative w-full aspect-[var(--video-ratio)]",
  height: "relative h-full aspect-[var(--video-ratio)]",
  cover: "absolute inset-[0] [container-type:size]",
  contain: "relative h-full w-full [container-type:size]",
};

const frameClasses: Record<string, string> = {
  width: "h-full w-full",
  height: "h-full w-full",
  cover:
    "h-[max(100cqh,calc(100cqw/var(--video-ratio)))] w-[max(100cqw,calc(100cqh*var(--video-ratio)))]",
  contain:
    "h-[min(100cqh,calc(100cqw/var(--video-ratio)))] w-[min(100cqw,calc(100cqh*var(--video-ratio)))]",
};

function embedUrl(url: string) {
  // Unlisted videos carry a privacy hash after the id.
  const [, id, hash] = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i) ?? [];
  const params = new URLSearchParams(EMBED_PARAMS);
  if (hash) params.set("h", hash);
  return `https://player.vimeo.com/video/${id ?? url.split("/").pop()}?${params}`;
}

export default function VimeoVideo({
  url,
  aspectRatio = 16 / 9,
  thumbnailUrl,
  title,
  layout = "width",
  loading = "lazy",
  mediaId,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    const reveal = () => setLoaded(true);
    player.on("play", reveal);
    player
      .getPaused()
      .then((paused) => {
        if (!paused) reveal();
      })
      .catch(() => {});

    return () => {
      player.destroy().catch(() => {});
    };
  }, []);

  return (
    <div
      className={cn("vimeo-video overflow-hidden", containerClasses[layout])}
      style={{ "--video-ratio": aspectRatio } as CSSProperties}
      data-media-id={mediaId ?? undefined}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          frameClasses[layout],
        )}
      >
        {thumbnailUrl && (
          <img
            className={cn(
              "placeholder pointer-events-none absolute inset-[0] h-full w-full object-cover blur-[100px] transition-opacity duration-[var(--transition-media-load-duration)]",
              loaded && "opacity-0",
            )}
            src={thumbnailUrl}
            alt=""
            aria-hidden="true"
          />
        )}
        {/* Decorative player: clicks and hover belong to the parent. */}
        <iframe
          ref={iframeRef}
          className={cn(
            "pointer-events-none absolute inset-[0] h-full w-full border-0 opacity-0 transition-opacity duration-[var(--transition-media-load-duration)]",
            loaded && "opacity-100",
          )}
          src={embedUrl(url)}
          title={title || "Video"}
          loading={loading}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
