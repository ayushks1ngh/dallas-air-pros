# Engineering Audit — Dallas Air Experts

**Date:** 2026-06-19  
**Auditor:** Staff Engineer Review  
**Repository:** dallas-air-pros  

---

## 1. Product Analysis

### What Is It
A marketing/lead-generation website for "Dallas Air Experts," an HVAC company serving the Dallas-Fort Worth metroplex. It's a static brochure-style site with service pages, contact forms, and service area listings.

### Target Users
- Homeowners and businesses in DFW needing HVAC services
- People searching for emergency AC/heating repair

### Core Features (Implemented)
- Homepage with hero, services grid, testimonials, service areas
- 4 service detail pages (AC Repair, AC Installation, Heating Repair, HVAC Maintenance)
- Contact page with info and form
- About page with company values and stats
- Service Areas listing (30 cities)
- Quote request form (appears on multiple pages)
- Emergency call-to-action banner
- Responsive design with mobile navigation
- Dark mode CSS variables (defined but no toggle exposed)

### Missing Features (Critical for a Real Business)
- **No form backend** — form submission does nothing (no email, no API, no CRM)
- **No SEO metadata per page** — only generic title/description in index.html
- **No Google Maps integration** — service areas page has no map
- **No online scheduling/booking system**
- **No reviews integration** (Google Business, Yelp)
- **No blog/content marketing** for SEO
- **No live chat widget**
- **No analytics** (GA4, GTM, Meta Pixel)
- **No structured data** (JSON-LD for LocalBusiness, Service schema)
- **No sitemap.xml**
- **No privacy policy / terms of service pages**
- **No call tracking** (phone numbers are hardcoded placeholders)

---

## 2. Architecture

### Frontend
- Single-page application (React + React Router)
- Client-side routing with BrowserRouter
- No SSR/SSG — poor for SEO (critical for a local business site)

### Backend
- **None.** Purely static frontend. Form submits to nowhere.

### Data Flow
- All content is hardcoded in component files
- No CMS, no API calls, no database
- `@tanstack/react-query` is installed but completely unused

### State Management
- Minimal local state (form submission boolean, mobile menu toggle)
- No global state management needed (appropriate for current scope)

### Auth
- None (not needed for this type of site)

---

## 3. Tech Stack

### Frameworks & Libraries
| Category | Choice | Status |
|----------|--------|--------|
| Framework | React 18 + Vite 5 | ✅ Current |
| Routing | react-router-dom 6 | ✅ Current |
| Styling | Tailwind CSS 3 | ✅ Current |
| UI Components | shadcn/ui (Radix primitives) | ✅ Current |
| Icons | lucide-react | ✅ Current |
| Forms | react-hook-form + zod | ⚠️ Installed but unused |
| Data fetching | @tanstack/react-query | ⚠️ Installed but unused |
| Charts | recharts | ⚠️ Installed but unused |
| Theme | next-themes | ⚠️ Installed but unused |

### Unused Dependencies (Bloat)
These are installed but never imported anywhere in application code:
- `@hookform/resolvers`, `react-hook-form`, `zod` — form not using them
- `@tanstack/react-query` — provider exists but no queries
- `recharts` — no charts on an HVAC site
- `next-themes` — dark mode defined in CSS but no toggle
- `react-day-picker`, `date-fns` — no date picker used
- `embla-carousel-react` — no carousel used
- `input-otp` — no OTP flow
- `react-resizable-panels` — no panel layout used
- `cmdk` — no command palette
- `vaul` — no drawer used
- `sonner` — Sonner toaster mounted but never triggered

### Unused UI Components (49 shadcn/ui files)
Only a handful are actually used (tooltip, toaster, sonner). The remaining ~45 files are dead weight:
- sidebar, chart, command, table, menubar, context-menu, navigation-menu, pagination, etc.
- Combined ~130KB of unused component code

