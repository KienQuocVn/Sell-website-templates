const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kqweb"

// Models (simplified for seeding)
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
)

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    price: Number,
    originalPrice: Number,
    thumbnail: String,
    images: [String],
    tags: [String],
    category: String,
    previewUrl: String,
    downloadUrl: String,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "inactive", "draft"], default: "active" },
    downloads: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)

// Sample data
const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@kqweb.dev",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Nguyễn Văn A",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
]

const sampleProducts = [
  {
    title: "E-commerce Modern Pro",
    slug: "ecommerce-modern-pro",
    description:
      "Template bán hàng online hiện đại với đầy đủ tính năng quản lý sản phẩm, giỏ hàng và thanh toán. Thiết kế responsive, tối ưu SEO và có admin panel đầy đủ.",
    price: 299000,
    originalPrice: 399000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    tags: ["E-commerce", "Responsive", "Modern", "React", "Next.js"],
    category: "ecommerce",
    previewUrl: "https://demo.kqweb.dev/ecommerce-modern",
    downloadUrl: "https://files.kqweb.dev/ecommerce-modern.zip",
    featured: true,
    status: "active",
    downloads: 1234,
    rating: 4.9,
    reviews: 127,
  },
  {
    title: "Portfolio Creative Studio",
    slug: "portfolio-creative-studio",
    description:
      "Showcase tác phẩm với thiết kế sáng tạo, animation mượt mà và tối ưu cho nghệ sĩ, designer. Bao gồm gallery, blog và form liên hệ.",
    price: 199000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    tags: ["Portfolio", "Creative", "Animation", "Vue", "GSAP"],
    category: "portfolio",
    previewUrl: "https://demo.kqweb.dev/portfolio-creative",
    downloadUrl: "https://files.kqweb.dev/portfolio-creative.zip",
    featured: false,
    status: "active",
    downloads: 987,
    rating: 4.8,
    reviews: 89,
  },
  {
    title: "Business Corporate Elite",
    slug: "business-corporate-elite",
    description:
      "Website doanh nghiệp chuyên nghiệp với các trang giới thiệu, dịch vụ và liên hệ đầy đủ. Thiết kế sang trọng, uy tín và tối ưu chuyển đổi.",
    price: 399000,
    originalPrice: 499000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
    tags: ["Business", "Corporate", "Professional", "Next.js", "TypeScript"],
    category: "business",
    previewUrl: "https://demo.kqweb.dev/business-corporate",
    downloadUrl: "https://files.kqweb.dev/business-corporate.zip",
    featured: true,
    status: "active",
    downloads: 756,
    rating: 4.9,
    reviews: 156,
  },
  {
    title: "Blog Magazine Style",
    slug: "blog-magazine-style",
    description:
      "Template blog hiện đại với layout magazine, hỗ trợ đa danh mục và tối ưu SEO. Bao gồm hệ thống comment và newsletter.",
    price: 149000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["Blog", "Magazine", "SEO", "WordPress", "PHP"],
    category: "blog",
    previewUrl: "https://demo.kqweb.dev/blog-magazine",
    downloadUrl: "https://files.kqweb.dev/blog-magazine.zip",
    featured: false,
    status: "active",
    downloads: 543,
    rating: 4.7,
    reviews: 67,
  },
  {
    title: "Landing Page Conversion",
    slug: "landing-page-conversion",
    description:
      "Landing page tối ưu chuyển đổi với các section CTA mạnh mẽ và form lead generation. Tích hợp analytics và A/B testing.",
    price: 179000,
    originalPrice: 229000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["Landing", "Conversion", "Marketing", "HTML", "CSS"],
    category: "landing",
    previewUrl: "https://demo.kqweb.dev/landing-conversion",
    downloadUrl: "https://files.kqweb.dev/landing-conversion.zip",
    featured: false,
    status: "active",
    downloads: 432,
    rating: 4.8,
    reviews: 94,
  },
  {
    title: "Restaurant Food Delivery",
    slug: "restaurant-food-delivery",
    description:
      "Template nhà hàng với menu online, đặt bàn và tích hợp hệ thống giao hàng. Bao gồm admin panel quản lý đơn hàng.",
    price: 249000,
    thumbnail: "/placeholder.svg?height=300&width=400",
    images: ["/placeholder.svg?height=600&width=800"],
    tags: ["Restaurant", "Food", "Delivery", "React", "Node.js"],
    category: "ecommerce",
    previewUrl: "https://demo.kqweb.dev/restaurant-delivery",
    downloadUrl: "https://files.kqweb.dev/restaurant-delivery.zip",
    featured: false,
    status: "active",
    downloads: 321,
    rating: 4.6,
    reviews: 78,
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    console.log("Cleared existing data")

    // Create users with hashed passwords
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
      })),
    )

    await User.insertMany(hashedUsers)
    console.log(`Created ${hashedUsers.length} users`)

    // Create products
    await Product.insertMany(sampleProducts)
    console.log(`Created ${sampleProducts.length} products`)

    console.log("Database seeded successfully!")
    console.log("\nLogin credentials:")
    console.log("Admin: admin@kqweb.dev / admin123")
    console.log("User: user@example.com / user123")
  } catch (error) {
    console.error("Seeding error:", error)
  } finally {
    await mongoose.connection.close()
    console.log("Database connection closed")
  }
}

// Run the seed function
seedDatabase()
