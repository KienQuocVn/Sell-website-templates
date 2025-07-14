"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Shield, Truck, Gift, ChevronRight } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Separator } from "@/src/components/ui/separator"
import { Badge } from "@/src/components/ui/badge"
import { useCartStore } from "@/src/store/useCartStore"
import { formatPrice } from "@/src/lib/utils"

export function CartSummary() {
  const { items, getTotalItems, getTotalPrice } = useCartStore()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = 0 // Free shipping for digital products
  const tax = Math.round(subtotal * 0.1) // 10% VAT
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round(subtotal * (appliedCoupon.discount / 100))
      : appliedCoupon.discount
    : 0
  const total = subtotal + shipping + tax - couponDiscount

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      // Mock coupon validation
      const mockCoupons = {
        WELCOME10: { discount: 10, type: "percentage" as const },
        SAVE50K: { discount: 50000, type: "fixed" as const },
        NEWUSER: { discount: 15, type: "percentage" as const },
      }

      const coupon = mockCoupons[couponCode.toUpperCase() as keyof typeof mockCoupons]

      if (coupon) {
        setAppliedCoupon({
          code: couponCode.toUpperCase(),
          ...coupon,
        })
        setCouponCode("")
      } else {
        // Handle invalid coupon
        alert("Mã giảm giá không hợp lệ")
      }

      setIsApplyingCoupon(false)
    }, 1000)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Tóm tắt đơn hàng
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tạm tính ({totalItems} sản phẩm)</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-medium text-green-600">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">VAT (10%)</span>
              <span className="font-medium">{formatPrice(tax)}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Giảm giá ({appliedCoupon.code})</span>
                <span className="font-medium text-green-600">-{formatPrice(couponDiscount)}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>
              <span className="text-purple-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="space-y-3">
            <Label htmlFor="coupon">Mã giảm giá</Label>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{appliedCoupon.code}</span>
                  <Badge variant="secondary" className="text-xs">
                    {appliedCoupon.type === "percentage"
                      ? `-${appliedCoupon.discount}%`
                      : `-${formatPrice(appliedCoupon.discount)}`}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCoupon}
                  className="text-green-600 hover:text-green-700 h-auto p-1"
                >
                  ✕
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  placeholder="Nhập mã giảm giá"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
                />
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || isApplyingCoupon}
                  className="flex-shrink-0 bg-transparent"
                >
                  {isApplyingCoupon ? "Đang áp dụng..." : "Áp dụng"}
                </Button>
              </div>
            )}
          </div>

          {/* Checkout Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            asChild
          >
            <motion.a
              href="/checkout"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán
              <ChevronRight className="h-4 w-4" />
            </motion.a>
          </Button>

          {/* Security Features */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Thanh toán an toàn & bảo mật</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Giao hàng ngay sau khi thanh toán</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Gift className="h-4 w-4 text-purple-600" />
              <span>Hỗ trợ 24/7 sau mua hàng</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3">Phương thức thanh toán</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 border rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium">VISA</span>
              </div>
              <div className="p-2 border rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium">MoMo</span>
              </div>
              <div className="p-2 border rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium">ZaloPay</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
