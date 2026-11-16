"use client";

import { useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** Set when the selector posts with a form (e.g. add to cart without JS). */
  name?: string;
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function QuantitySelector({
  name,
  initial = 1,
  min: minProp = 1,
  max: maxProp,
  onChange,
  className,
}: Props) {
  const min = Math.max(minProp, 1);
  const max = maxProp || Infinity;
  const clamp = (quantity: number) => Math.max(min, Math.min(max, quantity));

  const [value, setValue] = useState(() => clamp(initial));
  const [draft, setDraft] = useState<string | null>(null);

  function setValueAndEmit(quantity: number) {
    const clamped = clamp(quantity);
    if (clamped === value) return;
    setValue(clamped);
    onChange?.(clamped);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value);
  }

  function commitDraft() {
    if (draft === null) return;
    const quantity = Number(draft);
    if (Number.isInteger(quantity) && quantity >= min && quantity <= max) setValueAndEmit(quantity);
    setDraft(null);
  }

  return (
    <div className={cn("quantity-selector flex gap-2", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => setValueAndEmit(value - 1)}
      >
        −
      </button>
      <input
        className="w-[2ch] text-center"
        type="number"
        name={name}
        value={draft ?? value}
        min={min}
        max={max === Infinity ? undefined : max}
        inputMode="numeric"
        step={1}
        pattern="[0-9]+"
        aria-label="Quantity"
        onChange={handleInputChange}
        onBlur={commitDraft}
        onKeyDown={(event) => event.key === "Enter" && commitDraft()}
      />
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => setValueAndEmit(value + 1)}
      >
        +
      </button>
    </div>
  );
}
