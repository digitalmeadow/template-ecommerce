import type { LiveVariant, Variant } from "@lib/shopify/variants";

export type EventProductVariantChangeDetail = { variant: Variant };
export type EventProductVariantChange = CustomEvent<EventProductVariantChangeDetail>;

export type EventProductLiveDataDetail = { availableForSale: boolean; variants: LiveVariant[] };
export type EventProductLiveData = CustomEvent<EventProductLiveDataDetail>;

export type EventQuantityChangedDetail = { value: number };
export type EventQuantityChanged = CustomEvent<EventQuantityChangedDetail>;

export type EventTabsChangeDetail = { index: number };
export type EventTabsChange = CustomEvent<EventTabsChangeDetail>;

export type EventDropdownToggleDetail = { open: boolean };
export type EventDropdownToggle = CustomEvent<EventDropdownToggleDetail>;
