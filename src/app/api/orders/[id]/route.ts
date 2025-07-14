import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/src/lib/mongodb"
import Order from "@/src/models/Order"
import { getUserFromRequest } from "@/src/lib/auth"

/**
 * GET /api/orders/[id]
 * Lấy chi tiết đơn hàng
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 })
    }

    const order = await Order.findOne({
      _id: params.id,
      $or: [{ userId: currentUser.userId }, { "customerInfo.email": currentUser.email }],
    }).populate("items.productId", "title slug thumbnail downloadUrl")

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error: any) {
    console.error("Get order error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
