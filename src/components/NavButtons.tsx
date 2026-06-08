type NavButtonsProps = {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
};

export function NavButtons({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  nextLabel = "다음 →",
}: NavButtonsProps) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[17px] font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← 이전
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="rounded-xl bg-brand px-6 py-2.5 text-[17px] font-semibold text-white shadow-sm transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        {nextLabel}
      </button>
    </div>
  );
}
