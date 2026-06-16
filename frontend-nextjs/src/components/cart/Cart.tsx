import { sanityClient } from "sanity-nextjs/client.server";
import { cartQuery } from "sanity-nextjs/queries/cart";
import CartClient from "./CartClient";

export default async function Cart() {
  const cartQueryResult = await sanityClient.request(cartQuery);
  const cartData = cartQueryResult.allCart[0] ?? null;

  return <CartClient cartData={cartData} />;
}
