import type { ConceptItem } from "@/types";
import { Fragment } from "react";
import { CheckCircleIcon } from "./icons";

type LearnPanelProps = {
  level: string;
  title: string;
  lead: string;
  concepts: ConceptItem[];
  /** 학습 자료 아래에 보여줄 좋은 프롬프트 예시 (선택) */
  example?: string;
};

export function LearnPanel({
  level,
  title,
  lead,
  concepts,
  example,
}: LearnPanelProps) {
  return (
    <section className="concept-card flex h-full flex-col">
      <span className="text-xs font-semibold text-brand">{level} · 학습</span>
      <h2 className="mt-2 text-xl font-bold text-navy">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{lead}</p>

      <ul className="mt-5 space-y-4">
        {concepts.map((c) => (
          <li key={c.title} className="flex gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <p className="text-sm font-bold text-navy">{c.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                {c.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {example && (
        <div className="mt-5 rounded-xl bg-brand-soft p-4">
          <p className="text-xs font-semibold text-brand">좋은 프롬프트 예시</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-ink">
            {renderExample(example)}
          </p>
        </div>
      )}
    </section>
  );
}

function renderExample(example: string) {
  const emphasizedLabels = new Set([
    "수정 프롬프트:",
    "생성된 카피 결과:",
    "→ 생성된 카피 결과:",
  ]);
  const lines = example.split("\n");

  return lines.map((line, index) => {
    const isEmphasized = emphasizedLabels.has(line.trim());
    return (
      <Fragment key={`${line}-${index}`}>
        {isEmphasized ? (
          <span className="font-bold text-brand">{line}</span>
        ) : (
          line
        )}
        {index < lines.length - 1 ? <br /> : null}
      </Fragment>
    );
  });
}
