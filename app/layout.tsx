import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "株式会社戸根 | 創業50年の地域密着リフォーム・工務店",
  description: "内装・外装工事からリフォームまで。創業50年の実績と技術で、お客様の大切な住まいをサポートします。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B6914",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} scroll-smooth`}>
      <body className="min-h-full font-sans antialiased bg-stone-50 text-stone-800">
        {children}
      </body>
    </html>
  );
}
