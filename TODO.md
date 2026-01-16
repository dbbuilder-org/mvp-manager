# MVP Manager - TODO

## Phase 1: Foundation (Current)

### Project Setup
- [x] Create Next.js project
- [x] Configure Tailwind CSS
- [x] Initialize shadcn/ui
- [x] Install dependencies (Supabase, Framer Motion, etc.)
- [x] Create GitHub repo
- [x] Create project documentation

### Database Setup
- [ ] Create Supabase project
- [ ] Set up database schema
  - [ ] organizations table
  - [ ] profiles table
  - [ ] projects table
  - [ ] project_phases table
  - [ ] reviews table
  - [ ] ai_tasks table
  - [ ] messages table
  - [ ] activity_log table
- [ ] Configure RLS policies
  - [ ] Admin full access
  - [ ] Engineer assigned access
  - [ ] Client own project access
- [ ] Create database types generation

### Authentication
- [ ] Configure Supabase Auth
- [ ] Create login page
- [ ] Create auth callback handler
- [ ] Set up middleware for route protection
- [ ] Create profile creation trigger

### Layout
- [ ] Create dashboard layout component
- [ ] Build sidebar navigation
- [ ] Build header with user menu
- [ ] Implement role-based navigation

---

## Phase 2: Project Management

### Projects List
- [ ] Create projects list page
- [ ] Build project card component
- [ ] Add status filters
- [ ] Add search functionality
- [ ] Add pagination

### Project Detail
- [ ] Create project detail page
- [ ] Build project header with status
- [ ] Build tabbed interface
- [ ] Create overview tab
- [ ] Create phases tab
- [ ] Create reviews tab
- [ ] Create AI tasks tab
- [ ] Create messages tab

### Phase Timeline
- [ ] Create phase timeline component
- [ ] Visual progress indicators
- [ ] Click to expand phase details
- [ ] Phase status updates
- [ ] Phase notes/comments

### Project Forms
- [ ] Create project form
- [ ] Edit project form
- [ ] Project assignment form
- [ ] Auto-create phases on project create

---

## Phase 3: Review System

### Review Queue
- [ ] Create review queue page
- [ ] Priority sorting
- [ ] Due date tracking
- [ ] Status filtering

### Review Detail
- [ ] Create review detail page
- [ ] Approval form component
- [ ] Feedback text area
- [ ] Approve/Revise/Reject buttons
- [ ] Review history

### Client Signoff
- [ ] Create client signoff view
- [ ] Clear approval interface
- [ ] Confirmation dialog
- [ ] Success feedback

### Notifications
- [ ] Review assignment emails
- [ ] Review completion emails
- [ ] In-app notification system

---

## Phase 4: AI Task Integration

### Task Monitoring
- [ ] Create AI monitor page
- [ ] Task queue visualization
- [ ] Status indicators
- [ ] Real-time updates

### Task Details
- [ ] Task detail view
- [ ] Prompt display
- [ ] Result display
- [ ] Token/cost display

### Cost Tracking
- [ ] Per-task cost calculation
- [ ] Per-project cost aggregation
- [ ] Model usage breakdown

---

## Phase 5: Communication & Deployment

### Messaging
- [ ] Create message thread component
- [ ] Real-time message updates
- [ ] System message types
- [ ] Message notifications

### Activity Log
- [ ] Create activity log component
- [ ] Activity type filtering
- [ ] Timeline display
- [ ] Entity linking

### Deployment
- [ ] Configure Vercel project
- [ ] Set up environment variables
- [ ] Configure DNS (mvp.startupvision.net)
- [ ] Production deployment
- [ ] Smoke testing

---

## Post-Launch

### Monitoring
- [ ] Set up error tracking
- [ ] Performance monitoring
- [ ] Usage analytics

### Documentation
- [ ] API documentation
- [ ] User guide
- [ ] Admin guide

---

## Notes

- Use Supabase Realtime for live updates
- Match StartupVision design system (violet/cyan)
- RLS is critical - test thoroughly
- Mobile responsive is required

---

*Last Updated: January 2026*
