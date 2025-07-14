"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Eye, Download, Heart, ShoppingCart, ExternalLink } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
// import { OptimizedImage } from "@/src/components/ui/OptimizedImage"
import { useCart } from "@/src/hooks/useCart"
import { useWishlist } from "@/src/hooks/useWishlist"
import type { Product } from "@/src/types/product"

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
}

export function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <motion.div whileHover={{ y: -2 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="relative sm:w-80 sm:flex-shrink-0">
              {/* <OptimizedImage
                src={product.thumbnail}
                alt={product.title}
                width={320}
                height={240}
                className="w-full h-48 sm:h-full object-cover"
              /> */}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.featured && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Nổi bật</Badge>
                )}
                {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute top-3 right-3 flex flex-col gap-2"
              >
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleToggleWishlist}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="sm" variant="secondary" asChild className="bg-white/90 backdrop-blur-sm hover:bg-white">
                  <Link href={`/products/${product.slug}`}>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Content */}
            <CardContent className="flex-1 p-6">
              <div className="flex flex-col h-full">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{product.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}đ</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToCart}
                      disabled={isInCart(product.id)}
                      className="flex-shrink-0 bg-transparent"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {isInCart(product.id) ? "Đã thêm" : "Thêm vào giỏ"}
                    </Button>
                    <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Link href={`/products/${product.slug}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div whileHover={{ y: -8 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        {/* Image */}
        <div className="relative">
          {/* <OptimizedImage
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          /> */}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Nổi bật</Badge>
            )}
            {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
          </div>

          {/* Price */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="text-lg font-bold text-gray-900">{product.price.toLocaleString("vi-VN")}đ</div>
              {product.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute bottom-3 right-3 flex gap-2"
          >
            <Button
              size="sm"
              variant="secondary"
              onClick={handleToggleWishlist}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button size="sm" variant="secondary" asChild className="bg-white/90 backdrop-blur-sm hover:bg-white">
              <Link href={`/products/${product.slug}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-6 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title & Description */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span>({product.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>{product.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={isInCart(product.id)}
              className="flex-1 bg-transparent"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isInCart(product.id) ? "Đã thêm" : "Thêm vào giỏ"}
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href={`/products/${product.slug}`}>Xem chi tiết</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
