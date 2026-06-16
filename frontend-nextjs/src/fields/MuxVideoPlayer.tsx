"use client";

import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";

interface Props {
  playbackId: string;
  aspectRatio: string;
  posterURL: string;
  filename?: string;
  blurDataURL: string;
  layout?: "width" | "height" | "cover" | "contain";
  loading?: "lazy" | "eager";
  mediaId?: string;
}

const layoutContainerClasses: Record<string, string> = {
  width: "w-full",
  height: "h-full",
  cover:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto min-w-full min-h-full",
  contain: "w-full h-full",
};

export default function MuxVideoPlayer({
  playbackId,
  aspectRatio,
  posterURL,
  filename,
  blurDataURL,
  layout = "width",
  mediaId,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("mux-video relative", layoutContainerClasses[layout])}
      style={{ aspectRatio }}
    >
      <img
        src={blurDataURL}
        alt=""
        aria-hidden="true"
        className="mux-video-placeholder absolute inset-0 h-full w-full object-cover"
      />

      <MuxPlayer
        className={cn(
          "video h-full w-full opacity-0 transition-opacity duration-300 ease-in-out",
          loaded && "opacity-100",
        )}
        playbackId={playbackId}
        poster={posterURL}
        title={filename}
        loop
        muted
        autoPlay="muted"
        minResolution="720p"
        data-media-id={mediaId}
        onCanPlay={() => setLoaded(true)}
      />
    </div>
  );
}
