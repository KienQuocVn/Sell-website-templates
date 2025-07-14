"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ExternalLink, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/ui/OptimizedImage"
import { useCartStore, type CartItem as CartItemType } from "@/store/useCartStore"
import { useWishlist } from "@/hooks/useWishlist"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [isRemoving, setIsRemoving] = useState(false)
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    updateQuantity(item.product.id, newQuantity)
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    // Add a small delay for animation
    setTimeout(() => {
      removeItem(item.product.id)
    }, 200)
  }

  const handleMoveToWishlist = () => {
    addToWishlist(item.product)
    removeItem(item.product.id)
  }

  const discountPercentage = item.product.originalPrice
    ? Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)
    : 0

  return (
    <motion.div animate={{ opacity: isRemoving ? 0.5 : 1 }} className="p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <Link href={`/products/${item.product.slug}`}>
            <OptimizedImage
              src={item.product.thumbnail}
              alt={item.product.title}
              width={120}
              height={90}
              className="w-30 h-24 sm:w-32 sm:h-24 object-cover rounded-lg border hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div className="flex-1">
              {/* Product Title */}
              <Link href={`/products/${item.product.slug}`} className="block group">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {item.product.title}
                </h3>
              </Link>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {item.product.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Product Category */}
              <p className="text-sm text-gray-600 mt-1 capitalize">Danh mục: {item.product.category}</p>

              {/* Added Date */}
              <p className="text-xs text-gray-500 mt-1">
                Thêm vào: {new Date(item.addedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>

            {/* Price & Quantity */}
            <div className="flex flex-col items-end gap-3">
              {/* Price */}
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{formatPrice(item.product.price)}</div>
                {item.product.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">{formatPrice(item.product.originalPrice)}</div>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const newQuantity = Number.parseInt(e.target.value) || 1
                    handleQuantityChange(newQuantity)
                  }}
                  className="w-16 h-8 text-center"
                  min="1"
                  max="99"
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Subtotal */}
              <div className="text-lg font-semibold text-purple-600">{formatPrice(item.product.price * quantity)}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isRemoving}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Xóa
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoveToWishlist}
              disabled={isInWishlist(item.product.id)}
              className="text-gray-600 hover:text-gray-700"
            >
              <Heart className="h-4 w-4 mr-1" />
              {isInWishlist(item.product.id) ? "Đã yêu thích" : "Yêu thích"}
            </Button>

            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-700">
              <Link href={`/products/${item.product.slug}`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Xem chi tiết
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
