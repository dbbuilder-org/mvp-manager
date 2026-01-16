export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PhaseTimeline } from "@/components/projects/phase-timeline";
import {
  ArrowLeft,
  Calendar,
  Users,
  GitBranch,
  ExternalLink,
  Mail,
  Clock,
  Bot,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react";

// Placeholder data - will be replaced with Prisma queries
const projectsData: Record<string, {
  id: string;
  name: string;
  slug: string;
  description: string;
  client: string;
  clientEmail: string;
  engineer: string;
  tier: string;
  status: string;
  currentPhase: number;
  progress: number;
  targetDate: string;
  createdAt: string;
  githubRepo: string;
  stagingUrl: string;
  productionUrl: string;
}> = {
  "1": {
    id: "1",
    name: "FinanceTracker Pro",
    slug: "financetracker-pro",
    description: "Personal finance management application with budgeting, expense tracking, investment portfolio management, and financial goal setting features.",
    client: "TechCorp Inc",
    clientEmail: "contact@techcorp.com",
    engineer: "Alex Johnson",
    tier: "standard",
    status: "in_progress",
    currentPhase: 4,
    progress: 50,
    targetDate: "2026-02-15",
    createdAt: "2026-01-01",
    githubRepo: "dbbuilder-org/financetracker-pro",
    stagingUrl: "https://financetracker-staging.onrender.com",
    productionUrl: "",
  },
  "2": {
    id: "2",
    name: "HealthSync Mobile",
    slug: "healthsync-mobile",
    description: "Healthcare app for patient-provider communication, appointment scheduling, prescription management, and telehealth consultations.",
    client: "MedStart Labs",
    clientEmail: "hello@medstart.io",
    engineer: "Sarah Chen",
    tier: "premium",
    status: "review",
    currentPhase: 6,
    progress: 75,
    targetDate: "2026-03-01",
    createdAt: "2025-12-15",
    githubRepo: "dbbuilder-org/healthsync-mobile",
    stagingUrl: "https://healthsync-staging.onrender.com",
    productionUrl: "",
  },
  "3": {
    id: "3",
    name: "EduLearn Platform",
    slug: "edulearn-platform",
    description: "Online learning management system with video courses, interactive assessments, progress tracking, and certification management.",
    client: "Learning Co",
    clientEmail: "info@learningco.edu",
    engineer: "Mike Rivera",
    tier: "standard",
    status: "discovery",
    currentPhase: 2,
    progress: 25,
    targetDate: "2026-04-01",
    createdAt: "2026-01-10",
    githubRepo: "",
    stagingUrl: "",
    productionUrl: "",
  },
};

const phasesData = [
  { id: "p1", phaseNumber: 1, phaseName: "Discovery & Requirements", status: "approved" as const },
  { id: "p2", phaseNumber: 2, phaseName: "Architecture Design", status: "approved" as const },
  { id: "p3", phaseNumber: 3, phaseName: "Data Model", status: "approved" as const },
  { id: "p4", phaseNumber: 4, phaseName: "API Development", status: "in_progress" as const },
  { id: "p5", phaseNumber: 5, phaseName: "TDD Implementation", status: "pending" as const },
  { id: "p6", phaseNumber: 6, phaseName: "UI Development", status: "pending" as const },
  { id: "p7", phaseNumber: 7, phaseName: "Testing & Deployment", status: "pending" as const },
  { id: "p8", phaseNumber: 8, phaseName: "Polish & Launch", status: "pending" as const },
];

const recentActivity = [
  { id: "1", type: "phase_complete", description: "Phase 3: Data Model approved", time: "2 hours ago" },
  { id: "2", type: "ai_task", description: "AI generated API endpoints", time: "5 hours ago" },
  { id: "3", type: "review", description: "Code review requested for auth module", time: "1 day ago" },
  { id: "4", type: "message", description: "Client approved wireframes", time: "2 days ago" },
];

function getStatusColor(status: string) {
  switch (status) {
    case "discovery": return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    case "in_progress": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "review": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "staging": return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
    case "launched": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    default: return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

function getTierColor(tier: string) {
  switch (tier) {
    case "starter": return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
    case "standard": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "premium": return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    default: return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData[id];

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      {/* Project Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-light">{project.name}</h1>
            <Badge variant="outline" className={getTierColor(project.tier)}>
              {project.tier}
            </Badge>
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {project.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Project</Button>
          <Button>Request Review</Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-semibold">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>
            <Separator orientation="vertical" className="hidden md:block h-12" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Client</div>
                  <div className="font-medium">{project.client}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Engineer</div>
                  <div className="font-medium">{project.engineer}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Target</div>
                  <div className="font-medium">
                    {new Date(project.targetDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Phase</div>
                  <div className="font-medium">{project.currentPhase} of 8</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Development Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <PhaseTimeline phases={phasesData} currentPhase={project.currentPhase} />
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="ai-tasks">AI Tasks</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Client Email</span>
                  <a
                    href={`mailto:${project.clientEmail}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    {project.clientEmail}
                  </a>
                </div>
                {project.githubRepo && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">GitHub Repo</span>
                    <a
                      href={`https://github.com/${project.githubRepo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <GitBranch className="h-3 w-3" />
                      {project.githubRepo}
                    </a>
                  </div>
                )}
                {project.stagingUrl && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Staging URL</span>
                    <a
                      href={project.stagingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Staging
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        {activity.type === "phase_complete" && <Check className="h-4 w-4 text-emerald-500" />}
                        {activity.type === "ai_task" && <Bot className="h-4 w-4 text-violet-500" />}
                        {activity.type === "review" && <ClipboardCheck className="h-4 w-4 text-amber-500" />}
                        {activity.type === "message" && <MessageSquare className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                Reviews will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-tasks">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                AI tasks will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                Messages will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// For missing icon
function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
