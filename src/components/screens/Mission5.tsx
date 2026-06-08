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
      learnExample={m.learnExample}
      question={m.question}
      hint={m.hint}
      situationBlocks={[
        {
          label: "상황",
          body: <p>{m.situation}</p>,
        },
      ]}
      placeholder={m.placeholder}
      endpoint="/api/generate"
      showGeneratedCopy
      runLabel="제출하기"
      centerRunButton
      onPrev={onPrev}
      onNext={onNext}
    />
  );
}
