import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pawan Mate Education | Premier Engineering & Diploma Coaching",
  description: "Official landing page for Pawan Mate Education. Access top-quality Polytechnic, Diploma, and Degree Engineering courses, live classes, video lectures, and study materials.",
  keywords: ["Pawan Mate Education", "PME", "Engineering Coaching", "Polytechnic Diploma", "Live Classes", "Video Lectures", "SPPU", "MSBTE"],
  openGraph: {
    title: "Pawan Mate Education",
    description: "Empowering engineering and diploma students with top tier lectures, syllabus coverage, and exam preparation.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
