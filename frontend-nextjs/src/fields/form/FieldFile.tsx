"use client";

import { useState } from "react";
import { ACCEPTED_FILE_ATTR } from "@/lib/forms/constants";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  multiple: boolean;
  errorId: string;
  isInvalid: boolean;
}

function describeFiles(files: FileList | null) {
  if (!files?.length) return "";
  return files.length > 1 ? `${files.length} files selected` : files[0]!.name;
}

export default function FieldFile({
  id,
  name,
  placeholder,
  required,
  multiple,
  errorId,
  isInvalid,
}: Props) {
  const [chosen, setChosen] = useState("");

  return (
    <>
      <input
        className="peer g-sr-only"
        id={id}
        name={name}
        type="file"
        accept={ACCEPTED_FILE_ATTR}
        required={required}
        multiple={multiple}
        aria-describedby={errorId}
        aria-invalid={isInvalid || undefined}
        onChange={(event) => setChosen(describeFiles(event.target.files))}
      />
      {/* Drawn like the other controls (globals/forms.css); the native input is hidden behind it. */}
      <label
        className="flex min-h-10 cursor-pointer items-center justify-between gap-2.5 border-b border-text bg-surface px-2.5 transition-[background-color] duration-(--duration-default) ease-out peer-focus-visible:outline-(length:--focus-ring-width) peer-focus-visible:outline-offset-(--focus-ring-offset) peer-focus-visible:outline-focus peer-focus-visible:outline-solid peer-aria-invalid:border-error hover:bg-surface-strong"
        htmlFor={id}
        aria-hidden="true"
      >
        <span className={cn(!chosen && "text-text-subtle")}>{chosen || placeholder}</span>
        <span>↑</span>
      </label>
    </>
  );
}
