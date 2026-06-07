import { Header } from "../Header";
import { TrophyIcon } from "../icons";
import { completion } from "@/data/missions";

export function CompletionScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-cream">
      <Header currentIndex={5} />
      <main className="mx-auto max-w-2xl px-5 py-14">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-correct-soft text-correct">
            <TrophyIcon className="h-9 w-9" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-navy">
            {completion.title}
          </h1>
          <div className="mt-3 space-y-1 text-[15px] leading-relaxed text-slate-500">
            {completion.lead.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-brand-soft p-6">
          <p className="font-bold text-brand-ink">{completion.recapTitle}</p>
          <ol className="mt-4 space-y-2.5">
            {completion.recap.map((item, i) => (
              <li key={item} className="flex gap-2 text-sm text-slate-700">
                <span className="font-bold text-brand">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={onHome}
          className="mt-8 w-full rounded-xl border border-slate-200 bg-white py-4 text-base font-bold text-navy shadow-card transition hover:bg-slate-50"
        >
          홈으로 돌아가기
        </button>
      </main>
    </div>
  );
}
