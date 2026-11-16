"use client";

import Player from "@vimeo/player";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface Props {
  url: string;
  aspectRatio?: number;
  thumbnailUrl?: string;
  title?: string;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
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

const LAYOUT_CLASSES = {
  width: "w-full aspect-(--ratio)",
  height: "h-full aspect-(--ratio)",
  cover: "h-full w-full [container-type:size]",
  contain: "h-full w-full [container-type:size]",
};

// Emulates object-fit on the iframe; absolute + translate because overflowing grid items anchor start.
const FRAME_CLASSES = {
  width: "",
  height: "",
  cover:
    "absolute top-1/2 left-1/2 -translate-1/2 h-[max(100cqh,calc(100cqw/var(--ratio)))] w-[max(100cqw,calc(100cqh*var(--ratio)))]",
  contain:
    "absolute top-1/2 left-1/2 -translate-1/2 h-[min(100cqh,calc(100cqw/var(--ratio)))] w-[min(100cqw,calc(100cqh*var(--ratio)))]",
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
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    const reveal = () => setIsLoaded(true);
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
      className={cn(
        "vimeo-video relative grid overflow-hidden *:min-h-0 *:min-w-0 *:[grid-area:1/1]",
        LAYOUT_CLASSES[layout],
      )}
      // The player letterboxes inside its iframe, so cropping needs the source ratio.
      style={{ "--ratio": aspectRatio } as CSSProperties}
    >
      {thumbnailUrl && (
        <img
          className={cn(
            "placeholder pointer-events-none h-full w-full object-cover blur-[100px] transition-opacity duration-(--duration-media) ease-out",
            isLoaded && "opacity-0",
          )}
          src={thumbnailUrl}
          alt=""
          loading="eager"
          aria-hidden="true"
        />
      )}
      {/* Decorative player: clicks and hover belong to the parent. */}
      <iframe
        ref={iframeRef}
        className={cn(
          "video pointer-events-none h-full w-full border-0 opacity-0 transition-opacity duration-(--duration-media) ease-out",
          FRAME_CLASSES[layout],
          isLoaded && "opacity-(--media-opacity,1)",
        )}
        src={embedUrl(url)}
        title={title || "Video"}
        loading={loading}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        data-loaded={isLoaded ? "" : undefined}
      />
    </div>
  );
}
