"use client";

import { useState } from "react";
import { ChevronDownIcon, SparkleIcon } from "./icons";

export function HintToggle({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        <SparkleIcon className="h-4 w-4 text-brand" />
        힌트 보기
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-2 w-full animate-fade-in rounded-xl bg-brand-soft p-4 text-sm leading-relaxed text-brand-ink">
          {hint}
        </div>
      )}
    </div>
  );
}
