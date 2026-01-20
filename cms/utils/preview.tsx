import React from "react";

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function previewTextRich(richText: any[]): string {
  let text = "";

  for (const block of richText) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    for (const child of block.children) {
      if (child._type !== "span" || typeof child.text !== "string") continue;
      text += child.text + " ";
    }
  }

  return text.trim();
}

export function previewMedia(media: any) {
  if (!media) return null;
  const type = media.type as "image" | "video";
  const image = media.image;
  const videoPlaybackId = media.video?.playbackId;

  if (type === "video" && videoPlaybackId) {
    return <img src={`https://image.mux.com/${videoPlaybackId}/thumbnail.jpg`} alt="" />;
  }

  if (type === "image" && image) {
    return image;
  }

  return null;
}
