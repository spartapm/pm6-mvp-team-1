import { LogoIcon } from "./icons";
import { SERVICE } from "@/data/missions";

type HeaderProps = {
  /** 미션 화면일 때 현재 미션 제목 (없으면 표시 안 함) */
  missionTitle?: string;
  /** 0-기반 현재 미션 인덱스 (없으면 진행 도트 숨김) */
  currentIndex?: number;
  totalSteps?: number;
};

export function Header({ missionTitle, currentIndex, totalSteps = 5 }: HeaderProps) {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-5">
        <div className="flex items-center gap-2 font-bold">
          <LogoIcon className="h-6 w-6" />
          <span className="text-lg leading-none">{SERVICE.name}</span>
          <span className="hidden text-[11px] font-medium text-white/55 sm:inline">
            {SERVICE.nameEn}
          </span>
        </div>

        {missionTitle && (
          <span className="ml-1 text-base font-semibold text-white/90">
            {missionTitle}
          </span>
        )}

        <div className="ml-auto flex items-center gap-4">
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/90">
            {SERVICE.badge}
          </span>
          {typeof currentIndex === "number" && (
            <ProgressDots current={currentIndex} total={totalSteps} />
          )}
        </div>
      </div>
    </header>
  );
}

function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`진행 ${current + 1}/${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={[
            "h-2 w-2 rounded-full transition-colors",
            i < current
              ? "bg-white"
              : i === current
                ? "bg-white"
                : "bg-white/30",
          ].join(" ")}
        />
      ))}
    </div>
  );
}
