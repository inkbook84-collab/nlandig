import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "책통클럽 & 공필왕 가맹 본부",
  description: "2024-2030 교육 트렌드의 중심, 책통클럽과 공필왕 학원 가맹 문의",
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
