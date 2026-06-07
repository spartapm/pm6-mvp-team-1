import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프롬잡 — 상세페이지 프롬프트 마스터",
  description:
    "4050 세대를 위한 5단계 프롬프트 실습. 좋은 상세페이지가 왜 팔리는지 이해하고 AI 프롬프트로 직접 만들어보세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
