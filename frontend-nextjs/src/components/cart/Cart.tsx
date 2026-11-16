import type { CartFragment as CartSettingsFragment } from "sanity-nextjs/generated/graphql";
import PortableText from "@/fields/PortableText";
import CartClient from "./CartClient";

interface Props {
  cart: CartSettingsFragment | null | undefined;
}

// Portable Text resolves links server-side, so the CMS copy arrives pre-rendered.
export default function Cart({ cart }: Props) {
  return (
    <CartClient
      emptyMessage={<PortableText value={cart?.emptyMessageRaw} />}
      note={<PortableText value={cart?.noteRaw} />}
    />
  );
}
