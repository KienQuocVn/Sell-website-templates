"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      title: "E-commerce Modern",
      description: "Template bán hàng online hiện đại với đầy đủ tính năng",
      price: "299,000",
      rating: 4.9,
      downloads: 1234,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["E-commerce", "Responsive", "Modern"],
    },
    {
      id: 2,
      title: "Portfolio Creative",
      description: "Showcase tác phẩm với thiết kế sáng tạo và độc đáo",
      price: "199,000",
      rating: 4.8,
      downloads: 987,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Portfolio", "Creative", "Animation"],
    },
    {
      id: 3,
      title: "Business Corporate",
      description: "Website doanh nghiệp chuyên nghiệp và uy tín",
      price: "399,000",
      rating: 4.9,
      downloads: 756,
      image: "/placeholder.svg?height=300&width=400",
      tags: ["Business", "Corporate", "Professional"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sản phẩm nổi bật</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những template được yêu thích nhất từ cộng đồng KQ Web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden card-hover border-0 shadow-lg">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      {product.price}đ
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{product.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{product.downloads}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/products/${product.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Xem chi tiết
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
            >
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
