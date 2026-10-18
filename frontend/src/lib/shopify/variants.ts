// Shopify's title for the one variant of a product with no options.
export const DEFAULT_VARIANT_TITLE = "Default Title";

// The slice of a variant the client needs to match selected options.
export interface Variant {
  id: string;
  selectedOptions: Array<{ name: string; value: string }>;
  availableForSale: boolean;
}
