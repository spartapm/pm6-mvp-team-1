"use client";

import { AiMission } from "./AiMission";
import { mission5 as m } from "@/data/missions";

export function Mission5({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <AiMission
      index={4}
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
                <span className="font-semibold text-navy">예시 상품:</span>{" "}
                {m.productExamples}
              </p>
            </>
          ),
        },
      ]}
      placeholder={m.placeholder}
      endpoint="/api/generate"
      showGeneratedCopy
      onPrev={onPrev}
      onNext={onNext}
    />
  );
}
