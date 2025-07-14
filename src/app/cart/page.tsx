import type { Metadata } from "next"
import CartPageContent from "./CartPageContent"

export const metadata: Metadata = {
  title: "Giỏ hàng - KQ Web",
  description: "Xem lại các template đã chọn và tiến hành thanh toán tại KQ Web",
  robots: "noindex, nofollow", // Cart pages shouldn't be indexed
}

export default function CartPage() {
  return <CartPageContent />
}
