"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12">
              {/* Empty Cart Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-purple-600" />
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 3,
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Empty State Content */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn đang trống</h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Hãy khám phá bộ sưu tập template tuyệt vời của chúng tôi và tìm những thiết kế phù hợp với dự án của
                  bạn.
                </p>

                <div className="pt-6">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Link href="/products" className="flex items-center gap-2">
                      Khám phá sản phẩm
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t"
              >
                <p className="text-sm text-gray-600 mb-4">Hoặc xem các danh mục phổ biến:</p>

                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { name: "E-commerce", href: "/products?category=ecommerce" },
                    { name: "Portfolio", href: "/products?category=portfolio" },
                    { name: "Business", href: "/products?category=business" },
                    { name: "Landing Page", href: "/products?category=landing" },
                  ].map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:bg-purple-50 hover:border-purple-300 bg-transparent"
                      >
                        <Link href={category.href}>{category.name}</Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 pt-8 border-t"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <p className="font-medium text-gray-900">Chất lượng cao</p>
                    <p className="text-gray-600">Template được thiết kế chuyên nghiệp</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">⚡</span>
                    </div>
                    <p className="font-medium text-gray-900">Giao hàng ngay</p>
                    <p className="text-gray-600">Tải xuống ngay sau thanh toán</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">♥</span>
                    </div>
                    <p className="font-medium text-gray-900">Hỗ trợ 24/7</p>
                    <p className="text-gray-600">Luôn sẵn sàng hỗ trợ bạn</p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
