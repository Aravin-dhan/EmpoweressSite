import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/styles/fonts";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTopButton } from "@/components/ui/back-to-top";
import { AnalyticsSnippet } from "@/components/providers/analytics";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { QuickBrowseBar } from "@/components/navigation/quick-browse";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  creator: "Empoweress Editorial",
  authors: [{ name: "Empoweress Editorial" }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@empoweress",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "feminism",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6B46C1" },
    { media: "(prefers-color-scheme: dark)", color: "#F472B6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground", fontVariables)}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <QuickBrowseBar />
            <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-6xl">{children}</div>
            </main>
            <SiteFooter />
          </div>
          <BackToTopButton />
          <AnalyticsSnippet />
          <SiteJsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
