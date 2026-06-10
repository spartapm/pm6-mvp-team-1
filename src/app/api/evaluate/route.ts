import { NextResponse } from "next/server";
import { hasApiKey, runChat } from "@/lib/ai";
import { isMeaningfulPrompt } from "@/lib/validate";
import { mockMission4 } from "@/lib/mock";
import { buildMission4Prompt } from "@/lib/prompts";
import { mission4, MAX_INPUT_LENGTH, MIN_INPUT_LENGTH } from "@/data/missions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let userInput = "";
  try {
    const body = await req.json();
    userInput = typeof body?.userInput === "string" ? body.userInput.trim() : "";
  } catch {
    return NextResponse.json(
      { error: "오류가 발생했어요, 다시 시도해주세요." },
      { status: 400 }
    );
  }

  if (userInput.length < MIN_INPUT_LENGTH) {
    return NextResponse.json(
      { error: "조금 더 구체적으로 작성해보세요." },
      { status: 422 }
    );
  }
  if (userInput.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: "500자 이상 입력할 수 없어요." },
      { status: 422 }
    );
  }

  if (!isMeaningfulPrompt(userInput)) {
    return NextResponse.json(
      { error: "프롬프트 내용을 다시 확인해주세요. 의미 있는 문장으로 작성해주세요." },
      { status: 422 }
    );
  }

  // 데모 모드: API 키가 없으면 휴리스틱으로 평가
  if (!hasApiKey()) {
    return NextResponse.json(mockMission4(userInput));
  }

  try {
    const { content } = await runChat({
      missionPrompt: buildMission4Prompt({
        originalCopy: mission4.originalCopy,
        problemDescription: mission4.situation,
        userInput,
      }),
      temperature: 0.3,
    });

    const parsed = safeParse(content);
    if (!parsed?.feedback) {
      return NextResponse.json(
        { error: "응답을 가져오지 못했어요." },
        { status: 502 }
      );
    }
    return NextResponse.json({
      status: parsed.status === "correct" ? "correct" : "wrong",
      feedback: parsed.feedback,
    });
  } catch (err) {
    return handleAiError(err);
  }
}

function safeParse(content: string): { status?: string; feedback?: string } | null {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function handleAiError(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  if (message.includes("timeout") || message.includes("aborted")) {
    return NextResponse.json(
      { error: "페이지를 새로고침 해주세요." },
      { status: 408 }
    );
  }
  return NextResponse.json(
    { error: "오류가 발생했어요, 다시 시도해주세요." },
    { status: 502 }
  );
}
