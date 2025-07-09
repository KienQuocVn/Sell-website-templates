export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  thumbnail: string
  images: string[]
  tags: string[]
  category: "portfolio" | "ecommerce" | "blog" | "business" | "landing"
  featured: boolean
  rating: number
  reviews: number
  downloads: number
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  category: string
  priceRange: {
    min: number
    max: number
  }
  search: string
  sortBy: "popular" | "newest" | "price-low" | "price-high" | "rating"
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}
