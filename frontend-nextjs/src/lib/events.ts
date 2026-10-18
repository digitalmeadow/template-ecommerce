export type EventProductVariantChangeDetail = {
  variantId: string;
  availableForSale: boolean;
};
export type EventProductVariantChange = CustomEvent<EventProductVariantChangeDetail>;
