import type { Metadata } from "next"
import ProductsPageClient from "./ProductsPageClient"

export const metadata: Metadata = {
  title: "Template Website Chất Lượng Cao - Khám Phá Ngay",
  description:
    "Hơn 50+ template website chuyên nghiệp cho mọi ngành nghề. E-commerce, Portfolio, Business, Blog và Landing Page. Thiết kế responsive, tối ưu SEO.",
  keywords: [
    "template website",
    "mua template",
    "thiết kế web",
    "website bán hàng",
    "portfolio template",
    "business website",
    "landing page template",
    "responsive design",
  ],
  openGraph: {
    title: "Template Website Chất Lượng Cao - KQ Web",
    description: "Hơn 50+ template website chuyên nghiệp cho mọi ngành nghề. Thiết kế responsive, tối ưu SEO.",
    url: "/products",
    images: [
      {
        url: "/og-products.jpg",
        width: 1200,
        height: 630,
        alt: "Template Website KQ Web",
      },
    ],
  },
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
