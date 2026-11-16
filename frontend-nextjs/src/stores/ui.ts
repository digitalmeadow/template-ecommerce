import { atom } from "nanostores";

export const $cartOpen = atom(false);
export const setCartOpen = (isOpen: boolean) => $cartOpen.set(isOpen);
