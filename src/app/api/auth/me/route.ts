import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/src/lib/mongodb"
import User from "@/src/models/User"
import { getUserFromRequest } from "@/src/lib/auth"

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại
 */
export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const currentUser = getUserFromRequest(request)
    if (!currentUser) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 })
    }

    const user = await User.findById(currentUser.userId).select("-password")
    if (!user) {
      return NextResponse.json({ error: "Không tìm thấy user" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    })
  } catch (error: any) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
