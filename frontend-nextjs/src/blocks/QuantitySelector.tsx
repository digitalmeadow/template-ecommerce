"use client";

import { useState, useCallback, useEffect, useRef, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  min?: number;
  max?: number;
  initial?: number;
  updating?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export default function QuantitySelector({
  min = 1,
  max = Infinity,
  initial = 1,
  updating = false,
  onChange,
  className,
}: Props) {
  const [value, setValue] = useState(() => Math.max(min, Math.min(max, initial || 1)));
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = useCallback(
    (quantity: number) => Math.max(min, Math.min(max, quantity)),
    [min, max],
  );

  const setValueAndEmit = useCallback(
    (newValue: number) => {
      const clamped = clamp(newValue);
      if (clamped === value) return;
      setValue(clamped);
      onChange?.(clamped);
    },
    [value, clamp, onChange],
  );

  const decrease = useCallback(() => {
    setValueAndEmit(value - 1);
  }, [value, setValueAndEmit]);

  const increase = useCallback(() => {
    setValueAndEmit(value + 1);
  }, [value, setValueAndEmit]);

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(event.target.value, 10);
      if (isNaN(parsed)) {
        if (inputRef.current) inputRef.current.value = String(value);
        return;
      }
      setValueAndEmit(parsed);
    },
    [value, setValueAndEmit],
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = String(value);
  }, [value]);

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      className={cn("quantity-selector", "flex gap-[var(--s8)]", className)}
      data-state={updating ? "updating" : undefined}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={atMin || updating}
        onClick={decrease}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        −
      </button>
      <input
        ref={inputRef}
        type="number"
        inputMode="numeric"
        step={1}
        pattern="[0-9]+"
        aria-label="Quantity"
        defaultValue={value}
        min={min}
        max={max === Infinity ? undefined : max}
        onChange={onInputChange}
        disabled={updating}
        aria-busy={updating || undefined}
        className={cn(
          "w-[2ch] text-center disabled:opacity-50",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          "[appearance:textfield]",
        )}
      />
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={atMax || updating}
        onClick={increase}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}
