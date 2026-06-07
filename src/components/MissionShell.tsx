import type { ConceptItem } from "@/types";
import { Header } from "./Header";
import { LearnPanel } from "./LearnPanel";
import { MISSION_TITLES } from "@/data/missions";

type MissionShellProps = {
  /** 0-기반 미션 인덱스 */
  index: number;
  level: string;
  learnTitle: string;
  learnLead: string;
  concepts: ConceptItem[];
  children: React.ReactNode;
};

export function MissionShell({
  index,
  level,
  learnTitle,
  learnLead,
  concepts,
  children,
}: MissionShellProps) {
  return (
    <div className="min-h-screen bg-cream">
      <Header missionTitle={MISSION_TITLES[index]} currentIndex={index} />
      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <LearnPanel
            level={level}
            title={learnTitle}
            lead={learnLead}
            concepts={concepts}
          />
          <section className="practice-card flex h-full flex-col">{children}</section>
        </div>
      </main>
    </div>
  );
}
