import { SERVICE } from "@/data/missions";
import { LogoIcon } from "../icons";

export function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="bg-navy text-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-5 font-bold">
          <LogoIcon className="h-6 w-6" />
          <span className="text-lg leading-none">{SERVICE.name}</span>
          <span className="hidden text-[11px] font-medium text-white/55 sm:inline">
            {SERVICE.nameEn}
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <LogoIcon className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-navy">{SERVICE.name}</h1>
          <p className="mt-2 text-base font-semibold text-brand">{SERVICE.subtitle}</p>

          <div className="mt-6 space-y-1 text-[15px] leading-relaxed text-slate-500">
            {SERVICE.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={onStart}
            className="mt-10 rounded-xl bg-brand px-10 py-3.5 text-base font-bold text-white shadow-pop transition hover:bg-brand-ink"
          >
            시작하기
          </button>
        </div>
      </main>
    </div>
  );
}
