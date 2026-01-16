import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban,
  ClipboardCheck,
  Bot,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// Placeholder data - will be replaced with real data from Prisma
const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2 this week",
    icon: FolderKanban,
    href: "/dashboard/projects",
  },
  {
    title: "Pending Reviews",
    value: "5",
    change: "3 urgent",
    icon: ClipboardCheck,
    href: "/dashboard/reviews",
  },
  {
    title: "AI Tasks Running",
    value: "3",
    change: "$12.50 today",
    icon: Bot,
    href: "/dashboard/ai-monitor",
  },
  {
    title: "Completed This Month",
    value: "8",
    change: "+33% vs last",
    icon: TrendingUp,
    href: "/dashboard/projects?status=launched",
  },
];

const recentProjects = [
  {
    id: "1",
    name: "FinanceTracker Pro",
    client: "TechCorp Inc",
    phase: 4,
    status: "in_progress",
    progress: 50,
  },
  {
    id: "2",
    name: "HealthSync Mobile",
    client: "MedStart Labs",
    phase: 6,
    status: "review",
    progress: 75,
  },
  {
    id: "3",
    name: "EduLearn Platform",
    client: "Learning Co",
    phase: 2,
    status: "discovery",
    progress: 25,
  },
];

const pendingReviews = [
  {
    id: "1",
    title: "Phase 4 Checkpoint - API Development",
    project: "FinanceTracker Pro",
    type: "phase_checkpoint",
    priority: "high",
    dueDate: "Today",
  },
  {
    id: "2",
    title: "Client Sign-off - UI Mockups",
    project: "HealthSync Mobile",
    type: "client_signoff",
    priority: "normal",
    dueDate: "Tomorrow",
  },
  {
    id: "3",
    title: "Code Review - Auth Module",
    project: "EduLearn Platform",
    type: "code_review",
    priority: "normal",
    dueDate: "In 2 days",
  },
];

const phaseNames = [
  "Discovery",
  "Architecture",
  "Data Model",
  "API Dev",
  "TDD",
  "UI Dev",
  "Testing",
  "Launch",
];

function getStatusColor(status: string) {
  switch (status) {
    case "discovery":
      return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    case "in_progress":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "review":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "staging":
      return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
    case "launched":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "critical":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    case "high":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-light text-foreground">
          Welcome back
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Recent Projects
            </CardTitle>
            <Link
              href="/dashboard/projects"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="space-y-1">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {project.client}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Phase {project.phase}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {phaseNames[project.phase - 1]}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={getStatusColor(project.status)}
                    >
                      {project.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Pending Reviews
            </CardTitle>
            <Link
              href="/dashboard/reviews"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReviews.map((review) => (
              <Link
                key={review.id}
                href={`/dashboard/reviews/${review.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors">
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="font-medium truncate">{review.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {review.project}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-sm text-muted-foreground">
                      {review.dueDate}
                    </div>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(review.priority)}
                    >
                      {review.priority}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
