# 🚀 KQ Web - Nền tảng Template Website Chuyên nghiệp

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kqweb/kq-web)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://kqweb.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **🌟 Live Demo**: [https://kqweb.vercel.app](https://kqweb.vercel.app)

**KQ Web** là một nền tảng marketplace chuyên nghiệp dành cho việc trưng bày và bán các template website chất lượng cao. Dự án được xây dựng bằng công nghệ hiện đại, tối ưu cho hiệu suất và trải nghiệm người dùng.

## ✨ Tính năng chính

- 🎨 **Giao diện hiện đại** với hiệu ứng 3D và animation mượt mà
- 🛒 **Hệ thống mua bán** template hoàn chỉnh với giỏ hàng và thanh toán
- 👤 **Quản lý tài khoản** và xác thực người dùng an toàn
- 📱 **Responsive design** tối ưu cho mọi thiết bị
- 🚀 **Tối ưu SEO** và hiệu suất cao
- 🌐 **Hỗ trợ tiếng Việt** đầy đủ
- 🔍 **Tìm kiếm và lọc** sản phẩm thông minh
- 📊 **Admin panel** quản lý sản phẩm và đơn hàng
- 💳 **Tích hợp thanh toán** đa dạng
- 📧 **Hệ thống liên hệ** với email notification

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 14** (App Router) - React framework
- **React 18** - UI library với Server Components
- **TypeScript** - Type safety và developer experience
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library mượt mà
- **shadcn/ui** - Component library hiện đại
- **Lucide React** - Icon library đẹp và nhẹ

### Backend & Database
- **Next.js API Routes** - Serverless API
- **MongoDB** với **Mongoose** - NoSQL database
- **JWT** - Authentication và authorization
- **bcryptjs** - Password hashing an toàn

### DevOps & Deployment
- **Vercel** - Deployment platform tối ưu
- **ESLint & Prettier** - Code quality
- **TypeScript** - Type checking

### SEO & Analytics
- **Next.js Metadata API** - SEO optimization
- **Google Analytics** - Web analytics
- **Open Graph** - Social media sharing
- **Sitemap & Robots.txt** - Search engine optimization

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn
- MongoDB database
- Git

### Bước 1: Clone repository
\`\`\`bash
git clone https://github.com/kqweb/kq-web.git
cd kq-web
\`\`\`

### Bước 2: Cài đặt dependencies
\`\`\`bash
npm install
# hoặc
yarn install
\`\`\`

### Bước 3: Cấu hình environment variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Chỉnh sửa file `.env.local` với thông tin của bạn:
\`\`\`env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_FB_PIXEL_ID=your_facebook_pixel_id

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
\`\`\`

### Bước 4: Seed database với dữ liệu mẫu
\`\`\`bash
npm run seed
\`\`\`

### Bước 5: Chạy development server
\`\`\`bash
npm run dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 📁 Cấu trúc thư mục

\`\`\`
kq-web/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
├── lib/                  # Utility functions
│   ├── mongodb.ts        # Database connection
│   ├── auth.ts           # Authentication utilities
│   └── utils.ts          # Helper functions
├── models/               # Mongoose models
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   └── Order.ts          # Order model
├── public/               # Static assets
├── scripts/              # Utility scripts
│   └── seed.js           # Database seeding
└── types/                # TypeScript types
\`\`\`

## 🔐 Tài khoản mặc định

Sau khi chạy seed script, bạn có thể đăng nhập với:

**Admin:**
- Email: `admin@kqweb.dev`
- Password: `admin123`

**User:**
- Email: `user@example.com`
- Password: `user123`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Thông tin user hiện tại

### Products
- `GET /api/products` - Danh sách sản phẩm (có filter, search, pagination)
- `GET /api/products/[slug]` - Chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (Admin only)
- `PUT /api/products/[slug]` - Cập nhật sản phẩm (Admin only)
- `DELETE /api/products/[slug]` - Xóa sản phẩm (Admin only)

### Orders
- `GET /api/orders` - Danh sách đơn hàng của user
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/[id]` - Chi tiết đơn hàng

### Contact
- `POST /api/contact` - Gửi tin nhắn liên hệ
- `GET /api/contact` - Danh sách tin nhắn (Admin only)

### Admin
- `GET /api/admin/products` - Quản lý sản phẩm
- `PUT /api/admin/products/featured` - Cập nhật sản phẩm nổi bật
- `GET /api/admin/orders` - Quản lý đơn hàng

## 🚀 Deployment

### Deploy lên Vercel (Recommended)

1. **Push code lên GitHub**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Deploy với Vercel**
- Truy cập [vercel.com](https://vercel.com)
- Import repository từ GitHub
- Cấu hình environment variables
- Deploy!

3. **Cấu hình Environment Variables trên Vercel**
\`\`\`
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=your_ga_id (optional)
\`\`\`

### Deploy với Docker (Alternative)

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
\`\`\`

## 🧪 Testing

### Chạy tests
\`\`\`bash
npm run test
npm run test:watch
npm run e2e
\`\`\`

### Test API với Postman
Import collection từ `postman/KQ-Web-API.json`

## 📈 Performance & SEO

### Core Web Vitals
- ✅ **LCP** < 2.5s - Largest Contentful Paint
- ✅ **FID** < 100ms - First Input Delay  
- ✅ **CLS** < 0.1 - Cumulative Layout Shift

### SEO Features
- ✅ Metadata động cho mỗi trang
- ✅ Open Graph images
- ✅ Sitemap.xml tự động
- ✅ Robots.txt
- ✅ Structured data
- ✅ Vietnamese language support

### Performance Optimizations
- ✅ Image optimization với Next.js Image
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Gzip compression
- ✅ CDN caching

## 🔧 Scripts

\`\`\`json
{
  "dev": "next dev",
  "build": "next build", 
  "start": "next start",
  "lint": "next lint",
  "type-check": "tsc --noEmit",
  "format": "prettier --write .",
  "test": "jest",
  "test:watch": "jest --watch",
  "e2e": "playwright test",
  "seed": "node scripts/seed.js"
}
\`\`\`

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 Changelog

### v1.0.0 (2024-01-15)
- 🎉 Initial release
- ✨ Complete marketplace functionality
- 🔐 Authentication system
- 📱 Responsive design
- 🚀 SEO optimization
- 📊 Analytics integration

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- **Website**: [https://kqweb.vercel.app](https://kqweb.vercel.app)
- **Email**: kieukienquocvn@gmail.com
- **GitHub**: [https://github.com/kqweb/kq-web](https://github.com/kqweb/kq-web)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Nếu project này hữu ích, hãy cho một star nhé!** ⭐

**🌟 Live Demo**: [https://kqweb.vercel.app](https://kqweb.vercel.app)
\`\`\`

Let's create a final performance optimization script:
