import { atom } from "nanostores";

export const cartOpen = atom(false);
export const setCartOpen = (open: boolean) => cartOpen.set(open);
