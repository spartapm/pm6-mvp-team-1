/**
 * 사용자 프롬프트 입력이 "의미 있는 한국어 문장"인지 판별한다.
 * 길이만 통과한 무의미 문자열(예: "aldskfj;alkdfj;")이 그대로 AI로 넘어가
 * 멀쩡한 카피가 생성되는 문제를 막기 위한 서버 측 1차 게이트다.
 */
export function isMeaningfulPrompt(input: string): boolean {
  const text = input.trim();
  if (!text) return false;

  // 이 미션들은 모두 한국어 카피 프롬프트이므로 최소한의 완성형 한글이 필요하다.
  // (자모만 입력한 "ㅁㄴㅇㄹ" 류도 완성형이 아니므로 함께 걸러진다.)
  const hangulCount = (text.match(/[가-힣]/g) ?? []).length;
  if (hangulCount < 3) return false;

  // 같은 글자만 반복하는 무의미 입력(예: "가가가가...") 차단.
  const compact = text.replace(/\s/g, "");
  const uniqueRatio = new Set(compact).size / Math.max(compact.length, 1);
  if (compact.length >= 8 && uniqueRatio < 0.25) return false;

  return true;
}
