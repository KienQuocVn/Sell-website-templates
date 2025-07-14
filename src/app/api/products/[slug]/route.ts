import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/src/lib/mongodb"
import Product from "@/src/models/Product"
import { getUserFromRequest } from "@/src/lib/auth"

/**
 * GET /api/products/[slug]
 * Lấy chi tiết sản phẩm theo slug
 */
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect()

    const product = await Product.findOne({
      slug: params.slug,
      status: "active",
    }).select("-downloadUrl") // Don't expose download URL

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error: any) {
    console.error("Get product error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}

/**
 * PUT /api/products/[slug]
 * Cập nhật sản phẩm (Admin only)
 */
export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const updateData = await request.json()

    // If slug is being updated, check for conflicts
    if (updateData.slug && updateData.slug !== params.slug) {
      const existingProduct = await Product.findOne({ slug: updateData.slug })
      if (existingProduct) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    const product = await Product.findOneAndUpdate({ slug: params.slug }, updateData, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: product,
    })
  } catch (error: any) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}

/**
 * DELETE /api/products/[slug]
 * Xóa sản phẩm (Admin only)
 */
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const product = await Product.findOneAndDelete({ slug: params.slug })

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Xóa sản phẩm thành công",
    })
  } catch (error: any) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
