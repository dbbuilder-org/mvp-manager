# MVP Manager - Requirements Specification

## Overview

The MVP Manager is the central orchestration platform for StartupVision's MVP Creation Suite, managing the complete lifecycle of customer MVP projects from intake through delivery.

---

## Functional Requirements

### FR-1: User Management & Authentication

#### FR-1.1: Authentication
- **FR-1.1.1**: System SHALL support email/password authentication via Supabase Auth
- **FR-1.1.2**: System SHALL support magic link authentication
- **FR-1.1.3**: System SHALL maintain session persistence with secure tokens
- **FR-1.1.4**: System SHALL support password reset flow

#### FR-1.2: User Roles
- **FR-1.2.1**: System SHALL support role: `admin` - full platform access
- **FR-1.2.2**: System SHALL support role: `engineer` - assigned project access
- **FR-1.2.3**: System SHALL support role: `client` - own project access only
- **FR-1.2.4**: System SHALL enforce role-based access via RLS policies

#### FR-1.3: Multi-Tenancy
- **FR-1.3.1**: System SHALL support multi-tenant organizations
- **FR-1.3.2**: System SHALL isolate data by organization using RLS
- **FR-1.3.3**: System SHALL track organization subscription tier

---

### FR-2: Project Management

#### FR-2.1: Project Lifecycle
- **FR-2.1.1**: System SHALL support project states: discovery, in_progress, review, staging, launched
- **FR-2.1.2**: System SHALL track project tier: starter (7 days), standard (14 days), premium (30 days)
- **FR-2.1.3**: System SHALL auto-calculate target delivery date based on tier

#### FR-2.2: Phase Management
- **FR-2.2.1**: System SHALL track 8 development phases per project:
  1. Discovery & Requirements
  2. Architecture Design
  3. Data Model
  4. API Development
  5. TDD Implementation
  6. UI Development
  7. Testing & Deployment
  8. Polish & Launch
- **FR-2.2.2**: System SHALL track phase status: pending, in_progress, pending_review, approved
- **FR-2.2.3**: System SHALL require phase approval before advancing

#### FR-2.3: Project Assignment
- **FR-2.3.1**: System SHALL assign each project to one engineer
- **FR-2.3.2**: System SHALL link projects to client accounts
- **FR-2.3.3**: System SHALL support reassignment with history

---

### FR-3: Review & Approval System

#### FR-3.1: Review Types
- **FR-3.1.1**: System SHALL support review type: `phase_checkpoint` - end-of-phase approval
- **FR-3.1.2**: System SHALL support review type: `code_review` - code quality check
- **FR-3.1.3**: System SHALL support review type: `client_signoff` - customer approval

#### FR-3.2: Review Workflow
- **FR-3.2.1**: System SHALL create reviews automatically at phase completion
- **FR-3.2.2**: System SHALL assign reviews to appropriate user
- **FR-3.2.3**: System SHALL track review status: pending, in_review, approved, rejected
- **FR-3.2.4**: System SHALL support review decisions: approved, revise, rejected
- **FR-3.2.5**: System SHALL record feedback with each decision

#### FR-3.3: Notifications
- **FR-3.3.1**: System SHALL notify users when reviews are assigned
- **FR-3.3.2**: System SHALL notify users when reviews are completed
- **FR-3.3.3**: System SHALL support email notifications via Resend

---

### FR-4: AI Task Management

#### FR-4.1: Task Types
- **FR-4.1.1**: System SHALL support task type: `code_generation`
- **FR-4.1.2**: System SHALL support task type: `test_generation`
- **FR-4.1.3**: System SHALL support task type: `documentation`
- **FR-4.1.4**: System SHALL support task type: `validation`

#### FR-4.2: Model Tracking
- **FR-4.2.1**: System SHALL track model usage: opus, sonnet, haiku
- **FR-4.2.2**: System SHALL track tokens used (input/output)
- **FR-4.2.3**: System SHALL calculate and track cost per task

