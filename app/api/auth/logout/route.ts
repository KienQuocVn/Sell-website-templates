import { type NextRequest, NextResponse } from "next/server"

/**
 * POST /api/auth/logout
 * Đăng xuất tài khoản
 */
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Đăng xuất thành công",
    })

    // Clear auth cookie
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    })

    return response
  } catch (error: any) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Lỗi server, vui lòng thử lại sau" }, { status: 500 })
  }
}
