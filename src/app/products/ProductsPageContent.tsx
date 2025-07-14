"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { ProductGrid } from "@/src/components/products/ProductGrid"
import { ProductFilters } from "@/src/components/products/ProductFilters"
import { ProductSort } from "@/src/components/products/ProductSort"
import { ProductViewToggle } from "@/src/components/products/ProductViewToggle"
import { LoadingSpinner } from "@/src/components/ui/LoadingSpinner"
import { useProducts } from "@/src/hooks/useProducts"
import { useDebounce } from "@/src/hooks/useDebounce"
import type { ProductFilters as ProductFiltersType } from "@/src/types/product"

export default function ProductsPageContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFiltersType>({
    category: "all",
    priceRange: { min: 0, max: 1000000 },
    search: "",
    sortBy: "popular",
  })

  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search, 300)

  // Custom hook for fetching products
  const { products, loading, error, hasMore, loadMore, refetch } = useProducts({
    ...filters,
    search: debouncedSearch,
  })

  // Filter statistics
  const filterStats = useMemo(() => {
    const activeFilters = []
    if (filters.category !== "all") activeFilters.push("category")
    if (filters.search) activeFilters.push("search")
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000000) {
      activeFilters.push("price")
    }
    return {
      count: activeFilters.length,
      active: activeFilters,
    }
  }, [filters])

  const handleFilterChange = (newFilters: Partial<ProductFiltersType>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      priceRange: { min: 0, max: 1000000 },
      search: "",
      sortBy: "popular",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Khám phá
              </span>
              <br />
              <span className="text-gray-800">Template chất lượng cao</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Hơn 50+ template website được thiết kế chuyên nghiệp, tối ưu cho mọi ngành nghề và mục đích sử dụng.
            </p>

            {/* Quick Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Tìm kiếm template..."
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
                className="pl-10 h-12 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                  filterStats={filterStats}
                />
              </div>
            </aside>

            {/* Main Products Area */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Results Info & Mobile Filter Button */}
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setShowMobileFilters(true)} className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Bộ lọc
                      {filterStats.count > 0 && (
                        <span className="ml-2 bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                          {filterStats.count}
                        </span>
                      )}
                    </Button>

                    <div className="text-sm text-gray-600">
                      {loading ? (
                        <span>Đang tải...</span>
                      ) : (
                        <span>
                          Hiển thị {products.length} sản phẩm
                          {filters.search && ` cho "${filters.search}"`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sort & View Controls */}
                  {/* <div className="flex items-center gap-3">
                    <ProductSort value={filters.sortBy} onChange={(sortBy) => handleFilterChange({ sortBy })} />
                    <ProductViewToggle viewMode={viewMode} onChange={setViewMode} />
                  </div> */}
                </div>

                {/* Active Filters */}
                {filterStats.count > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-gray-600">Bộ lọc đang áp dụng:</span>

                      {filters.category !== "all" && (
                        <FilterTag
                          label={`Danh mục: ${filters.category}`}
                          onRemove={() => handleFilterChange({ category: "all" })}
                        />
                      )}

                      {filters.search && (
                        <FilterTag
                          label={`Tìm kiếm: ${filters.search}`}
                          onRemove={() => handleFilterChange({ search: "" })}
                        />
                      )}

                      {(filters.priceRange.min > 0 || filters.priceRange.max < 1000000) && (
                        <FilterTag
                          label={`Giá: ${filters.priceRange.min.toLocaleString()}đ - ${filters.priceRange.max.toLocaleString()}đ`}
                          onRemove={() =>
                            handleFilterChange({
                              priceRange: { min: 0, max: 1000000 },
                            })
                          }
                        />
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        Xóa tất cả
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Products Grid */}
              <AnimatePresence mode="wait">
                {loading && products.length === 0 ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-12"
                  >
                    <LoadingSpinner size="lg" />
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải sản phẩm</p>
                    <Button onClick={refetch}>Thử lại</Button>
                  </motion.div>
                ) : products.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm nào</p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Xóa bộ lọc
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ProductGrid products={products} viewMode={viewMode} loading={loading} />

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center mt-8">
                        <Button
                          onClick={loadMore}
                          disabled={loading}
                          size="lg"
                          variant="outline"
                          className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                        >
                          {loading ? "Đang tải..." : "Tải thêm sản phẩm"}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white h-full w-80 max-w-[90vw] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold">Bộ lọc</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4">
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                  filterStats={filterStats}
                  onApply={() => setShowMobileFilters(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Filter Tag Component
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
    >
      <span>{label}</span>
      <button onClick={onRemove} className="hover:bg-purple-200 rounded-full p-0.5">
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  )
}
