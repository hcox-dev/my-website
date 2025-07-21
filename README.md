# Hayden Cox - Software Developer Portfolio

A modern, SEO-optimized portfolio website built with Next.js 15, featuring comprehensive search engine optimization, performance enhancements, and accessibility features.

## 🚀 Features

### SEO Optimizations
- **Comprehensive Meta Tags**: Open Graph, Twitter Cards, and structured metadata
- **Structured Data**: JSON-LD schema markup for Person and Website
- **Sitemap & Robots.txt**: Automatically generated for search engines
- **Performance**: Optimized fonts, images, and loading strategies
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **PWA Ready**: Web app manifest for mobile installation

### Technical Features
- **Next.js 15**: Latest version with App Router
- **TypeScript**: Full type safety
- **Responsive Design**: Mobile-first approach
- **Contact Form**: Functional contact form with validation
- **Vim Keybindings**: Custom keyboard navigation
- **Security Headers**: XSS protection and content security policies

## 🛠 Setup Instructions

### 1. Clone and Install
```bash
git clone https://github.com/hcox-dev/my-website
cd my-website
pnpm install
```

### 2. Environment Configuration
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
DISCORD_WEBHOOK=YOUR_DISCORD_WEBHOOK
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Update Personal Information
Replace placeholder information in the following files:
- `app/layout.tsx`: Update domain URLs, social links, and verification codes
- `app/sitemap.ts`: Update base URL
- `app/robots.ts`: Update base URL
- `app/page.tsx`: Update personal information and project details

## 🔧 Development

### Running the Development Server
```bash
pnpm dev
```

### Building for Production
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## 📊 SEO Tools & Testing

### Recommended Tools:
1. **Google Search Console**: Monitor search performance
2. **Google PageSpeed Insights**: Test performance
3. **Lighthouse**: Comprehensive auditing
4. **Schema Markup Validator**: Test structured data
5. **Open Graph Debugger**: Test social media previews

### Testing URLs:
- Lighthouse: `chrome://lighthouse/`
- PageSpeed: `https://pagespeed.web.dev/`
- Schema Validator: `https://validator.schema.org/`
- OG Debugger: `https://developers.facebook.com/tools/debug/`

## 📈 Performance Features

- **Image Optimization**: WebP/AVIF formats with Next.js Image
- **Font Optimization**: Preloaded Google Fonts with display=swap
- **Resource Hints**: Preconnect and DNS prefetch for external resources
- **Code Splitting**: Automatic with Next.js App Router
- **Compression**: Gzip/Brotli compression enabled
- **Caching**: ETags and proper cache headers

## 🔒 Security Features

- **XSS Protection**: Content Security Policy headers
- **HTTPS Enforcement**: Security headers configuration
- **Input Validation**: Form validation and sanitization
- **Safe External Links**: noopener noreferrer attributes

## 📱 PWA Features

- **Web App Manifest**: Installable on mobile devices
- **Theme Colors**: Consistent branding across platforms
- **Responsive Design**: Works on all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
Works with any static hosting provider:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- DigitalOcean App Platform

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
