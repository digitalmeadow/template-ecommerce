// Counted so stacked overlays share one lock: only the last unlock restores the page.
// html reserves its scrollbar gutter (styles/base/document.css), so hiding overflow doesn't shift the layout.
let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks === 1) document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) document.documentElement.style.overflow = "";
}
