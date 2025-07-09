import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "Giới thiệu về KQ Web - Câu chuyện và Sứ mệnh",
  description:
    "Tìm hiểu về KQ Web - từ ý tưởng khởi nghiệp đến nền tảng template website hàng đầu Việt Nam. Câu chuyện, giá trị cốt lõi và hành trình phát triển.",
  keywords: ["giới thiệu KQ Web", "về chúng tôi", "câu chuyện khởi nghiệp", "template website Vietnam"],
  openGraph: {
    title: "Giới thiệu về KQ Web - Câu chuyện và Sứ mệnh",
    description: "Tìm hiểu về KQ Web - từ ý tưởng khởi nghiệp đến nền tảng template website hàng đầu Việt Nam.",
    url: "/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Về KQ Web - Template Website Chuyên nghiệp",
      },
    ],
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
