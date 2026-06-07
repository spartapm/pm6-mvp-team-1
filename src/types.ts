export type ScreenId =
  | "landing"
  | "mission1"
  | "mission2"
  | "mission3"
  | "mission4"
  | "mission5"
  | "complete";

export type ConceptItem = {
  title: string;
  desc: string;
};

export type QuizOption = {
  id: string;
  label: string;
  correct: boolean;
};

export type Chip = {
  id: string;
  label: string;
  desc: string;
  /** true 이면 "빠진 재료"로 골라야 하는 정답 칩 */
  missing: boolean;
};

export type Block = {
  id: string;
  label: string;
  /** true 이면 조립해야 하는 정답 블록 */
  correct: boolean;
};

export type Feedback = {
  status: "correct" | "wrong";
  text: string;
};

export type AiState = {
  loading: boolean;
  /** 미션5에서 생성된 카피(있을 경우) */
  copy?: string;
  /** 코치 피드백 */
  feedback?: string;
  /** 정답/오답 판정 (있을 경우) */
  status?: "correct" | "wrong";
  /** 사용자에게 보여줄 오류 메시지 */
  error?: string;
};
