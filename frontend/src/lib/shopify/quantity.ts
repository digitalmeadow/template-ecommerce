export interface QuantityOptions {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
}

export function clampQuantity(value: number, min = 1, max = Infinity) {
  let quantity = Math.floor(value);
  if (Number.isNaN(quantity) || quantity < min) quantity = min;
  if (Number.isFinite(max) && quantity > max) quantity = max;
  return quantity;
}

export function initQuantitySelector(
  rootElement: HTMLElement,
  options: QuantityOptions = {}
) {
  const decreaseBtn = rootElement.querySelector(
    "[data-quantity-decrease]"
  ) as HTMLElement;
  const increaseBtn = rootElement.querySelector(
    "[data-quantity-increase]"
  ) as HTMLElement;
  const inputEl = rootElement.querySelector(
    "[data-quantity-input]"
  ) as HTMLInputElement;

  if (!decreaseBtn || !increaseBtn || !inputEl)
    throw new Error("Quantity selector missing required elements");

  const min = options.min ?? Number(rootElement.dataset.min ?? 1);
  const max = options.max ?? Number(rootElement.dataset.max ?? Infinity);

  let isInitialising = true;

  function setQuantity(next: number) {
    const quantity = clampQuantity(next, min, max);
    inputEl.value = String(quantity);

    if (!isInitialising) {
      options.onChange?.(quantity);
    }
  }

  decreaseBtn.addEventListener("click", () =>
    setQuantity(Number(inputEl.value) - 1)
  );
  increaseBtn.addEventListener("click", () =>
    setQuantity(Number(inputEl.value) + 1)
  );
  inputEl.addEventListener("change", () => setQuantity(Number(inputEl.value)));

  setQuantity(options.initial ?? (Number(inputEl.value) || min));
  isInitialising = false;

  return { setQuantity, inputEl };
}
