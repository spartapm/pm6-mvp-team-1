"use client";

import { useState } from "react";
import { ChevronDownIcon, SparkleIcon } from "./icons";

export function HintToggle({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-end">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[17px] font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        <SparkleIcon className="h-4 w-4 text-brand" />
        {open ? "힌트 닫기" : "힌트 보기"}
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 max-w-[80vw] animate-fade-in whitespace-pre-line rounded-xl border border-brand/20 bg-brand-soft p-4 text-sm leading-relaxed text-brand-ink shadow-lg">
          {hint}
        </div>
      )}
    </div>
  );
}
