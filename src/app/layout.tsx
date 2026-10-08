import type { Metadata, Viewport } from "next";
import { TASA_Orbiter, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SITE, PROFILE } from "@/lib/content";
import "./globals.css";

const orbiter = TASA_Orbiter({
  variable: "--font-orbiter",
  adjustFontFallback: false,
  subsets: ["latin"],
  display: "swap",
});

/* small labels, numbers, the trace */
const gmono = Geist_Mono({
  variable: "--font-gmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: SITE.title, template: `%s, ${PROFILE.name}` },
  description: SITE.description,
  authors: [{ name: PROFILE.name, url: SITE.domain }],
  creator: PROFILE.name,
  keywords: [
    "AI engineer",
    "applied AI engineer",
    "LLM engineer",
    "multi-agent systems",
    "tool calling",
    "retrieval-augmented generation",
    "voice AI",
    "production AI",
    "computer vision",
    PROFILE.name,
  ],
  openGraph: {
    type: "website",
    url: SITE.domain,
    title: SITE.title,
    description: SITE.description,
    siteName: PROFILE.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  colorScheme: "light",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  jobTitle: PROFILE.role,
  email: `mailto:${PROFILE.email}`,
  url: SITE.domain,
  sameAs: [PROFILE.github, PROFILE.linkedin],
  worksFor: { "@type": "Organization", name: PROFILE.company },
  address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressRegion: "MH", addressCountry: "IN" },
  knowsAbout: [
    "Large Language Models", "Multi-Agent Systems", "Tool Calling",
    "Retrieval-Augmented Generation", "Voice Interfaces", "Computer Vision",
    "Vision-Language Models", "Browser Automation",
  ],
  alumniOf: { "@type": "CollegeOrUniversity", name: "GH Raisoni College of Engineering" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${orbiter.variable} ${gmono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to work
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