#### FR-4.3: Task Execution
- **FR-4.3.1**: System SHALL track task status: pending, processing, completed, failed
- **FR-4.3.2**: System SHALL record execution duration
- **FR-4.3.3**: System SHALL store task results as JSON

---

### FR-5: Communication

#### FR-5.1: Messaging
- **FR-5.1.1**: System SHALL support project-scoped messages
- **FR-5.1.2**: System SHALL display message author and timestamp
- **FR-5.1.3**: System SHALL support message types: message, system, alert

#### FR-5.2: Activity Log
- **FR-5.2.1**: System SHALL log all project-related activities
- **FR-5.2.2**: System SHALL display activity timeline per project
- **FR-5.2.3**: System SHALL support filtering by activity type

---

### FR-6: Dashboard

#### FR-6.1: Admin/Engineer Dashboard
- **FR-6.1.1**: System SHALL display active project count
- **FR-6.1.2**: System SHALL display pending reviews with priority
- **FR-6.1.3**: System SHALL display running AI tasks
- **FR-6.1.4**: System SHALL display recent activity

#### FR-6.2: Client Dashboard
- **FR-6.2.1**: System SHALL display project progress percentage
- **FR-6.2.2**: System SHALL display current phase with description
- **FR-6.2.3**: System SHALL display pending approvals
- **FR-6.2.4**: System SHALL display message thread

---

## Non-Functional Requirements

### NFR-1: Performance
- **NFR-1.1**: Page load time SHALL be < 3 seconds
- **NFR-1.2**: Real-time updates SHALL reflect within 500ms
- **NFR-1.3**: System SHALL support 50+ concurrent users

### NFR-2: Security
- **NFR-2.1**: All communications SHALL use HTTPS
- **NFR-2.2**: Database access SHALL be controlled via RLS
- **NFR-2.3**: Secrets SHALL be stored in environment variables
- **NFR-2.4**: System SHALL prevent cross-tenant data access

### NFR-3: Availability
- **NFR-3.1**: System SHALL maintain 99.5% uptime
- **NFR-3.2**: System SHALL provide graceful error handling

### NFR-4: Maintainability
- **NFR-4.1**: Code SHALL follow TypeScript best practices
- **NFR-4.2**: Components SHALL be documented
- **NFR-4.3**: Database changes SHALL use migrations

---

## User Stories

### Admin User Stories
```
US-1: As an admin, I want to view all projects so I can monitor overall progress.
US-2: As an admin, I want to assign projects to engineers so work is distributed.
US-3: As an admin, I want to view AI costs so I can track budget.
US-4: As an admin, I want to manage user roles so I can control access.
```

### Engineer User Stories
```
US-5: As an engineer, I want to see my assigned projects so I know my workload.
US-6: As an engineer, I want to update phase status so progress is tracked.
US-7: As an engineer, I want to request client reviews so I can get approvals.
US-8: As an engineer, I want to view AI task results so I can use generated code.
```

### Client User Stories
```
US-9: As a client, I want to see my project progress so I know the status.
US-10: As a client, I want to approve deliverables so the project can advance.
US-11: As a client, I want to message my team so I can ask questions.
US-12: As a client, I want to view staging URLs so I can test my application.
```

---

## Acceptance Criteria

### Project Lifecycle
- [ ] Project can be created with all required fields
- [ ] Project progresses through phases correctly
- [ ] Phase advancement requires approval
- [ ] RLS prevents unauthorized access

### Review System
- [ ] Reviews auto-created at phase completion
- [ ] Reviews can be assigned and completed
- [ ] Decisions recorded with audit trail
- [ ] Notifications sent on assignment

### AI Tasks
- [ ] Tasks tracked with correct metadata
- [ ] Costs calculated accurately
- [ ] Results stored and viewable
- [ ] Real-time status updates work

### Client Portal
- [ ] Clients see only their projects
- [ ] Progress displays accurately
- [ ] Approvals can be submitted
- [ ] Messages are delivered

---

*Document Version: 1.0 | Last Updated: January 2026*
