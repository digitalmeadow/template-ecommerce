"use client";

import { useState } from "react";
import { ACCEPTED_FILE_ATTR } from "@/lib/forms/constants";
import { cn } from "@/lib/utils";
import IconArrow from "@/fields/form/IconArrow";

interface Props {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  multiple: boolean;
  errorId: string;
  invalid: boolean;
}

function describeFiles(files: FileList | null) {
  if (!files?.length) return "";
  return files.length > 1 ? `${files.length} files selected` : files[0].name;
}

export default function FieldFile({
  id,
  name,
  label,
  placeholder,
  required,
  multiple,
  errorId,
  invalid,
}: Props) {
  const [chosen, setChosen] = useState("");

  return (
    <>
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      {/* Native control hidden, so the label reports the chosen filename. */}
      <input
        className="peer absolute h-px w-px opacity-0"
        id={id}
        name={name}
        type="file"
        accept={ACCEPTED_FILE_ATTR}
        required={required}
        multiple={multiple}
        aria-describedby={errorId}
        aria-invalid={invalid || undefined}
        onChange={(event) => setChosen(describeFiles(event.target.files))}
      />
      <label
        className="field-file flex min-w-0 flex-1 cursor-pointer items-center justify-between gap-[var(--s16)] px-[var(--s20)] py-[var(--s16)] peer-focus-visible:outline peer-focus-visible:outline-offset-[var(--s4)]"
        htmlFor={id}
        aria-hidden="true"
      >
        <span
          className={cn(
            "overflow-hidden text-ellipsis whitespace-nowrap",
            !chosen && "opacity-50",
          )}
        >
          {chosen || placeholder}
        </span>
        <span className="h-[1.13em] w-[1.13em] shrink-0">
          <IconArrow direction="up" />
        </span>
      </label>
    </>
  );
}
