/**
 * OPENAI_API_KEY 가 없을 때 사용하는 데모용 휴리스틱 평가기.
 * 실제 AI 없이도 앱이 끝까지 동작하도록 키워드 기반으로 정답/오답을 판정한다.
 */

const COPY_KEYWORDS = [
  "상세",
  "페이지",
  "카피",
  "오프닝",
  "프롬프트",
  "타깃",
  "고객",
  "톤",
  "브랜드",
  "셔츠",
  "컵",
  "퍼스널",
  "여름",
  "시원",
  "감정",
  "본문",
  "결론",
  "써줘",
  "만들어",
  "바꿔",
  "수정",
];

function isRelated(input: string): boolean {
  return COPY_KEYWORDS.some((k) => input.includes(k));
}

export type Mission4Result = {
  status: "correct" | "wrong";
  feedback: string;
};

const M4_CORRECT =
  "수정 지시 3가지가 모두 잘 담겨 있어요.\n무엇을 바꿀지, 어떻게 바꿀지, 무엇을 유지할지가 명확합니다.";
const M4_WRONG =
  "수정 지시의 3가지를 모두 담아 다시 써보세요.\n→ 무엇이 문제인지: 딱딱한 표현·전문 용어\n→ 어떻게 바꿀지: 일상어, 감정 중심 표현\n→ 무엇을 유지할지: 전체 톤, 핵심 메시지";

export function mockMission4(userInput: string): Mission4Result {
  if (!isRelated(userInput)) {
    return {
      status: "wrong",
      feedback: "상세페이지 카피 프롬프트와 관련된 내용을 작성해주세요.",
    };
  }

  const changeSignals = ["빼", "바꿔", "바꾸", "제거", "줄여", "고쳐", "수정"];
  const directionSignals = ["일상어", "쉽게", "감정", "톤", "줄", "처럼", "느낌", "친근"];
  const keepSignals = ["유지", "그대로", "남기", "지켜", "살려"];

  const hasChange = changeSignals.some((s) => userInput.includes(s));
  const hasDirection = directionSignals.some((s) => userInput.includes(s));
  const hasKeep = keepSignals.some((s) => userInput.includes(s));

  const score = [hasChange, hasDirection, hasKeep].filter(Boolean).length;
  return score >= 2
    ? { status: "correct", feedback: M4_CORRECT }
    : { status: "wrong", feedback: M4_WRONG };
}

export type Mission5Result = {
  copy: string;
  status: "correct" | "wrong";
  feedback: string;
};

const M5_CORRECT =
  "핵심 요소들이 잘 포함되어 있습니다. 타깃·구조·톤이 명확합니다.";
const M5_WRONG =
  "타깃이나 출력 형식을 조금 더 구체적으로 추가하면 더 좋아집니다.";

export function mockMission5(userInput: string): Mission5Result {
  if (!isRelated(userInput)) {
    return {
      copy: "",
      status: "wrong",
      feedback: "상세페이지 카피 프롬프트와 관련된 내용을 작성해주세요.",
    };
  }

  const checks = [
    /\d{2}\s?[~\-]?\s?\d{0,2}\s?대|타깃|여성|남성|직장|주부|솔로|캠퍼/, // 타깃
    /오프닝|본문|결론|구조|단계|cta|클로징/i, // 구조
    /톤|일상어|감성|과장 금지|친근|공감/, // 톤
    /줄|자|이내|형식|항목|구성/, // 출력 형식
    /금지|빼고|제외|말고|없이/, // 금지 조건
  ];
  const matched = checks.filter((re) => re.test(userInput)).length;

  const copy = [
    "프롬프트를 기반으로 카피를 생성했습니다.",
    "",
    "땀에 젖은 셔츠, 하루에 두 번 갈아입느라 지치셨죠.",
    "이 셔츠는 입는 순간 바람이 닿은 듯 시원해, 한낮 외근에도 보송함이 오래갑니다.",
    "오늘 같은 더위, 더는 셔츠 때문에 망설이지 마세요.",
  ].join("\n");

  return {
    copy,
    status: matched >= 4 ? "correct" : "wrong",
    feedback: matched >= 4 ? M5_CORRECT : M5_WRONG,
  };
}
