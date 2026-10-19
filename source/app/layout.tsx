import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { site } from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" })
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" })

const title = `${site.name} (${site.handle}) | ${site.role} at ${site.company}`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Anshuman",
    "Anshuman Pathak",
    "anshumanxda",
    "Anshuman Pathak software engineer",
    "Anshuman Pathak frontend engineer",
    "Anshuman Pathak Aftershoot",
    "Anshuman Pathak portfolio",
    "Anshuman Pathak developer",
    "frontend engineer India",
    "React developer",
    "Next.js developer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    firstName: "Anshuman",
    lastName: "Pathak",
    username: site.handle,
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, ${site.role} at ${site.company}` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/og.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee1" },
    { media: "(prefers-color-scheme: dark)", color: "#09110d" },
  ],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      givenName: "Anshuman",
      familyName: "Pathak",
      alternateName: [site.handle, "Anshuman"],
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.role,
      description: site.description,
      worksFor: { "@type": "Organization", name: site.company, url: site.companyUrl },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Indira Gandhi National Open University (IGNOU)" },
      knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Redux", "Frontend engineering", "Web performance"],
      sameAs: [site.social.github, site.social.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: site.handle,
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: title,
      mainEntity: { "@id": `${site.url}/#person` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(inter.variable, display.variable, mono.variable, "font-sans antialiased")}
        suppressHydrationWarning
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
