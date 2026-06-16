"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export interface QuantitySelectorHandle {
  setUpdatingState: (updating: boolean) => void;
}

const QuantitySelector = ({
  min = 1,
  max = Infinity,
  initial = 1,
  onChange,
  className,
}: Props) => {
  const [value, setValue] = useState(() =>
    Math.max(min, Math.min(max, initial || 1)),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [updating, _setUpdating] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = useCallback(
    (v: number) => Math.max(min, Math.min(max, v)),
    [min, max],
  );

  const emit = useCallback(
    (newValue: number) => {
      rootRef.current?.dispatchEvent(
        new CustomEvent("quantity-selector:quantity-changed", {
          detail: { value: newValue },
          bubbles: true,
        }),
      );
      onChange?.(newValue);
    },
    [onChange],
  );

  const setValueAndEmit = useCallback(
    (newValue: number) => {
      const clamped = clamp(newValue);
      if (clamped === value) return;
      setValue(clamped);
      emit(clamped);
    },
    [value, clamp, emit],
  );

  const decrease = useCallback(() => {
    setValueAndEmit(value - 1);
  }, [value, setValueAndEmit]);

  const increase = useCallback(() => {
    setValueAndEmit(value + 1);
  }, [value, setValueAndEmit]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(e.target.value, 10);
      if (isNaN(parsed)) {
        if (inputRef.current) inputRef.current.value = String(value);
        return;
      }
      setValueAndEmit(parsed);
    },
    [value, setValueAndEmit],
  );

  // Sync input display when value changes externally
  useEffect(() => {
    if (inputRef.current) inputRef.current.value = String(value);
  }, [value]);

  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div
      ref={rootRef}
      className={cn("flex gap-[var(--s8)]", className)}
      {...(updating ? { "data-state": "updating" } : {})}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={atMin || updating}
        onClick={decrease}
        className={cn(
          "disabled:opacity-50 disabled:cursor-not-allowed",
          updating && "opacity-50",
        )}
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
          "w-[2ch] text-center",
          updating && "opacity-50",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          "[appearance:textfield]",
        )}
      />
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={atMax || updating}
        onClick={increase}
        className={cn(
          "disabled:opacity-50 disabled:cursor-not-allowed",
          updating && "opacity-50",
        )}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
