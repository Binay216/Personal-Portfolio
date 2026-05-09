import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundStars from "@/components/BackgroundStars";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Binay Siwakoti — Student · Tech Enthusiast · Coder",
  description:
    "Personal portfolio of Binay Siwakoti — student exploring full-stack development, cybersecurity, and networking.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground relative">
        <BackgroundStars />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
