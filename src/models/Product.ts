import mongoose, { type Document, Schema } from "mongoose"

export interface IProduct extends Document {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  thumbnail: string
  images: string[]
  tags: string[]
  category: string
  previewUrl: string
  downloadUrl?: string
  featured: boolean
  status: "active" | "inactive" | "draft"
  downloads: number
  rating: number
  reviews: number
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề sản phẩm là bắt buộc"],
      trim: true,
      maxlength: [100, "Tiêu đề không được vượt quá 100 ký tự"],
    },
    slug: {
      type: String,
      required: [true, "Slug là bắt buộc"],
      unique: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, "Slug chỉ được chứa chữ thường, số và dấu gạch ngang"],
    },
    description: {
      type: String,
      required: [true, "Mô tả sản phẩm là bắt buộc"],
      maxlength: [1000, "Mô tả không được vượt quá 1000 ký tự"],
    },
    price: {
      type: Number,
      required: [true, "Giá sản phẩm là bắt buộc"],
      min: [0, "Giá không được âm"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Giá gốc không được âm"],
    },
    thumbnail: {
      type: String,
      required: [true, "Ảnh thumbnail là bắt buộc"],
    },
    images: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      required: [true, "Danh mục là bắt buộc"],
      enum: ["ecommerce", "portfolio", "business", "blog", "landing", "other"],
    },
    previewUrl: {
      type: String,
      required: [true, "URL preview là bắt buộc"],
    },
    downloadUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    downloads: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for better performance
ProductSchema.index({ slug: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ featured: 1 })
ProductSchema.index({ status: 1 })
ProductSchema.index({ createdAt: -1 })

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
