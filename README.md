# Linda Schönfeldt - Portfolio Website

A modern, performance-optimized portfolio showcasing web development and UX design projects. Built with React and focused on accessibility, responsive design, and exceptional user experience.

**Live Site:** [lindaschonfeldt.com](https://lindaschonfeldt.com)

## 🎯 Project Overview

This portfolio demonstrates expertise in modern web development through:

- **Performance First**: Lighthouse score 90+ with optimized LCP, TBT, and CLS
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Accessibility**: WCAG compliant with 100/100 accessibility score
- **Modern Stack**: React 18, Vite, Styled Components
- **Animation**: Smooth Framer Motion animations with minimal performance impact

## 🏗️ Architecture

### Tech Stack

**Frontend Framework:**

- React 18 with Hooks
- React Router v6 for client-side routing
- Lazy loading with React.lazy() and Suspense

**Styling:**

- Styled Components (CSS-in-JS)
- Responsive design with custom media query breakpoints
- CSS variables for theming
- Transient props pattern to prevent DOM leakage

**Animations:**

- Framer Motion for smooth transitions
- Intersection Observer for scroll-triggered animations
- RequestIdleCallback for non-blocking operations

**State Management:**

- Zustand for lightweight global state
- React Context for specific features

**Forms & Validation:**

- React Hook Form
- EmailJS for contact form submissions
- Google reCAPTCHA v2 for spam protection
- Validator.js for email validation

**Performance:**

- Web Vitals monitoring
- Route preloading on hover/focus
- Image optimization with Sharp
- Lazy loading and code splitting
- Terser minification (3 passes)

### Project Structure

```
portfolio2.0/
├── public/                 # Static assets
│   └── vite.svg
├── scripts/               # Build scripts
│   └── optimize-images.js # Image optimization with Sharp
├── src/
│   ├── assets/           # Images and media
│   │   ├── optimized/    # Auto-generated optimized images
│   │   └── *.{jpg,png,svg}
│   ├── components/       # Reusable components
│   │   ├── Button.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── Meta.jsx
│   │   ├── Nav.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectGrid.jsx
│   │   ├── ResponsiveImage.jsx  # Lazy loading + WebP
│   │   ├── SocialLinks.jsx
│   │   └── ...
│   ├── data/             # JSON data files
│   │   └── projects.json
│   ├── pages/            # Route pages (lazy loaded)
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── sections/         # Page sections
│   │   ├── Hero.jsx
│   │   ├── Experience.jsx
│   │   ├── SkillSection.jsx
│   │   └── Footer.jsx
│   ├── stores/           # Zustand stores
│   │   └── useNavStore.js
│   ├── styles/           # Global styles and utilities
│   │   ├── GlobalStyle.js
│   │   ├── devices.js    # Breakpoints
│   │   ├── mixins.js
│   │   ├── spacing.js
│   │   └── typography.js
│   ├── utils/            # Helper functions
│   │   ├── routePreloader.js
│   │   └── webVitals.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js        # Vite configuration
└── README.md
```

### Key Features & Implementation

#### 1. Performance Optimization

**Image Optimization:**

- Automated script generates WebP and 3 sizes (400px, 800px, 1200px)
- Lazy loading with Intersection Observer
- Shimmer loading skeleton
- Proper srcset for responsive images

**Code Splitting:**

- Route-based splitting (Home, Projects, Contact)
- Component-based splitting (ContactForm, SocialLinks)
- Vendor chunking (React, Router, Styled Components, Framer Motion)
- Manual chunk strategy for optimal caching

**Bundle Optimization:**

```javascript
manualChunks(id) {
  if (id.includes('react')) return 'react-vendor'
  if (id.includes('framer-motion')) return 'motion-vendor'
  if (id.includes('styled-components')) return 'styled-vendor'
  // ... more chunks
}
```

**Terser Configuration:**

- 3 compression passes
- Console log removal in production
- Top-level mangling
- Dead code elimination

#### 2. Responsive Design

**Breakpoints:**

```javascript
mobileS: '320px'
mobileM: '375px'
mobileL: '425px'
tablet: '768px'
laptop: '1024px'
desktop: '1440px'
```

**CSS Variables:**

- Section padding: `4rem 1rem` (mobile) → `6rem 16rem` (desktop)
- Dynamic spacing system
- Responsive typography

#### 3. Component Patterns

**Button Component:**

- Polymorphic (renders as `<button>` or `<a>`)
- Variant system (primary, secondary)
- Auto-detection of link vs button based on `url` prop

**ProjectCard:**

- Responsive image handling
- Full-width images on mobile
- Lazy-loaded content
- Grid/flex layout switching

**ResponsiveImage:**

- WebP with fallback
- Lazy loading
- Shimmer loading state
- Multiple size variants

#### 4. Routing & Navigation

**Lazy Loading:**

```javascript
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))
```

**Route Preloading:**

- Preload on hover/focus
- RequestIdleCallback for non-blocking
- Cached imports for instant navigation

#### 5. Forms & Validation

**Contact Form:**

- React Hook Form for validation
- EmailJS integration
- ReCAPTCHA v2 (loaded only on Contact page)
- Email validation with Validator.js
- Success/error states

#### 6. SEO & Meta Tags

**Dynamic Meta Component:**

- Updates document title
- Sets meta description
- Open Graph tags
- Proper semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/LindaSchonfeldt/portfolio2.0.git

# Navigate to project directory
cd portfolio2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev              # Start dev server (Vite)
npm run build            # Build for production
npm run preview          # Preview production build
npm run optimize-images  # Optimize images in src/assets
npm run lint             # Run ESLint
```

## 📦 Building for Production

The build process includes:

1. Image optimization (automatic via build script)
2. Code minification with Terser
3. CSS extraction and optimization
4. Asset hashing for cache busting
5. Source map generation (disabled in production)

```bash
npm run build
```

Output directory: `dist/`

## 🖼️ Adding New Images

1. Place original image in `src/assets/`
2. Run optimization script:
   ```bash
   npm run optimize-images
   ```
3. Reference in code using just the name:
   ```json
   {
     "image": "myproject"
   }
   ```

The build process handles the rest!

## 🎨 Customization

### Theme Colors

Edit CSS variables in `src/styles/GlobalStyle.js`:

```javascript
--primary-green-dark: #2d5f4e
--primary-green: #3a7a5f
--accent-orange: #ffb347
--background-light: #f5f5f5
--text-primary: #333
```

### Breakpoints

Modify in `src/styles/devices.js`

### Section Padding

Adjust in `src/styles/spacing.js`

## 📊 Performance Metrics

**Lighthouse Scores:**

- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

**Core Web Vitals:**

- LCP: 0.8s (Excellent)
- FCP: 0.5s (Excellent)
- TBT: <300ms (Good)
- CLS: 0 (Perfect)

## 🔧 Configuration

### Vite Config Highlights

- React plugin with Fast Refresh
- Manual code splitting
- Aggressive Terser minification
- ES2020 target for modern browsers
- Optimized dependencies

### ESLint Setup

- React plugin
- Hooks rules
- Refresh rules for HMR

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

Linda Schönfeldt  
Email: linda.schonfeldt@gmail.com  
Portfolio: [lindaschonfeldt.com](https://lindaschonfeldt.com)  
GitHub: [@LindaSchonfeldt](https://github.com/LindaSchonfeldt)
