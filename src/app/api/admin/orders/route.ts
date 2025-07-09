import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import { getUserFromRequest } from "@/lib/auth"

/**
 * GET /api/admin/orders
 * Lấy tất cả đơn hàng cho admin
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

    const query: any = {}
    if (status && ["pending", "completed", "cancelled", "refunded"].includes(status)) {
      query.status = status
    }

    const skip = (page - 1) * limit
    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "name email")
        .populate("items.productId", "title slug"),
      Order.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("Admin get orders error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
