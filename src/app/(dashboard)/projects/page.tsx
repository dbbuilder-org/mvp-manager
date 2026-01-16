import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Calendar, Users } from "lucide-react";

// Placeholder data - will be replaced with Prisma queries
const projects = [
  {
    id: "1",
    name: "FinanceTracker Pro",
    slug: "financetracker-pro",
    description: "Personal finance management application with budgeting and investment tracking",
    client: "TechCorp Inc",
    clientEmail: "contact@techcorp.com",
    engineer: "Alex Johnson",
    tier: "standard",
    status: "in_progress",
    currentPhase: 4,
    progress: 50,
    targetDate: "2026-02-15",
    createdAt: "2026-01-01",
  },
  {
    id: "2",
    name: "HealthSync Mobile",
    slug: "healthsync-mobile",
    description: "Healthcare app for patient-provider communication and appointment management",
    client: "MedStart Labs",
    clientEmail: "hello@medstart.io",
    engineer: "Sarah Chen",
    tier: "premium",
    status: "review",
    currentPhase: 6,
    progress: 75,
    targetDate: "2026-03-01",
    createdAt: "2025-12-15",
  },
  {
    id: "3",
    name: "EduLearn Platform",
    slug: "edulearn-platform",
    description: "Online learning management system with video courses and assessments",
    client: "Learning Co",
    clientEmail: "info@learningco.edu",
    engineer: "Mike Rivera",
    tier: "standard",
    status: "discovery",
    currentPhase: 2,
    progress: 25,
    targetDate: "2026-04-01",
    createdAt: "2026-01-10",
  },
  {
    id: "4",
    name: "RetailHub Dashboard",
    slug: "retailhub-dashboard",
    description: "Analytics dashboard for retail inventory and sales tracking",
    client: "ShopRight Inc",
    clientEmail: "tech@shopright.com",
    engineer: "Alex Johnson",
    tier: "starter",
    status: "staging",
    currentPhase: 7,
    progress: 87,
    targetDate: "2026-01-30",
    createdAt: "2025-12-01",
  },
  {
    id: "5",
    name: "TaskFlow Enterprise",
    slug: "taskflow-enterprise",
    description: "Enterprise task management with team collaboration features",
    client: "BigCorp Industries",
    clientEmail: "dev@bigcorp.com",
    engineer: "Sarah Chen",
    tier: "premium",
    status: "launched",
    currentPhase: 8,
    progress: 100,
    targetDate: "2026-01-15",
    createdAt: "2025-11-01",
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

function getTierColor(tier: string) {
  switch (tier) {
    case "starter":
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
    case "standard":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "premium":
      return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all MVP projects
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="launched">Launched</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  <Badge variant="outline" className={getTierColor(project.tier)}>
                    {project.tier}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Phase {project.currentPhase}: {phaseNames[project.currentPhase - 1]}
                    </span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status.replace("_", " ")}
                  </Badge>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.engineer.split(" ")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.targetDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
