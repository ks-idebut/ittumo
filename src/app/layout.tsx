import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ittumo | ペットのオリジナルグッズ",
  description:
    "愛するペットの写真で世界に1つだけのオリジナルグッズを。1個から注文OK、自社工場だから日本最安値。",
  keywords: ["ペットグッズ", "オリジナルグッズ", "ペット写真", "カスタムグッズ", "ittumo", "イッツモ"],
  openGraph: {
    title: "ittumo | ペットのオリジナルグッズ",
    description: "愛するペットの写真で世界に1つだけのオリジナルグッズを。",
    url: "https://ittumo.net",
    siteName: "ittumo",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
