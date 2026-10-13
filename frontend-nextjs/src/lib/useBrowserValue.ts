import { useSyncExternalStore } from "react";

function subscribeToNothing() {
  return () => {};
}

// Server and hydration render `serverValue`, then the browser value takes over without a mismatch
// or a setState-in-effect. Pass `subscribe` when the value can change while mounted.
export function useBrowserValue<T>(
  read: () => T,
  serverValue: T,
  subscribe: (onChange: () => void) => () => void = subscribeToNothing,
): T {
  return useSyncExternalStore(subscribe, read, () => serverValue);
}
