import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Analytics } from "@/components/Analytics"
import { Suspense } from "react"
import { PerformanceMonitor } from "@/components/PerformanceMonitor"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kqweb.vercel.app"),
  title: {
    default: "KQ Web - Nền tảng Template Website Chuyên nghiệp",
    template: "%s | KQ Web",
  },
  description:
    "Khám phá và mua các template website chất lượng cao từ KQ Web. Thiết kế hiện đại, responsive và tối ưu SEO cho mọi ngành nghề.",
  keywords: [
    "template website",
    "thiết kế web",
    "website bán hàng",
    "portfolio template",
    "business website",
    "landing page",
    "responsive design",
    "SEO template",
    "Next.js template",
    "React template",
  ],
  authors: [{ name: "KQ Web Team" }],
  creator: "KQ Web",
  publisher: "KQ Web",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "KQ Web",
    title: "KQ Web - Nền tảng Template Website Chuyên nghiệp",
    description:
      "Khám phá và mua các template website chất lượng cao từ KQ Web. Thiết kế hiện đại, responsive và tối ưu SEO.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KQ Web - Template Website Chuyên nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KQ Web - Nền tảng Template Website Chuyên nghiệp",
    description: "Khám phá và mua các template website chất lượng cao từ KQ Web.",
    images: ["/og-image.jpg"],
    creator: "@kqweb_dev",
  },
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
        </Suspense>
        <PerformanceMonitor />
      </body>
    </html>
  )
}
