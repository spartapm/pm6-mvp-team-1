import type { Feedback } from "@/types";

export function FeedbackBox({ feedback }: { feedback: Feedback }) {
  const isCorrect = feedback.status === "correct";
  return (
    <div
      className={[
        "animate-fade-in rounded-xl p-4 text-sm leading-relaxed",
        isCorrect
          ? "bg-correct-soft text-correct"
          : "bg-wrong-soft text-wrong",
      ].join(" ")}
    >
      <p className="mb-1 flex items-center gap-1.5 font-bold">
        <span>{isCorrect ? "⭕" : "❌"}</span>
        <span>{isCorrect ? "정답" : "오답"}</span>
      </p>
      <p className="whitespace-pre-line text-slate-700">{feedback.text}</p>
    </div>
  );
}
