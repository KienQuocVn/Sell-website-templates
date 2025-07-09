import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Contact from "@/models/Contact"

/**
 * POST /api/contact
 * Gửi tin nhắn liên hệ
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { name, email, phone, subject, message } = await request.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin bắt buộc" }, { status: 400 })
    }

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    })

    // TODO: Send email notification to admin
    // You can integrate with nodemailer, resend, or other email services here

    return NextResponse.json(
      {
        success: true,
        message: "Gửi tin nhắn thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.",
        data: {
          id: contact._id,
          createdAt: contact.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}

/**
 * GET /api/contact
 * Lấy danh sách tin nhắn liên hệ (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const { getUserFromRequest } = await import("@/lib/auth")
    const currentUser = getUserFromRequest(request)

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Không có quyền truy cập" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")

    const query: any = {}
    if (status && ["new", "read", "replied"].includes(status)) {
      query.status = status
    }

    const skip = (page - 1) * limit
    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(query),
    ])

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error: any) {
    console.error("Get contacts error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
