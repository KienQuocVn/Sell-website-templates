import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { getUserFromRequest } from "@/lib/auth"

/**
 * GET /api/products
 * Lấy danh sách sản phẩm với filter và pagination
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"

    // Build query
    const query: any = { status: "active" }

    if (category && category !== "all") {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    if (featured === "true") {
      query.featured = true
    }

    // Build sort
    const sortObj: any = {}
    sortObj[sort] = order === "desc" ? -1 : 1

    // Execute query with pagination
    const skip = (page - 1) * limit
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .select("-downloadUrl"), // Don't expose download URLs
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
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}

/**
 * POST /api/products
 * Tạo sản phẩm mới (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const productData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "slug", "description", "price", "thumbnail", "category", "previewUrl"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `Trường ${field} là bắt buộc` }, { status: 400 })
      }
    }

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug: productData.slug })
    if (existingProduct) {
      return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
    }

    const product = await Product.create(productData)

    return NextResponse.json(
      {
        success: true,
        message: "Tạo sản phẩm thành công",
        data: product,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
