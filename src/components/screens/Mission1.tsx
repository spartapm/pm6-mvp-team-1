"use client";

import { useState } from "react";
import { MissionShell } from "../MissionShell";
import { HintToggle } from "../HintToggle";
import { FeedbackBox } from "../FeedbackBox";
import { NavButtons } from "../NavButtons";
import { mission1 as m } from "@/data/missions";

export function Mission1({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const selectedOption = m.options.find((o) => o.id === selected);

  function optionClass(optionId: string, correct: boolean) {
    if (!answered) {
      return "border-slate-200 bg-white hover:bg-slate-50";
    }
    if (correct) return "border-correct bg-correct-soft text-correct";
    if (optionId === selected) return "border-wrong bg-wrong-soft text-wrong";
    return "border-slate-200 bg-white opacity-60";
  }

  return (
    <MissionShell
      index={0}
      level={m.level}
      learnTitle={m.learnTitle}
      learnLead={m.learnLead}
      concepts={m.concepts}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="text-xs font-semibold text-brand">{m.level} · 실습</span>
        <HintToggle hint={m.hint} />
      </div>

      <h3 className="text-lg font-bold text-navy">{m.question}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.prompt}</p>

      <div className="mt-5 space-y-3">
        {m.options.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={answered}
            onClick={() => setSelected(o.id)}
            className={[
              "w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition",
              "disabled:cursor-default",
              optionClass(o.id, o.correct),
            ].join(" ")}
          >
            {o.label}
          </button>
        ))}
      </div>

      {answered && selectedOption && (
        <div className="mt-5">
          <FeedbackBox
            feedback={{
              status: selectedOption.correct ? "correct" : "wrong",
              text: selectedOption.correct ? m.correctFeedback : m.wrongFeedback,
            }}
          />
        </div>
      )}

      <NavButtons prevDisabled onNext={onNext} nextDisabled={!answered} />
    </MissionShell>
  );
}