### Build Tools
- Vite 5 (with SWC plugin for React)
- TypeScript 5.8
- ESLint 9 with flat config
- Vitest 3.2 (configured but only a trivial placeholder test)
- PostCSS + Autoprefixer
- `lovable-tagger` — dev dependency for Lovable platform integration

---

## 4. Code Quality

### Dead Code
| Item | Impact |
|------|--------|
| 45+ unused shadcn/ui components | ~130KB source bloat |
| `NavLink.tsx` component | Never imported anywhere |
| `use-mobile.tsx` hook | Imported nowhere in app code |
| `use-toast.ts` hook | Only re-exported, never consumed |
| `App.css` | Likely unused (all styles in index.css + Tailwind) |
| 10+ unused Radix packages | Bundle size inflation |

### Duplicates
- Phone number `(214) 555-1234` hardcoded in 8+ places — should be a constant
- Service data duplicated between Index.tsx and individual page files
- Emergency banner repeated on every page via manual import

### Security
- **Low risk** (no backend, no auth, no user data stored)
- Form has no CSRF protection (irrelevant without backend)
- Form has basic `maxLength` validation but no sanitization for when backend exists
- No Content-Security-Policy headers configured
- Phone number is a placeholder — would need real number before launch

### Performance
- **Large image assets bundled in src/assets** (hero-hvac.jpg = 207KB, ac-install.jpg = 100KB) — these get base64-inlined or processed by Vite but aren't optimized
- No lazy loading on images
- No route-level code splitting (all pages bundled together)
- No image optimization pipeline (no WebP/AVIF)
- Google Fonts loaded via CSS @import (render-blocking)
- 49 UI component files increase build time even if tree-shaken

### TypeScript
- Strict mode enabled ✅
- No `any` types visible
- Props properly typed with interfaces
- `@typescript-eslint/no-unused-vars` is disabled — hides dead code

### Accessibility
- Missing `<label>` elements on all form inputs (only placeholders, no associated labels)
- Missing `aria-label` on mobile menu button (has it ✅)
- No skip-to-content link
- Star ratings in testimonials use `<span>` with no screen reader text
- No focus management on route changes
- Color contrast on navy section text (opacity-80/60) may fail WCAG AA

---

## 5. Production Readiness

### Environment Variables
- **None defined.** No `.env` file, no `VITE_*` variables
- No API keys to manage (yet)

### Error Handling
- No error boundary — React crashes show white screen
- 404 page exists but logs to console.error (not monitored)
- No form error states beyond browser-native `required`

### Logging & Monitoring
- Zero logging infrastructure
- No error tracking (Sentry, etc.)
- No analytics (GA4, GTM)
- No performance monitoring

### Testing
- **Effectively zero test coverage**
- Only 1 placeholder test (`expect(true).toBe(true)`)
- Vitest configured correctly, just unused
- No component tests, no integration tests, no E2E tests

### CI/CD
- **None configured.** No GitHub Actions, no deployment pipeline
- No linting in CI, no build verification, no preview deployments

---

## 6. Missing Backend Design

For this site to function as a real business tool, it needs:

### Database Schema (PostgreSQL)

```sql
-- Lead/quote submissions
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  service VARCHAR(50) NOT NULL,
  message TEXT,
  source_page VARCHAR(100),
  status VARCHAR(20) DEFAULT 'new', -- new, contacted, quoted, won, lost
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service requests / appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  service_type VARCHAR(50) NOT NULL,
  preferred_date DATE,
  preferred_time VARCHAR(20),
  address TEXT,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts (for SEO)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  meta_description VARCHAR(300),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews cache
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(50), -- google, yelp
  author_name VARCHAR(100),
  rating INTEGER,
  text TEXT,
  date TIMESTAMPTZ,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Endpoints

```
POST   /api/leads              — Submit quote request form
GET    /api/leads              — Admin: list leads (authenticated)
PATCH  /api/leads/:id          — Admin: update lead status

POST   /api/appointments       — Book a service appointment
GET    /api/appointments       — Admin: list appointments

