import "./globals.css";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Notes App",
  description: "A full-stack notes app with Next.js + MongoDB",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar />
          <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
