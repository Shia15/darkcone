// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "./components/SiteNav";

export const metadata: Metadata = {
  title: "Darkcone",
  description: "Emotionally intelligent interfaces—minimal, luxe, precise.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-200 antialiased selection:bg-amber-400/30">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
