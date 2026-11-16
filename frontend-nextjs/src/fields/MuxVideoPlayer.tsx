"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  playbackId: string;
  aspectRatio?: string;
  posterUrl: string;
  filename?: string;
  placeholderSrc?: string;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
}

const LAYOUT_CLASSES = {
  width: "w-full",
  height: "h-full",
  cover: "absolute top-1/2 left-1/2 w-auto min-w-full min-h-full -translate-1/2 object-cover",
  contain: "h-full w-full object-contain",
};

export default function MuxVideoPlayer({
  playbackId,
  aspectRatio,
  posterUrl,
  filename,
  placeholderSrc,
  layout = "width",
  loading = "lazy",
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn("mux-video relative", LAYOUT_CLASSES[layout])}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {placeholderSrc && (
        <img
          className="placeholder absolute top-0 left-0 h-full w-full object-cover"
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
        />
      )}

      <MuxPlayer
        className={cn(
          "video h-full w-full opacity-0 transition-opacity duration-(--duration-media) ease-out [--controls:none]",
          isLoaded && "opacity-(--media-opacity,1)",
        )}
        playbackId={playbackId}
        poster={posterUrl}
        title={filename}
        loading={loading === "lazy" ? "viewport" : "page"}
        loop
        muted
        autoPlay="muted"
        minResolution="720p"
        data-loaded={isLoaded ? "" : undefined}
        onCanPlay={() => setIsLoaded(true)}
      />
    </div>
  );
}
