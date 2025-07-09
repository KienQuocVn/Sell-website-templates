import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"
import { getUserFromRequest } from "@/lib/auth"

/**
 * GET /api/orders
 * Lấy danh sách đơn hàng của user
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const skip = (page - 1) * limit
    const [orders, total] = await Promise.all([
      Order.find({ userId: currentUser.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("items.productId", "title slug thumbnail"),
      Order.countDocuments({ userId: currentUser.userId }),
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
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}

/**
 * POST /api/orders
 * Tạo đơn hàng mới
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { customerInfo, items, paymentMethod, notes } = await request.json()

    // Validate input
    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return NextResponse.json({ error: "Thông tin khách hàng là bắt buộc" }, { status: 400 })
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Giỏ hàng trống" }, { status: 400 })
    }

    if (!paymentMethod) {
      return NextResponse.json({ error: "Phương thức thanh toán là bắt buộc" }, { status: 400 })
    }

    // Validate products and calculate total
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
        productId: product._id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }

      validatedItems.push(validatedItem)
      totalAmount += product.price
    }

    // Get current user if logged in
    const currentUser = getUserFromRequest(request)
    const orderData: any = {
      customerInfo,
      items: validatedItems,
      totalAmount,
      paymentMethod,
      notes,
    }

    if (currentUser) {
      orderData.userId = currentUser.userId
    }

    const order = await Order.create(orderData)

    // Update download counts
    await Promise.all(
      validatedItems.map((item) => Product.findByIdAndUpdate(item.productId, { $inc: { downloads: 1 } })),
    )

    return NextResponse.json(
      {
        success: true,
        message: "Đặt hàng thành công",
        data: {
          orderId: order._id,
          totalAmount: order.totalAmount,
          status: order.status,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
