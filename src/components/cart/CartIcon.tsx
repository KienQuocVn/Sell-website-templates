"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { useCartStore } from "@/src/store/useCartStore"

export function CartIcon() {
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  )
}
