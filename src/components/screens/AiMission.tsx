"use client";

import { useState } from "react";
import { MissionShell } from "../MissionShell";
import { HintToggle } from "../HintToggle";
import { FeedbackBox } from "../FeedbackBox";
import { NavButtons } from "../NavButtons";
import type { AiState, ConceptItem } from "@/types";
import { MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from "@/data/missions";

type SituationBlock = { label: string; body: React.ReactNode };

type AiMissionProps = {
  index: number;
  level: string;
  learnTitle: string;
  learnLead: string;
  concepts: ConceptItem[];
  question: string;
  hint: string;
  /** 상황/원문 등 상단 설명 블록들 */
  situationBlocks: SituationBlock[];
  placeholder: string;
  /** 호출할 API 엔드포인트 (/api/evaluate | /api/generate) */
  endpoint: string;
  /** 생성된 카피를 보여줄지 (미션5) */
  showGeneratedCopy?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function AiMission({
  index,
  level,
  learnTitle,
  learnLead,
  concepts,
  question,
  hint,
  situationBlocks,
  placeholder,
  endpoint,
  showGeneratedCopy = false,
  onPrev,
  onNext,
}: AiMissionProps) {
  const [text, setText] = useState("");
  const [ai, setAi] = useState<AiState>({ loading: false });

  const trimmedLength = text.trim().length;
  const tooLong = text.length > MAX_INPUT_LENGTH;
  const canRun = trimmedLength >= MIN_INPUT_LENGTH && !tooLong && !ai.loading;
  const completed = ai.status === "correct" || ai.status === "wrong";

  async function run() {
    if (!canRun) return;
    setAi({ loading: true });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: text.trim() }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setAi({
          loading: false,
          error: data?.error ?? "오류가 발생했어요, 다시 시도해주세요.",
        });
        return;
      }
      if (!data || !data.feedback) {
        setAi({ loading: false, error: "응답을 가져오지 못했어요." });
        return;
      }

      setAi({
        loading: false,
        copy: data.copy,
        feedback: data.feedback,
        status: data.status === "correct" ? "correct" : "wrong",
      });
    } catch {
      setAi({
        loading: false,
        error: "연결이 끊어졌어요. 네트워크를 확인해주세요.",
      });
    }
  }

  return (
    <MissionShell
      index={index}
      level={level}
      learnTitle={learnTitle}
      learnLead={learnLead}
      concepts={concepts}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <span className="text-xs font-semibold text-brand">{level} · 실습</span>
        <HintToggle hint={hint} />
      </div>

      <h3 className="text-lg font-bold text-navy">{question}</h3>

      <div className="mt-4 space-y-2.5">
        {situationBlocks.map((b, i) => (
          <div
            key={i}
            className="rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600"
          >
            <p className="mb-1 font-bold text-navy">{b.label}</p>
            {b.body}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={5}
          disabled={ai.loading}
          className={[
            "w-full resize-none rounded-xl border bg-white p-4 text-sm leading-relaxed text-slate-700 outline-none transition placeholder:text-slate-400",
            tooLong
              ? "border-wrong focus:border-wrong"
              : "border-slate-200 focus:border-brand",
          ].join(" ")}
        />
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className={tooLong ? "font-semibold text-wrong" : "text-transparent"}>
            500자 이상 입력할 수 없어요.
          </span>
          <span className={tooLong ? "font-semibold text-wrong" : "text-slate-400"}>
            {text.length}/{MAX_INPUT_LENGTH}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={!canRun}
        onClick={run}
        className="mt-2 self-end rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        AI 실행
      </button>

      <div className="mt-5">
        {ai.loading && <LoadingState />}

        {!ai.loading && ai.error && (
          <div className="animate-fade-in rounded-xl bg-wrong-soft p-4 text-sm font-medium text-wrong">
            {ai.error}
          </div>
        )}

        {!ai.loading && !ai.error && !completed && (
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-400">
            AI 응답이 여기에 표시됩니다.
          </div>
        )}

        {!ai.loading && !ai.error && completed && (
          <div className="space-y-3">
            {showGeneratedCopy && ai.copy && (
              <div className="animate-fade-in rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700">
                <p className="mb-2 text-xs font-semibold text-brand">생성된 카피</p>
                <p className="whitespace-pre-line">{ai.copy}</p>
              </div>
            )}
            <FeedbackBox
              feedback={{ status: ai.status!, text: ai.feedback ?? "" }}
            />
          </div>
        )}
      </div>

      <NavButtons onPrev={onPrev} onNext={onNext} nextDisabled={!completed} />
    </MissionShell>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl bg-slate-50 py-8">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
      <p className="text-sm text-slate-500">로딩중입니다. 잠시만 기다려주세요</p>
    </div>
  );
}

