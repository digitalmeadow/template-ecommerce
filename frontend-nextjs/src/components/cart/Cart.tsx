import type { CartFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import CartClient from "./CartClient";

interface Props {
  cartData: CartFragment | null | undefined;
}

export default function Cart({ cartData }: Props) {
  return (
    <CartClient
      emptyMessage={<PortableText value={cartData?.emptyMessageRaw} />}
      note={
        cartData?.noteRaw ? <PortableText value={cartData.noteRaw} /> : null
      }
    />
  );
}
