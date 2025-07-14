const fs = require("fs")
const path = require("path")

console.log("🚀 Optimizing KQ Web for production...")

// Check for common performance issues
const checkPerformance = () => {
  console.log("📊 Checking performance optimizations...")

  // Check if images are optimized
  const publicDir = path.join(process.cwd(), "public")
  if (fs.existsSync(publicDir)) {
    const images = fs.readdirSync(publicDir).filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))

    console.log(`📸 Found ${images.length} images in public directory`)

    // Check for large images
    images.forEach((image) => {
      const imagePath = path.join(publicDir, image)
      const stats = fs.statSync(imagePath)
      const sizeInMB = stats.size / (1024 * 1024)

      if (sizeInMB > 1) {
        console.warn(`⚠️  Large image detected: ${image} (${sizeInMB.toFixed(2)}MB)`)
        console.log("   Consider optimizing with tools like tinypng.com or imagemin")
      }
    })
  }

  // Check for favicon files
  const faviconFiles = ["favicon.ico", "favicon.svg", "apple-touch-icon.png", "manifest.json"]
  faviconFiles.forEach((file) => {
    const filePath = path.join(publicDir, file)
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file} found`)
    } else {
      console.warn(`⚠️  Missing ${file}`)
    }
  })

  // Check environment variables
  const envExample = path.join(process.cwd(), ".env.example")
  const envLocal = path.join(process.cwd(), ".env.local")

  if (fs.existsSync(envExample)) {
    console.log("✅ .env.example found")
  } else {
    console.warn("⚠️  Missing .env.example")
  }

  if (fs.existsSync(envLocal)) {
    console.log("✅ .env.local configured")
  } else {
    console.warn("⚠️  Missing .env.local - copy from .env.example")
  }
}

// Generate sitemap
const generateSitemap = () => {
  console.log("🗺️  Sitemap will be generated automatically by Next.js")
}

// Check bundle size
const checkBundleSize = () => {
  console.log("📦 Bundle size will be analyzed during build")
  console.log('   Run "npm run build" to see bundle analysis')
}

// Main optimization check
const main = () => {
  console.log("🔍 Running optimization checks...\n")

  checkPerformance()
  generateSitemap()
  checkBundleSize()

  console.log("\n✨ Optimization check complete!")
  console.log("\n📋 Next steps:")
  console.log('1. Run "npm run build" to build for production')
  console.log('2. Run "npm run start" to test production build')
  console.log('3. Deploy to Vercel with "vercel --prod"')
  console.log("\n🚀 Ready for deployment!")
}

main()
