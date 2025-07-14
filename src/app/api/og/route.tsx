import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "KQ Web - Template Website Chuyên nghiệp"
    const description = searchParams.get("description") || "Thiết kế hiện đại, responsive và tối ưu SEO"
    const price = searchParams.get("price")
    const category = searchParams.get("category")

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "60px",
            margin: "40px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            maxWidth: "1000px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "20px",
            }}
          >
            KQ Web
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#1f2937",
              textAlign: "center",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "#6b7280",
              textAlign: "center",
              marginBottom: "30px",
              lineHeight: "1.4",
            }}
          >
            {description}
          </div>

          {/* Price and Category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {price && (
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#8B5CF6",
                  backgroundColor: "#f3f4f6",
                  padding: "10px 20px",
                  borderRadius: "10px",
                }}
              >
                {price}đ
              </div>
            )}
            {category && (
              <div
                style={{
                  fontSize: "20px",
                  color: "#3B82F6",
                  backgroundColor: "#eff6ff",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                }}
              >
                {category}
              </div>
            )}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
