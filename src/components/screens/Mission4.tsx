"use client";

import { AiMission } from "./AiMission";
import { mission4 as m } from "@/data/missions";

export function Mission4({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AiMission
      index={3}
      level={m.level}
      learnTitle={m.learnTitle}
      learnLead={m.learnLead}
      concepts={m.concepts}
      question={m.question}
      hint={m.hint}
      situationBlocks={[
        {
          label: "상황",
          body: (
            <>
              <p>{m.situation}</p>
              <p className="mt-2">
                <span className="font-semibold text-navy">원문:</span> &ldquo;
                {m.originalCopy}&rdquo;
              </p>
            </>
          ),
        },
      ]}
      placeholder={m.placeholder}
      endpoint="/api/evaluate"
      onPrev={onPrev}
      onNext={onNext}
    />
  );
}
