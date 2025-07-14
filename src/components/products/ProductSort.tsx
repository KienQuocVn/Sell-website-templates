"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

interface ProductSortProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular">Phổ biến nhất</SelectItem>
        <SelectItem value="newest">Mới nhất</SelectItem>
        <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
        <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
        <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
      </SelectContent>
    </Select>
  )
}
