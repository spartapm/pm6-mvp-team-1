"use client";

import { useMemo, useState } from "react";
import { MissionShell } from "../MissionShell";
import { HintToggle } from "../HintToggle";
import { FeedbackBox } from "../FeedbackBox";
import { NavButtons } from "../NavButtons";
import { mission2 as m } from "@/data/missions";

export function Mission2({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const totalMissing = useMemo(
    () => m.chips.filter((c) => c.missing).length,
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
    const correctlyPicked = m.chips.filter(
      (c) => c.missing && selected.has(c.id)
    ).length;
    const missed = totalMissing - correctlyPicked;
    const falsePositive = m.chips.some((c) => !c.missing && selected.has(c.id));
    const perfect = correctlyPicked === totalMissing && !falsePositive;
    return { correctlyPicked, missed, falsePositive, perfect };
  }, [selected, totalMissing]);

  function chipClass(id: string, missing: boolean) {
    const isSelected = selected.has(id);
    if (submitted) {
      if (missing && isSelected) return "border-correct bg-correct-soft text-correct";
      if (missing && !isSelected) return "border-wrong bg-wrong-soft text-wrong";
      if (!missing && isSelected) return "border-wrong bg-wrong-soft text-wrong";
      return "border-slate-200 bg-white opacity-60";
    }
    return isSelected
      ? "border-brand bg-brand-soft text-brand-ink"
      : "border-slate-200 bg-white hover:bg-slate-50";
  }

  return (
    <MissionShell
      index={1}
      level={m.level}
      learnTitle={m.learnTitle}
      learnLead={m.learnLead}
      concepts={m.concepts}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="text-xs font-semibold text-brand">{m.level} · 실습</span>
        <HintToggle hint={m.hint} />
      </div>

      <h3 className="text-lg font-bold text-navy">빠진 재료를 모두 고르세요</h3>

      <div className="mt-4 space-y-2.5">
        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
          <p className="mb-1 font-bold text-navy">상황</p>
          {m.situation}
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-brand-ink">
          <p className="mb-1 font-bold text-navy">프롬프트</p>
          <span className="italic">&ldquo;{m.prompt}&rdquo;</span>
        </div>
      </div>

      <p className="mt-5 text-sm font-semibold text-navy">{m.question}</p>

      <div className="mt-3 space-y-2.5">
        {m.chips.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={submitted}
            onClick={() => toggle(c.id)}
            className={[
              "w-full rounded-xl border px-4 py-3 text-left transition disabled:cursor-default",
              chipClass(c.id, c.missing),
            ].join(" ")}
          >
            <span className="text-sm font-semibold">{c.label}</span>
            <span className="mt-0.5 block text-xs text-slate-500">{c.desc}</span>
          </button>
        ))}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={selected.size === 0}
          onClick={() => setSubmitted(true)}
          className="mt-5 self-center rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          제출하기
        </button>
      ) : (
        <div className="mt-5">
          <FeedbackBox
            feedback={{
              status: result.perfect ? "correct" : "wrong",
              text: result.perfect
                ? `${totalMissing}/${totalMissing}개 정답. 빠진 재료를 모두 정확히 골랐습니다.`
                : `${result.correctlyPicked}/${totalMissing}개 정답, ${result.missed}개를 빠뜨렸습니다.${
                    result.falsePositive
                      ? " 이미 포함된 재료는 빼고 다시 살펴보세요." : ""
                  }`,
            }}
          />
        </div>
      )}

      <NavButtons onPrev={onPrev} onNext={onNext} nextDisabled={!submitted} />
    </MissionShell>
  );
}
