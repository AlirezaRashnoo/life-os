import type { Metadata } from "next";
import "../styles/globals.css";
import ThemeProvider from "@/theme/ThemeProvider";
import "../styles/calendar.css";
import { Vazirmatn } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
});
export const metadata: Metadata = {
  title: "LifeOS",
  description: "LifeOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${jbmono.variable}`}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
