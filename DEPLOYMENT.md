# 🚀 KQ Web Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Code formatted with Prettier
- [ ] All tests passing
- [ ] Performance optimization script run

### ✅ Environment Setup
- [ ] `.env.local` configured with production values
- [ ] MongoDB connection string updated
- [ ] JWT secret generated and secure
- [ ] Analytics IDs configured (GA, FB Pixel)
- [ ] SMTP settings for contact form

### ✅ Content & Assets
- [ ] All images optimized (< 1MB each)
- [ ] Favicon files present (ico, svg, apple-touch-icon)
- [ ] Manifest.json configured
- [ ] Vietnamese content reviewed and consistent
- [ ] Product images and descriptions ready

### ✅ SEO & Performance
- [ ] Meta tags and Open Graph configured
- [ ] Sitemap.xml generating correctly
- [ ] Robots.txt configured
- [ ] Core Web Vitals optimized
- [ ] Lazy loading implemented

### ✅ Functionality Testing
- [ ] User registration/login working
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Checkout process complete
- [ ] Contact form submission
- [ ] Admin panel accessible
- [ ] API endpoints tested

## Deployment Steps

### 1. Prepare Repository
\`\`\`bash
# Ensure all changes are committed
git add .
git commit -m "Production ready"
git push origin main
\`\`\`

### 2. Deploy to Vercel

#### Option A: Vercel CLI
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
\`\`\`

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure environment variables
4. Deploy

### 3. Configure Environment Variables on Vercel
\`\`\`
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secure-jwt-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com
\`\`\`

### 4. Custom Domain (Optional)
1. Add custom domain in Vercel dashboard
2. Configure DNS records
3. SSL certificate will be auto-generated

### 5. Post-Deployment Verification
- [
