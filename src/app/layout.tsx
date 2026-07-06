import type { Metadata } from "next";
import "./globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "원피드마케팅 자동 문서 생성기",
  description: "견적서, 제안서, 계약서, 콜드메일을 손쉽게 생성하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
