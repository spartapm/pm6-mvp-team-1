# 프롬잡 (Prompt Job)

4050 세대를 위한 **상세페이지 프롬프트 마스터** 학습 웹앱.
좋은 상세페이지가 왜 팔리는지 이해하고, AI 프롬프트로 직접 만들어보는 5단계 실습 시퀀스입니다.

## 5단계 미션

| 단계 | 미션 | 형태 |
| --- | --- | --- |
| LV.1 | 감 잡기 | 객관식 퀴즈 (정답/오답 피드백) |
| LV.2 | 재료 선택 | 빠진 재료 복수 선택 + 채점 |
| LV.3 | 블록 조립 | 올바른 블록만 순서대로 조립 + 채점 |
| LV.4 | 결과 수립 | 수정 프롬프트 작성 → AI 평가 |
| LV.5 | 실전 미션 | 완성형 프롬프트 작성 → AI 카피 생성 + 평가 |

## 기술 스택

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **OpenAI** (미션 4·5 AI 평가/생성)

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## AI 연동 (선택)

미션 4·5는 AI 평가를 사용합니다. `.env.local.example` 을 복사해 `.env.local` 을 만들고
OpenAI API 키를 넣으면 실제 AI 평가가 동작합니다.

```bash
cp .env.local.example .env.local
# .env.local 에 OPENAI_API_KEY 입력
```

> 키가 없어도 **데모용 휴리스틱 평가**로 앱 전체가 끝까지 동작합니다.

### AI 신뢰성 정책

- 미션 4 평가: `temperature 0.2` (일관된 판정)
- 미션 5 생성: `temperature 0.75` (자연스러운 카피)
- 공통 시스템 프롬프트로 점수·등급 미출력, 한국어 코치 톤 유지
- 응답은 JSON 으로 강제하여 정답/오답 + 피드백 형식을 고정

## 예외 처리

- 입력 10자 미만: `AI 실행` 버튼 비활성
- 500자 초과: "500자 이상 입력할 수 없어요" 안내 + 버튼 비활성
- 응답 누락 / 타임아웃(3초) / 네트워크 단절 / API 오류: 각 상황별 안내 메시지 표시

## 폴더 구조

```
src/
  app/
    page.tsx              # 화면 전환 오케스트레이션
    api/evaluate/route.ts # 미션4 AI 평가
    api/generate/route.ts # 미션5 AI 생성+평가
  components/
    screens/              # 랜딩 · 미션1~5 · 완료 화면
    ...                   # 공통 UI (헤더/학습패널/힌트/피드백/내비)
  data/missions.ts        # 미션 콘텐츠
  lib/                    # AI 클라이언트 · 프롬프트 · 데모 평가기
```
