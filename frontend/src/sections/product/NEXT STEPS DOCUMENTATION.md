Web Components and Custom Events

We need the following core ecommerce components: 
1. ProductVariantSelector
  - Renders all available options for a product, eg: color selector and a size selector all within this single variant selector component
2. ProductPrice
  - Renders compareAtPrices if on sale (each project will style the price differently (eg: currency then price, so fine to leave this customisable per project)). 
  - Must always reflect the price of the currently selected variant (eg: via data-bind-price data attribute or similar )
4. ProductQuantitySelector
  - Adjusts selected quantity. Seperate from the AddToCart component, because for example, the add to cart button within the quick-buy section of the product thumbnail doesn't need a quantity selector.
3. ProductAddToCart
  - Adds the selected variant, of the selected quantity to the cart (via the Shopify storefront API mutation (in the /shopify package))


Requirements:
1. No client side libraries, vanilla js (ts for this project) or web components only
2. Use data attributes whereever suitable
3. Use custom events for events that need to update other parts of the dom
  - EG: variant selected event should update all data-bind-price elements to the correct price
  - EG: quantity updated event should update the data-quantity of the quantity selector component
  - EG: add to cart should trigger an add to cart event so that we can later detect and open the cart modal whenever an item is added

Another key feature is how these components and events are scoped.
These components need to be able to be scoped to a parent component in case of the following:
  1. The design allows variant switching to occur within the thumbnail of the product
  2. The product appears in more than one collection section on the page
  3. We don't want the variant selection, or quantity selection of one thumbnail to effect the selection of the other (even though they're the same product)

  Key style tips
  1. Minimilism is absolutely key here, no over engineering, or excessive edge case handling
  2. No soft fails, any unwanted cases should fail with an error message
  3. No Shadow DOM when using web components, no need for it, its over-engineering
  4. Naming: no shortend variable names like (err, res, req) use full words please.
