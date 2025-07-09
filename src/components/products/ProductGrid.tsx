"use client"

import { motion } from "framer-motion"
import { ProductCard } from "./ProductCard"
import { ProductCardSkeleton } from "./ProductCardSkeleton"
import type { Product } from "@/types/product"

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
  loading?: boolean
}

export function ProductGrid({ products, viewMode, loading }: ProductGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading && products.length === 0) {
    return (
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} viewMode={viewMode} />
        </motion.div>
      ))}

      {/* Loading more items */}
      {loading && products.length > 0 && (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div key={`loading-${index}`} variants={itemVariants}>
              <ProductCardSkeleton viewMode={viewMode} />
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  )
}
