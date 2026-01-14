# Astro Frontend

Next task:

- Localisation:
  - Ideally, avoid server rending if possible by statically rendering different routes for each locale eg: /fr/ or something (we want site responsiveness > build times)
  - Then we can pass this into our inContext() in Shopify requests which should get the correct currencies
  - We also then need to pass this into our price component (probably best by setting a attribute on the html root or something, and just querying that instead of prop drilling)
  - Also need to clear up language vs locale vs currency and what is typically displayed in a selector

  - Cookies and analytics handling