# Dallas Air Experts

Marketing & lead-generation website for a Dallas-Fort Worth HVAC company. Built with React, Tailwind CSS, and Supabase.

## Live Site

Deployed at: https://dallas-air-pros.vercel.app/

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS 3
- **UI:** shadcn/ui (minimal subset), Lucide icons
- **Forms:** react-hook-form + Zod validation
- **Backend:** Supabase (PostgreSQL + REST API)
- **SEO:** react-helmet-async, JSON-LD structured data
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 ID (optional) |

**Note:** The anon key is safe to expose client-side — it only allows inserts to the `leads` table. Row Level Security controls access.

## Scripts

```bash
npm run dev        # Start development server (port 8080)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
npm run test       # Run tests
npm run test:watch # Watch mode
```

## Project Structure

```
src/
├── components/
│   ├── ui/            # shadcn/ui primitives (button, tooltip, sonner)
│   ├── ErrorBoundary  # Crash recovery
│   ├── SEO            # Per-page meta tags
│   ├── StructuredData # JSON-LD schema
│   ├── Navbar         # Site navigation with skip-nav
│   ├── Footer         # Site footer
│   ├── QuoteForm      # Lead capture form → Supabase
│   ├── EmergencyBanner# CTA banner
│   └── ServicePageLayout # Reusable service page template
├── lib/
│   ├── constants.ts   # Business info (phone, email, etc.)
│   ├── supabase.ts    # Supabase client
│   └── utils.ts       # Tailwind cn() helper
├── pages/             # Route components (code-split)
└── test/              # Test files
supabase/
└── migrations/        # Database schema
```

## Database

The `leads` table stores form submissions:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(100) | Customer name |
| phone | VARCHAR(20) | Phone number |
| email | VARCHAR(255) | Email address |
| service | VARCHAR(50) | Service type requested |
| message | TEXT | Optional description |
| source_page | VARCHAR(100) | Which page submitted from |
| status | VARCHAR(20) | Lead status (new/contacted/won/lost) |
| created_at | TIMESTAMPTZ | Submission timestamp |

### Applying migrations

```bash
supabase link --project-ref <your-project-ref>
echo "Y" | supabase db push
```

## Deployment

### Vercel
```bash
# vercel.json handles SPA routing automatically
vercel --prod
```

Set environment variables in Vercel dashboard → Settings → Environment Variables.

### Netlify
The `public/_redirects` file handles SPA routing. Set env vars in site settings.

## Security Notes

- `.env` is gitignored and never committed
- Supabase anon key is public-safe (only allows INSERT to leads)
- No service_role key is exposed client-side
- Form inputs have maxLength and Zod validation
- RLS is disabled on leads table (acceptable for a write-only public form)

## License

Private. All rights reserved.
