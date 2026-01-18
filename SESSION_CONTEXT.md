# MVP Manager - Session Context

## Project Overview

**Name:** MVP Manager
**URL:** https://mvp.startupvision.net
**Repository:** https://github.com/dbbuilder-org/mvp-manager
**Location:** `/Users/admin/dev2/mvp-manager`

A multi-tenant project management platform for tracking and delivering MVPs with AI loops, human engineering loops, and client approval workflows.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Database | PostgreSQL on Render |
| ORM | Prisma 7 |
| Auth | Clerk |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion |
| Notifications | Sonner (toast) |
| Deployment | Render (via render.yaml) + Vercel |

---

## Deployment Configuration

### Render (render.yaml)
- **Web Service:** `mvp-manager` (Node.js)
- **Database:** `mvp-manager-db` (PostgreSQL Basic-256MB)
- **Region:** Oregon

### Vercel
- Custom domain: `mvp.startupvision.net`
- DNS: CNAME record pointing to `cname.vercel-dns.com`

### Environment Variables Required
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_b3B0aW11bS1jYXRmaXNoLTcuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_i4jV8qyo5T1ZGKoJZH7P6jdUm1TMyjbmAoFpbvA39l
DATABASE_URL=<from Render PostgreSQL>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

---

## Database Schema (Prisma)

### Models
1. **Organization** - Multi-tenant organizations
2. **Profile** - User profiles (extends Clerk users)
3. **Project** - MVP projects with 8-phase workflow
4. **ProjectPhase** - Individual phases per project
5. **Review** - Approval checkpoints (phase, code, client signoff)
6. **AITask** - AI loop tracking with token/cost metrics
7. **Message** - Communication threads
8. **ActivityLog** - Audit trail

### Key Relationships
- Organization → Profiles, Projects
- Project → Phases, Reviews, AITasks, Messages
- Profile → Assigned Projects, Reviews, AITasks

---

## Application Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with ClerkProvider + Toaster
│   ├── page.tsx                   # Landing page
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/
│   │   └── sign-up/[[...sign-up]]/
│   └── (dashboard)/
│       ├── layout.tsx             # Dashboard shell with sidebar + command menu
│       ├── page.tsx               # Dashboard home
│       ├── loading.tsx            # Skeleton loader
│       ├── projects/
│       │   ├── page.tsx           # Projects list (grid + table views)
│       │   ├── loading.tsx
│       │   └── [id]/page.tsx      # Project detail with phase timeline
│       ├── reviews/
│       │   ├── page.tsx           # Reviews queue
│       │   ├── loading.tsx
│       │   └── [id]/page.tsx      # Review detail with approval form
│       └── ai-monitor/
│           └── page.tsx           # AI task monitoring
├── components/
│   ├── layout/
│   │   ├── app-sidebar.tsx        # Navigation sidebar
│   │   ├── command-menu.tsx       # Cmd+K command palette
│   │   └── search-button.tsx      # Header search trigger
│   ├── projects/
│   │   └── phase-timeline.tsx     # 8-phase visual timeline
│   ├── providers/
│   │   └── clerk-provider.tsx     # Conditional Clerk wrapper
│   └── ui/                        # shadcn/ui components
├── lib/
│   └── db.ts                      # Prisma client singleton
└── middleware.ts                  # Clerk auth middleware (conditional)
```

---

## UI Features

### shadcn/ui Components Installed
- Card, Button, Badge, Input, Textarea, Label
- Tabs, Select, Progress, Separator, Checkbox
- Sidebar, Tooltip, Avatar, Scroll Area
- Dialog, Dropdown Menu, Sheet
- Table, Command, Skeleton, Sonner (toast)

### Custom Features
1. **Command Palette** - `Cmd+K` for quick navigation
2. **Data Table** - Grid/Table view toggle on projects
3. **Phase Timeline** - Visual 8-phase progress (horizontal desktop, vertical mobile)
4. **Skeleton Loaders** - Loading states for all pages
5. **Toast Notifications** - Success/error feedback

---

## Design System

### Colors (StartupVision Theme)
- **Primary:** Violet-600 (`#7c3aed`)
- **Secondary:** Cyan-500 (`#06b6d4`)
- **Background:** Zinc-50 (light), Zinc-950 (dark)
- **Status Colors:**
  - Discovery: Violet
  - In Progress: Blue
  - Review: Amber
  - Staging: Cyan
  - Launched: Emerald

### Typography
- Headings: Geist Sans
- Body: Geist Sans
- Mono: Geist Mono

---

## User Roles

| Role | Access |
|------|--------|
| `admin` | Full access to all projects |
| `engineer` | Assigned projects only |
| `client` | Own projects only (view + approve) |

---

## 8-Phase Development Workflow

1. **Discovery & Requirements** - Gather requirements, define scope
2. **Architecture Design** - System design, technical approach
3. **Data Model** - Database schema, relationships
4. **API Development** - REST/GraphQL endpoints
5. **TDD Implementation** - Test-driven development
6. **UI Development** - Frontend components
7. **Testing & Deployment** - QA, bug fixes, deployment
8. **Polish & Launch** - Final polish, go-live

---

## Build Notes

### Prisma 7 Changes
- `url` property removed from schema datasource
- Configuration now in `prisma.config.ts`
- Run `prisma generate` in postinstall and build scripts

### Render Build Requirements
All build dependencies must be in `dependencies` (not `devDependencies`):
- `@tailwindcss/postcss`
- `tailwindcss`
- `typescript`
- `@types/node`, `@types/react`, `@types/react-dom`

### Clerk Conditional Loading
Clerk provider and middleware are conditional to allow builds without valid API keys:
- Checks `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` starts with `pk_`
- Falls back to no-op middleware and plain children wrapper

---

## Next Steps

1. **Connect Render PostgreSQL** - Add `DATABASE_URL` after Render deployment
2. **Run Migrations** - `npx prisma migrate deploy`
3. **Replace Placeholder Data** - Fetch from Prisma instead of hardcoded arrays
4. **Add Real Functionality:**
   - Project CRUD operations
   - Review approval workflow with toast feedback
   - AI task creation and monitoring
   - Real-time updates (consider Pusher or polling)

---

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Prisma
npx prisma generate      # Generate client
npx prisma migrate dev   # Create migration
npx prisma studio        # Database GUI

# Deployment
vercel --prod            # Deploy to Vercel
git push origin main     # Auto-deploys to Render
```

---

## Session Summary

This session built the MVP Manager platform from scratch:

1. Created Next.js 16 project with App Router
2. Set up Prisma 7 with PostgreSQL schema
3. Integrated Clerk authentication
4. Built dashboard with shadcn/ui components
5. Created projects, reviews, and AI monitor pages
6. Added professional UI enhancements (command palette, data tables, skeletons)
7. Configured DNS for mvp.startupvision.net
8. Set up Render deployment with render.yaml
9. Fixed build issues (Prisma 7, Tailwind, TypeScript deps)

**Current Status:** Deployed to Vercel, Render deployment in progress.
