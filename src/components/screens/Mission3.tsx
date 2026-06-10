"use client";

import { useMemo, useState } from "react";
import { MissionShell } from "../MissionShell";
import { HintToggle } from "../HintToggle";
import { FeedbackBox } from "../FeedbackBox";
import { NavButtons } from "../NavButtons";
import { mission3 as m } from "@/data/missions";

export function Mission3({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const totalCorrect = useMemo(
    () => m.blocks.filter((b) => b.correct).length,
    []
  );

  function toggle(id: string) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const result = useMemo(() => {
    const correctlyPicked = m.blocks.filter(
      (b) => b.correct && selected.has(b.id)
    ).length;
    const missed = totalCorrect - correctlyPicked;
    const falsePositive = m.blocks.some((b) => !b.correct && selected.has(b.id));
    const perfect = correctlyPicked === totalCorrect && !falsePositive;
    return { correctlyPicked, missed, falsePositive, perfect };
  }, [selected, totalCorrect]);

  function optionClass(id: string, correct: boolean) {
    const isSelected = selected.has(id);
    if (submitted) {
      if (result.perfect) {
        if (correct && isSelected) return "border-correct bg-correct-soft text-correct";
        return "border-slate-200 bg-white opacity-60";
      }
      if (isSelected) return "border-wrong bg-wrong-soft text-wrong";
      return "border-slate-200 bg-white opacity-60";
    }
    return isSelected
      ? "border-brand bg-brand-soft text-brand-ink"
      : "border-slate-200 bg-white hover:bg-slate-50";
  }

  return (
    <MissionShell
      index={2}
      level={m.level}
      learnTitle={m.learnTitle}
      learnLead={m.learnLead}
      concepts={m.concepts}
      learnExample={m.learnExample}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="text-xs font-semibold text-brand">{m.level} · 실습</span>
        <HintToggle hint={m.hint} />
      </div>

      <h3 className="text-lg font-bold text-navy">{m.question}</h3>

      <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-brand-ink">
        <p className="mb-1 font-bold text-navy">프롬프트</p>
        <p className="whitespace-pre-line italic">{m.prompt}</p>
      </div>

      <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
        <p className="mb-1 font-bold text-navy">생성 결과</p>
        <p className="whitespace-pre-line">{m.generatedCopy}</p>
      </div>

      <p className="mt-5 text-sm font-semibold text-navy">{m.question}</p>
      <div className="mt-2 space-y-2.5">
        {m.blocks.map((b) => {
          return (
            <button
              key={b.id}
              type="button"
              disabled={submitted}
              aria-pressed={selected.has(b.id)}
              onClick={() => toggle(b.id)}
              className={[
                "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition disabled:cursor-default",
                optionClass(b.id, b.correct),
              ].join(" ")}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={selected.size === 0}
          onClick={() => setSubmitted(true)}
          className="mt-5 self-center rounded-xl bg-brand px-6 py-2.5 text-[17px] font-semibold text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          제출하기
        </button>
      ) : (
        <div className="mt-5">
          <FeedbackBox
            feedback={{
              status: result.perfect ? "correct" : "wrong",
              text: result.perfect
                ? `${totalCorrect}/${totalCorrect}개 정답. 완벽하게 조립했습니다!`
                : `${result.correctlyPicked}/${totalCorrect}개 정답, ${result.missed}개를 빠뜨렸습니다.`,
            }}
          />
        </div>
      )}

      {submitted && !result.perfect ? (
        <button
          type="button"
          onClick={() => {
            setSelected(new Set());
            setSubmitted(false);
          }}
          className="mt-4 self-center rounded-xl border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          재시도
        </button>
      ) : null}

      <NavButtons onPrev={onPrev} onNext={onNext} nextDisabled={!result.perfect} />
    </MissionShell>
  );
}
