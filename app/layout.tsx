import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Briefing de LP",
  description: "Formulário de briefing para landing page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} antialiased`}>
      <body className="bg-[#0a0a0a] text-[#f2f2f2] font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
