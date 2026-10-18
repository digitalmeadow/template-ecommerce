export type EventProductVariantChangeDetail = { variantId: string; availableForSale: boolean };
export type EventProductVariantChange = CustomEvent<EventProductVariantChangeDetail>;

export type EventQuantityChangedDetail = { value: number };
export type EventQuantityChanged = CustomEvent<EventQuantityChangedDetail>;

export type EventTabsChangeDetail = { index: number };
export type EventTabsChange = CustomEvent<EventTabsChangeDetail>;

export type EventDropdownToggleDetail = { open: boolean };
export type EventDropdownToggle = CustomEvent<EventDropdownToggleDetail>;
