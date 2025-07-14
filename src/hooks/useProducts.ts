"use client"

import { useState, useEffect, useCallback } from "react"
import type { Product, ProductFilters, ProductsResponse } from "@/src/types/product"

interface UseProductsOptions extends ProductFilters {
  limit?: number
}

export function useProducts(options: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchProducts = useCallback(
    async (reset = false) => {
      try {
        setLoading(true)
        setError(null)

        const currentPage = reset ? 1 : page
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: (options.limit || 12).toString(),
          category: options.category,
          search: options.search,
          sortBy: options.sortBy,
          minPrice: options.priceRange.min.toString(),
          maxPrice: options.priceRange.max.toString(),
        })

        const response = await fetch(`/api/products?${params}`)
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: ProductsResponse = await response.json()

        if (reset) {
          setProducts(data.products)
          setPage(2)
        } else {
          setProducts((prev) => [...prev, ...data.products])
          setPage((prev) => prev + 1)
        }

        setTotal(data.total)
        setHasMore(data.hasMore)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    },
    [options, page],
  )

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(false)
    }
  }, [fetchProducts, loading, hasMore])

  const refetch = useCallback(() => {
    setPage(1)
    fetchProducts(true)
  }, [fetchProducts])

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1)
    fetchProducts(true)
  }, [options.category, options.search, options.sortBy, options.priceRange.min, options.priceRange.max])

  return {
    products,
    loading,
    error,
    hasMore,
    total,
    loadMore,
    refetch,
  }
}
