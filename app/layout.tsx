import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import me from "@/data/me.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = me.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${me.personal.name} | Full-Stack Engineer`,
    template: `%s | ${me.personal.name}`,
  },
  description: `Full-stack engineer specialized in Next.js, Node.js, and AI integrations. ${me.personal.mantra} Based in ${me.personal.location}.`,
  keywords: [
    "Felix Toledo",
    "Full-Stack Engineer",
    "Next.js Developer",
    "Node.js",
    "TypeScript",
    "AI Integrations",
    "MCP",
    "Software Engineer Argentina",
    "Portfolio",
    "Corrientes",
    "Develop",
    "Web Developer",
  ],
  authors: [{ name: me.personal.name, url: siteUrl }],
  creator: me.personal.name,
  publisher: me.personal.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${me.personal.name} | Full-Stack Engineer`,
    description: `Full-stack engineer specialized in Next.js, Node.js, and AI integrations. ${me.personal.mantra}`,
    siteName: `${me.personal.name} Portfolio`,
    images: [
      {
        url: "/felix.png",
        width: 400,
        height: 400,
        alt: me.personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${me.personal.name} | Full-Stack Engineer`,
    description: `Full-stack engineer specialized in Next.js, Node.js, and AI integrations.`,
    images: ["/felix.png"],
    creator: "@felixtoledoctes",
  },
  icons: {
    icon: [{ url: "/felix.png", type: "image/png", sizes: "any" }],
    shortcut: [{ url: "/felix.png", type: "image/png" }],
    apple: [{ url: "/felix.png", type: "image/png" }],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: me.personal.name,
  url: siteUrl,
  image: `${siteUrl}/felix.png`,
  sameAs: [me.socials.linkedin, me.socials.github],
  jobTitle: me.personal.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Corrientes",
    addressCountry: "AR",
  },
  email: me.contact.email,
  knowsAbout: [
    "Next.js",
    "Node.js",
    "TypeScript",
    "AI Agents",
    "MCP",
    "PostgreSQL",
    "Full-Stack Engineering",
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
        <link rel="icon" href="/felix.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container antialiased">
        {children}
      </body>
    </html>
  );
}
