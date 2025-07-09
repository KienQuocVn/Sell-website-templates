"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface CartProviderProps {
  children: React.ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Ensure the store is hydrated before rendering
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <div>{children}</div>
  }

  return <>{children}</>
}
