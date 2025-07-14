import { type NextRequest, NextResponse } from "next/server"

/**
 * Cart API - Sử dụng localStorage/sessionStorage ở frontend
 * API này chỉ để validate và tính toán
 */

/**
 * POST /api/cart/validate
 * Validate cart items và tính tổng tiền
 */
export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Dữ liệu giỏ hàng không hợp lệ" }, { status: 400 })
    }

    // Import here to avoid circular dependency
    const dbConnect = (await import("@/lib/mongodb")).default
    const Product = (await import("@/models/Product")).default

    await dbConnect()

    // Validate each item
    const validatedItems = []
    let totalAmount = 0

    for (const item of items) {
      const product = await Product.findById(item.productId).select("title price thumbnail status")

      if (!product || product.status !== "active") {
        return NextResponse.json(
          { error: `Sản phẩm ${item.title || "không xác định"} không còn khả dụng` },
          { status: 400 },
        )
      }

      const validatedItem = {
        productId: product._id.toString(),
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }

      validatedItems.push(validatedItem)
      totalAmount += product.price
    }

    return NextResponse.json({
      success: true,
      data: {
        items: validatedItems,
        totalAmount,
        itemCount: validatedItems.length,
      },
    })
  } catch (error: any) {
    console.error("Validate cart error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
