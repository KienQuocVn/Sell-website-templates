"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Slider } from "@/src/components/ui/slider"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/src/components/ui/collapsible"
import type { ProductFilters as ProductFiltersType } from "@/src/types/product"

interface ProductFiltersProps {
  filters: ProductFiltersType
  onFilterChange: (filters: Partial<ProductFiltersType>) => void
  onClearAll: () => void
  filterStats: { count: number; active: string[] }
  onApply?: () => void
}

const categories = [
  { id: "all", name: "Tất cả", count: 48 },
  { id: "ecommerce", name: "E-commerce", count: 12 },
  { id: "portfolio", name: "Portfolio", count: 8 },
  { id: "business", name: "Business", count: 15 },
  { id: "blog", name: "Blog", count: 6 },
  { id: "landing", name: "Landing Page", count: 7 },
]

const priceRanges = [
  { label: "Dưới 100k", min: 0, max: 100000 },
  { label: "100k - 300k", min: 100000, max: 300000 },
  { label: "300k - 500k", min: 300000, max: 500000 },
  { label: "Trên 500k", min: 500000, max: 1000000 },
]

export function ProductFilters({ filters, onFilterChange, onClearAll, filterStats, onApply }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    features: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceRangeSelect = (range: { min: number; max: number }) => {
    onFilterChange({ priceRange: range })
  }

  const handleCustomPriceChange = (values: number[]) => {
    onFilterChange({
      priceRange: { min: values[0], max: values[1] },
    })
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Bộ lọc</CardTitle>
          {filterStats.count > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-purple-600 hover:text-purple-700">
              <RotateCcw className="h-4 w-4 mr-1" />
              Xóa tất cả
            </Button>
          )}
        </div>
        {filterStats.count > 0 && <p className="text-sm text-gray-600">{filterStats.count} bộ lọc đang áp dụng</p>}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection("category")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium">
              Danh mục
              {openSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3 mt-3"
            >
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.category === category.id}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFilterChange({ category: category.id })
                      }
                    }}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </Label>
                </div>
              ))}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Filter */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium">
              Khoảng giá
              {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 mt-3"
            >
              {/* Quick Price Ranges */}
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <Button
                    key={index}
                    variant={
                      filters.priceRange.min === range.min && filters.priceRange.max === range.max ? "default" : "ghost"
                    }
                    size="sm"
                    className="w-full justify-start h-8"
                    onClick={() => handlePriceRangeSelect(range)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

              {/* Custom Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Tùy chỉnh khoảng giá</Label>

                <div className="px-2">
                  <Slider
                    value={[filters.priceRange.min, filters.priceRange.max]}
                    onValueChange={handleCustomPriceChange}
                    max={1000000}
                    min={0}
                    step={10000}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="min-price" className="text-xs text-gray-600">
                      Từ
                    </Label>
                    <Input
                      id="min-price"
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) =>
                        onFilterChange({
                          priceRange: {
                            ...filters.priceRange,
                            min: Number(e.target.value),
                          },
                        })
                      }
                      className="h-8 text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-price" className="text-xs text-gray-600">
                      Đến
                    </Label>
                    <Input
                      id="max-price"
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) =>
                        onFilterChange({
                          priceRange: {
                            ...filters.priceRange,
                            max: Number(e.target.value),
                          },
                        })
                      }
                      className="h-8 text-sm"
                      placeholder="1000000"
                    />
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{filters.priceRange.min.toLocaleString("vi-VN")}đ</span>
                  <span>{filters.priceRange.max.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>

        {/* Features Filter */}
        <Collapsible open={openSections.features} onOpenChange={() => toggleSection("features")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium">
              Tính năng
              {openSections.features ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3 mt-3"
            >
              {[
                "Responsive Design",
                "SEO Optimized",
                "Dark Mode",
                "Admin Panel",
                "E-commerce Ready",
                "Multi-language",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={`feature-${feature}`} />
                  <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                    {feature}
                  </Label>
                </div>
              ))}
            </motion.div>
          </CollapsibleContent>
        </Collapsible>

        {/* Apply Button for Mobile */}
        {onApply && (
          <Button
            onClick={onApply}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Áp dụng bộ lọc
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
