import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { getUserFromRequest } from "@/lib/auth"

/**
 * PUT /api/admin/products/featured
 * Cập nhật trạng thái featured cho sản phẩm
 */
export async function PUT(request: NextRequest) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const { productId, featured } = await request.json()

    if (!productId || typeof featured !== "boolean") {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
    }

    const product = await Product.findByIdAndUpdate(productId, { featured }, { new: true })

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: `${featured ? "Đã đánh dấu" : "Đã bỏ đánh dấu"} sản phẩm nổi bật`,
      data: product,
    })
  } catch (error: any) {
    console.error("Update featured error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
