import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/src/lib/mongodb"
import Product from "@/src/models/Product"
import { getUserFromRequest } from "@/src/lib/auth"

/**
 * GET /api/admin/products
 * Lấy tất cả sản phẩm cho admin (bao gồm draft, inactive)
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Build query (không filter theo status như public API)
    const query: any = {}

    if (status && ["active", "inactive", "draft"].includes(status)) {
      query.status = status
    }

    if (category && category !== "all") {
      query.category = category
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
      Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("Admin get products error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