GET    /api/posts              — List blog posts
GET    /api/posts/:slug        — Get single post

GET    /api/reviews            — Get cached reviews for display
POST   /api/reviews/sync       — Cron: sync from Google Business API
```

### Auth
- Admin panel: simple email/password or OAuth (Google) for staff
- No customer accounts needed (lead capture only)
- JWT or session-based auth for admin API

### Recommended Backend Stack
- **Supabase** (simplest path: Postgres + Auth + Edge Functions + Storage)
- OR: Node.js/Express + PostgreSQL + Resend (email)
- Pair with email notifications on lead submission (Resend/SendGrid)

### Deployment
- Frontend: Vercel or Cloudflare Pages (better for SPA + future SSR migration)
- Backend: Supabase (managed) or Railway/Fly.io (self-managed)
- Consider migrating to Next.js or Astro for SSR (critical for SEO)

---

## 7. Deployment Readiness

### Build Configuration
- `vite build` works out of the box ✅
- Output goes to `dist/` (gitignored) ✅
- No environment-specific configs needed currently

### Issues for Production Deployment
| Issue | Severity |
|-------|----------|
| SPA routing requires server-side fallback to index.html | 🔴 Critical |
| No `_redirects` or `vercel.json` or `netlify.toml` for routing | 🔴 Critical |
| Meta description says "demo-website-3" | 🟡 High |
| OG image points to Lovable preview URL | 🟡 High |
| No sitemap.xml generation | 🟡 High |
| No robots.txt sitemap reference | 🟡 Medium |
| Google Fonts loaded in CSS (no preconnect in HTML) | 🟡 Medium |
| Placeholder phone number `(214) 555-1234` | 🔴 Critical |
| No favicon meta tags for mobile | 🟡 Medium |

---

## Summary of Issues

### 🔴 Critical Issues

1. **Form does nothing** — Quote form has no backend; leads are lost
2. **Placeholder phone number** — Must be replaced with real business number
3. **No SPA routing fallback** — Deployed site will 404 on page refresh
4. **No SEO** — SPA with no SSR, no per-page meta tags, no structured data. A local business lives or dies by local SEO
5. **Meta description says "demo-website-3"** — Clearly not production-ready

### 🟡 High Impact Improvements

1. **Remove unused dependencies** — ~15 packages inflating bundle
2. **Add error boundary** — Prevent white-screen crashes
3. **Proper form handling** — Backend + email notifications
4. **Per-page SEO** (title, meta, JSON-LD)
5. **Image optimization** — WebP, lazy loading, proper sizing
6. **Accessibility fixes** — Form labels, skip nav, focus management
7. **Analytics integration** — Can't measure what you can't track

### ✅ Quick Wins (< 1 hour each)

| Task | Effort |
|------|--------|
| Extract phone number to a constant | 10 min |
| Fix index.html meta description and OG tags | 15 min |
| Add `<label>` elements to form inputs | 20 min |
| Add preconnect for Google Fonts to index.html | 5 min |
| Add React error boundary component | 20 min |
| Remove `App.css` (unused) | 5 min |
| Remove `NavLink.tsx` (unused) | 5 min |
| Add `_redirects` or deployment routing config | 10 min |
| Add skip-to-content link | 15 min |
| Disable `lovable-tagger` in prod build (already conditional) | 5 min |

### 📋 Medium Tasks (< 1 day each)

| Task | Effort |
|------|--------|
| Remove all unused shadcn/ui components and dependencies | 2-3 hours |
| Implement form backend (Supabase or serverless function) | 4-6 hours |
| Add per-page `<title>` and `<meta>` via react-helmet-async | 2-3 hours |
| Add JSON-LD structured data (LocalBusiness, Service) | 2-3 hours |
| Set up CI/CD pipeline (GitHub Actions: lint + build + deploy) | 2-3 hours |
| Image optimization: convert to WebP, add lazy loading | 3-4 hours |
| Write component tests for QuoteForm, Navbar | 3-4 hours |
| Add sitemap.xml generation | 1-2 hours |
| Google Analytics / Tag Manager integration | 1-2 hours |
| Add privacy policy and terms pages | 2-3 hours |

### 🚀 Major Features

| Feature | Effort | Impact |
|---------|--------|--------|
| Migrate to Next.js/Astro for SSR + SEO | 2-3 days | 🔴 Critical for business |
| Full backend (leads DB + admin panel + email) | 3-5 days | 🔴 Critical |
| Blog/content system for SEO | 2-3 days | 🟡 High |
| Online booking/scheduling system | 3-4 days | 🟡 High |
| Google Maps integration on service areas | 1 day | 🟡 Medium |
| Google Business reviews integration | 1-2 days | 🟡 Medium |
| Live chat widget (Intercom/Tidio) | 2-4 hours | 🟡 Medium |

---

## Priority Roadmap

### Phase 1 — Launch-Ready (Week 1)
**Goal:** Make deployable and functional for a real business

- [ ] Replace placeholder phone number with real number
- [ ] Fix all meta tags (title, description, OG image)
- [ ] Add SPA routing fallback config
- [ ] Implement form backend (Supabase Edge Function + email notification)
- [ ] Add form validation with react-hook-form + zod (already installed)
- [ ] Fix accessibility: form labels, skip nav, contrast
- [ ] Add error boundary
- [ ] Remove dead code and unused dependencies
- [ ] Set up CI/CD (GitHub Actions → Vercel/Cloudflare deploy)
- [ ] Add Google Analytics
- [ ] Add privacy policy page

**Effort:** ~3-4 days for 1 engineer

### Phase 2 — SEO Foundation (Week 2-3)
**Goal:** Rank in local search results

- [ ] Migrate to Next.js or Astro (SSR/SSG for SEO)
- [ ] Per-page metadata and canonical URLs
- [ ] JSON-LD structured data (LocalBusiness, Service, FAQ)
- [ ] Sitemap.xml + robots.txt update
- [ ] Image optimization (WebP, srcset, lazy loading)
- [ ] Add Google Business Profile integration
- [ ] Preconnect/prefetch optimizations
- [ ] Core Web Vitals audit and fixes

**Effort:** ~5-7 days for 1 engineer

### Phase 3 — Lead Generation (Week 3-5)
**Goal:** Convert visitors into customers

- [ ] Full leads management backend + admin dashboard
- [ ] Email drip sequences for leads
- [ ] Online scheduling/booking system
- [ ] Live chat integration
- [ ] Call tracking with dynamic number insertion
- [ ] A/B testing on CTAs and form placements
- [ ] Blog CMS for content marketing

**Effort:** ~8-10 days for 1 engineer

### Phase 4 — Scale & Optimize (Month 2+)
**Goal:** Grow and measure

- [ ] Customer reviews display (Google, Yelp API)
- [ ] Service-area specific landing pages (SEO)
- [ ] Performance monitoring (Sentry, Datadog RUM)
- [ ] Automated reporting dashboard
- [ ] Multi-language support (Spanish for DFW market)
- [ ] Progressive Web App features
- [ ] Automated review request emails post-service

**Effort:** Ongoing

---

## Final Assessment

**Current State:** This is a well-structured Lovable-generated prototype. The React/Tailwind code is clean and consistent, the component architecture is sound, and the visual design is professional. However, it's a **non-functional marketing mockup** — not a production website.

**Biggest Risk:** Deploying this as-is would mean zero lead capture (the entire point of the site), poor SEO (invisible to local searchers), and embarrassing meta tags ("demo-website-3").

**Biggest Opportunity:** The frontend is 80% done. With 1 week of focused work (Phase 1), this can be a live, functional business site. The remaining phases add growth capabilities.

**Recommended First Action:** Phase 1, starting with form backend + meta tag fixes + deployment config. These three items take the site from "demo" to "functional business tool."
