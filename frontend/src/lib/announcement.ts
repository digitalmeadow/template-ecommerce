export const ANNOUNCEMENT_DISMISSED_STORAGE_KEY = "announcement-dismissed";

// Inline and pre-paint, so a banner the visitor already dismissed never flashes in. Keyed on the
// document's version: editing the announcement shows it again.
export function announcementDismissedScript(version: string) {
  return `try{if(localStorage.getItem(${JSON.stringify(ANNOUNCEMENT_DISMISSED_STORAGE_KEY)})===${JSON.stringify(version)})document.documentElement.dataset.announcementDismissed=""}catch(e){}`;
}

export function dismissAnnouncement(version: string) {
  localStorage.setItem(ANNOUNCEMENT_DISMISSED_STORAGE_KEY, version);
  document.documentElement.dataset.announcementDismissed = "";
}
