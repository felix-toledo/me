import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Felix Toledo | Full-Stack Engineer",
  description:
    "Full-stack engineering specialized in Next.js, Node.js, and automated ecosystems. Delivering resilient infrastructure for modern digital products.",
  keywords: [
    "Felix Toledo",
    "Full-Stack Engineer",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container antialiased">
        {children}
      </body>
    </html>
  );
}
