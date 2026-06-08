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
  const [order, setOrder] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const totalCorrect = useMemo(
    () => m.blocks.filter((b) => b.correct).length,
    []
  );

  function add(id: string) {
    if (submitted || order.includes(id)) return;
    setOrder((prev) => [...prev, id]);
  }
  function remove(id: string) {
    if (submitted) return;
    setOrder((prev) => prev.filter((x) => x !== id));
  }

  const result = useMemo(() => {
    const picked = m.blocks.filter((b) => order.includes(b.id));
    const correctPicked = picked.filter((b) => b.correct).length;
    const wrongPicked = picked.filter((b) => !b.correct).length;
    const missed = totalCorrect - correctPicked;
    const perfect = correctPicked === totalCorrect && wrongPicked === 0;
    return { correctPicked, wrongPicked, missed, perfect };
  }, [order, totalCorrect]);

  const blockById = (id: string) => m.blocks.find((b) => b.id === id)!;

  return (
    <MissionShell
      index={2}
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

      <p className="mt-5 text-sm font-semibold text-navy">조립 공간</p>
      <div className="mt-2 min-h-[88px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-3">
        {order.length === 0 ? (
          <p className="flex h-full items-center justify-center py-5 text-sm text-slate-400">
            {m.placeholder}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {order.map((id, i) => {
              const b = blockById(id);
              return (
                <button
                  key={id}
                  type="button"
                  disabled={submitted}
                  onClick={() => remove(id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-ink disabled:cursor-default"
                >
                  <span className="text-white/70">{i + 1}</span>
                  {b.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <p className="mt-5 text-sm font-semibold text-navy">블록 풀</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {m.blocks.map((b) => {
          const used = order.includes(b.id);
          return (
            <button
              key={b.id}
              type="button"
              disabled={submitted || used}
              onClick={() => add(b.id)}
              className={[
                "rounded-lg border px-3 py-2 text-xs font-medium transition",
                used
                  ? "border-slate-200 bg-slate-100 text-slate-300"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:bg-brand-soft",
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
          disabled={order.length === 0}
          onClick={() => setSubmitted(true)}
          className="mt-6 self-center rounded-xl bg-brand px-6 py-2.5 text-[17px] font-semibold text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          제출하기
        </button>
      ) : (
        <div className="mt-6">
          <FeedbackBox
            feedback={{
              status: result.perfect ? "correct" : "wrong",
              text: result.perfect
                ? `${totalCorrect}/${totalCorrect}개 정답. 완벽하게 조립했습니다!`
                : `${result.correctPicked}/${totalCorrect}개 정답, ${result.missed}개를 빠뜨렸습니다.${
                    result.wrongPicked > 0
                      ? ` 불필요한 블록 ${result.wrongPicked}개가 포함됐어요.`
                      : ""
                  }`,
            }}
          />
        </div>
      )}

      <NavButtons onPrev={onPrev} onNext={onNext} nextDisabled={!submitted} />
    </MissionShell>
  );
}
