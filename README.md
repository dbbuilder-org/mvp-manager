# MVP Manager Platform

Multi-tenant project management platform for tracking and delivering MVPs with AI loops, human engineering loops, and client approval workflows.

**URL:** https://mvp.startupvision.net

## Overview

MVP Manager is the internal operations platform for StartupVision's MVP Creation Suite. It provides:

- **Project Tracking**: 8-phase development workflow with visual progress
- **Review System**: Approval checkpoints for quality gates
- **AI Task Monitoring**: Track Claude AI usage, costs, and outputs
- **Client Portal**: Customer-facing view with approvals and communication
- **Real-time Updates**: Live synchronization across all users

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Database | Supabase (PostgreSQL with RLS) |
| Auth | Supabase Auth |
| Styling | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion |
| Real-time | Supabase Realtime |
| Deployment | Vercel |

## User Roles

| Role | Access |
|------|--------|
| `admin` | Full access to all projects and settings |
| `engineer` | Access to assigned projects |
| `client` | View own project progress and submit approvals |

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/dbbuilder-org/mvp-manager.git
cd mvp-manager

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Run development server
npm run dev
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `RESEND_API_KEY` | Resend API key for email notifications |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login/callback routes
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── projects/     # Project management
│   │   ├── reviews/      # Review queue
│   │   └── ai-monitor/   # AI task tracking
│   └── api/              # API routes
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Dashboard layout
│   ├── projects/         # Project components
│   └── reviews/          # Review components
├── lib/
│   ├── supabase/         # Supabase client setup
│   └── hooks/            # Custom React hooks
└── types/                # TypeScript types
```

## Database Schema

See [REQUIREMENTS.md](REQUIREMENTS.md) for complete schema documentation.

Key tables:
- `organizations` - Multi-tenant organizations
- `profiles` - User profiles extending Supabase auth
- `projects` - MVP projects with 8-phase workflow
- `project_phases` - Individual phase tracking
- `reviews` - Approval checkpoints
- `ai_tasks` - AI execution tracking
- `messages` - Project communication

## Development

```bash
# Run development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## Deployment

The application is deployed to Vercel with automatic deployments from the `main` branch.

```bash
# Deploy to Vercel
vercel

# Add production domain
vercel domains add mvp.startupvision.net
```

## Documentation

- [README.md](README.md) - Project overview (this file)
- [ROADMAP.md](ROADMAP.md) - Development roadmap and phases
- [REQUIREMENTS.md](REQUIREMENTS.md) - Functional and non-functional requirements
- [TODO.md](TODO.md) - Current task list

## Related Projects

- [StartupVision Landing](https://startupvision.net) - Main marketing site
- [MVP Creator](https://mvpcreator.startupvision.net) - Customer-facing landing page
- [Prototyper](https://prototyper.startupvision.net) - AI prototype generation

## License

Private - StartupVision internal use only.
