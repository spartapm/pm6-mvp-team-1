import OpenAI from "openai";
import { SYSTEM_COMMON } from "./prompts";

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
// 스펙상 타임아웃 기준은 3초이나, 실제 OpenAI 생성은 보통 3초를 초과하므로
// 정상 응답이 타임아웃 처리되지 않도록 현실적인 값으로 설정한다.
const REQUEST_TIMEOUT_MS = 20000;

export type ChatResult = {
  content: string;
};

let client: OpenAI | null = null;

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
}

export function hasApiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/**
 * 공통 시스템 프롬프트 + 미션별 프롬프트로 채팅을 호출한다.
 * temperature 는 미션별 신뢰성 정책에 맞춰 호출부에서 지정한다.
 * 타임아웃(3초) 초과 시 throw → 라우트에서 408 처리.
 */
export async function runChat(params: {
  missionPrompt: string;
  temperature: number;
}): Promise<ChatResult> {
  const openai = getClient();
  if (!openai) {
    throw new Error("NO_API_KEY");
  }

  const completion = await openai.chat.completions.create(
    {
      model: MODEL,
      temperature: params.temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_COMMON },
        { role: "user", content: params.missionPrompt },
      ],
    },
    { timeout: REQUEST_TIMEOUT_MS }
  );

  const content = completion.choices[0]?.message?.content ?? "";
  return { content };
}
