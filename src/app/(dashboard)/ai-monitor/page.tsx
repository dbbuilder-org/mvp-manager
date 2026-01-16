"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Bot,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Zap,
  DollarSign,
  Activity,
  Code,
  FileText,
  TestTube,
  Shield,
  RefreshCw,
} from "lucide-react";

// Placeholder data - will be replaced with Prisma queries
const aiTasks = [
  {
    id: "1",
    projectId: "1",
    projectName: "FinanceTracker Pro",
    phaseNumber: 4,
    phaseName: "API Development",
    taskType: "code_generation",
    title: "Generate REST API endpoints",
    prompt: "Generate Express.js REST API endpoints for user account management including CRUD operations...",
    model: "opus",
    status: "completed",
    tokensInput: 2847,
    tokensOutput: 8234,
    costUsd: 0.42,
    durationMs: 45200,
    createdAt: "2026-01-16T14:30:00Z",
    completedAt: "2026-01-16T14:30:45Z",
  },
  {
    id: "2",
    projectId: "2",
    projectName: "HealthSync Mobile",
    phaseNumber: 5,
    phaseName: "TDD Implementation",
    taskType: "test_generation",
    title: "Generate unit tests for appointment service",
    prompt: "Generate comprehensive Jest unit tests for the AppointmentService class...",
    model: "sonnet",
    status: "processing",
    tokensInput: 1523,
    tokensOutput: 0,
    costUsd: 0,
    durationMs: 0,
    createdAt: "2026-01-16T15:45:00Z",
    completedAt: null,
  },
  {
    id: "3",
    projectId: "1",
    projectName: "FinanceTracker Pro",
    phaseNumber: 3,
    phaseName: "Data Model",
    taskType: "documentation",
    title: "Generate database documentation",
    prompt: "Generate comprehensive documentation for the database schema including entity descriptions...",
    model: "haiku",
    status: "completed",
    tokensInput: 892,
    tokensOutput: 3421,
    costUsd: 0.08,
    durationMs: 12300,
    createdAt: "2026-01-16T10:15:00Z",
    completedAt: "2026-01-16T10:15:12Z",
  },
  {
    id: "4",
    projectId: "3",
    projectName: "EduLearn Platform",
    phaseNumber: 1,
    phaseName: "Discovery",
    taskType: "validation",
    title: "Validate requirements document",
    prompt: "Analyze the requirements document for completeness, consistency, and potential issues...",
    model: "opus",
    status: "failed",
    tokensInput: 4521,
    tokensOutput: 0,
    costUsd: 0.12,
    durationMs: 8500,
    errorMessage: "Context length exceeded. Please reduce the input document size.",
    createdAt: "2026-01-16T09:00:00Z",
    completedAt: "2026-01-16T09:00:08Z",
  },
  {
    id: "5",
    projectId: "4",
    projectName: "RetailHub Dashboard",
    phaseNumber: 6,
    phaseName: "UI Development",
    taskType: "code_generation",
    title: "Generate React dashboard components",
    prompt: "Generate React components for the inventory dashboard including charts and tables...",
    model: "sonnet",
    status: "pending",
    tokensInput: 0,
    tokensOutput: 0,
    costUsd: 0,
    durationMs: 0,
    createdAt: "2026-01-16T16:00:00Z",
    completedAt: null,
  },
];

// Calculate stats
const stats = {
  totalTasks: aiTasks.length,
  completed: aiTasks.filter((t) => t.status === "completed").length,
  processing: aiTasks.filter((t) => t.status === "processing").length,
  pending: aiTasks.filter((t) => t.status === "pending").length,
  failed: aiTasks.filter((t) => t.status === "failed").length,
  totalCost: aiTasks.reduce((sum, t) => sum + t.costUsd, 0),
  totalTokensIn: aiTasks.reduce((sum, t) => sum + t.tokensInput, 0),
  totalTokensOut: aiTasks.reduce((sum, t) => sum + t.tokensOutput, 0),
  modelUsage: {
    opus: aiTasks.filter((t) => t.model === "opus").length,
    sonnet: aiTasks.filter((t) => t.model === "sonnet").length,
    haiku: aiTasks.filter((t) => t.model === "haiku").length,
  },
};

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
    case "processing":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "completed":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "failed":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

function getModelColor(model: string) {
  switch (model) {
    case "opus":
      return "bg-violet-500/10 text-violet-600 border-violet-500/20";
    case "sonnet":
      return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
    case "haiku":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

function getTaskTypeIcon(type: string) {
  switch (type) {
    case "code_generation":
      return <Code className="h-4 w-4" />;
    case "test_generation":
      return <TestTube className="h-4 w-4" />;
    case "documentation":
      return <FileText className="h-4 w-4" />;
    case "validation":
      return <Shield className="h-4 w-4" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
}

function getTaskTypeLabel(type: string) {
  switch (type) {
    case "code_generation":
      return "Code Generation";
    case "test_generation":
      return "Test Generation";
    case "documentation":
      return "Documentation";
    case "validation":
      return "Validation";
    default:
      return type;
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-zinc-500" />;
    case "processing":
      return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-rose-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

function formatDuration(ms: number) {
  if (ms === 0) return "-";
  if (ms < 1000) return `${ms}ms`;
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function formatTokens(tokens: number) {
  if (tokens === 0) return "-";
  if (tokens < 1000) return tokens.toString();
  return `${(tokens / 1000).toFixed(1)}k`;
}

function AITaskCard({ task }: { task: (typeof aiTasks)[0] }) {
  return (
    <Card className={task.status === "processing" ? "border-blue-500/50" : ""}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            {task.status === "processing" ? (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            ) : (
              getTaskTypeIcon(task.taskType)
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/dashboard/projects/${task.projectId}`}
                    className="hover:underline"
                  >
                    {task.projectName}
                  </Link>
                  {" "} • Phase {task.phaseNumber}: {task.phaseName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getModelColor(task.model)}>
                  {task.model}
                </Badge>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  <span className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    {task.status}
                  </span>
                </Badge>
              </div>
            </div>

            {/* Prompt preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {task.prompt}
            </p>

            {/* Error message */}
            {task.errorMessage && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-sm text-rose-600">
                {task.errorMessage}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {formatTokens(task.tokensInput)} in / {formatTokens(task.tokensOutput)} out
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                ${task.costUsd.toFixed(2)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(task.durationMs)}
              </span>
              <span>
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AIMonitorPage() {
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all"
      ? aiTasks
      : aiTasks.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-foreground">AI Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Track AI task execution and costs
          </p>
        </div>
        <Button className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <Bot className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.totalTasks}</p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{stats.processing}</p>
                <p className="text-sm text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  {formatTokens(stats.totalTokensIn + stats.totalTokensOut)}
                </p>
                <p className="text-sm text-muted-foreground">Total Tokens</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">
                  ${stats.totalCost.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Total Cost</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Model Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Badge variant="outline" className={getModelColor("opus")}>
                    Opus
                  </Badge>
                </span>
                <span className="text-sm font-medium">{stats.modelUsage.opus}</span>
              </div>
              <Progress
                value={(stats.modelUsage.opus / stats.totalTasks) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Badge variant="outline" className={getModelColor("sonnet")}>
                    Sonnet
                  </Badge>
                </span>
                <span className="text-sm font-medium">{stats.modelUsage.sonnet}</span>
              </div>
              <Progress
                value={(stats.modelUsage.sonnet / stats.totalTasks) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Badge variant="outline" className={getModelColor("haiku")}>
                    Haiku
                  </Badge>
                </span>
                <span className="text-sm font-medium">{stats.modelUsage.haiku}</span>
              </div>
              <Progress
                value={(stats.modelUsage.haiku / stats.totalTasks) * 100}
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Task Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="code_generation">Code Generation</SelectItem>
                <SelectItem value="test_generation">Test Generation</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Models</SelectItem>
                <SelectItem value="opus">Opus</SelectItem>
                <SelectItem value="sonnet">Sonnet</SelectItem>
                <SelectItem value="haiku">Haiku</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="1">FinanceTracker Pro</SelectItem>
                <SelectItem value="2">HealthSync Mobile</SelectItem>
                <SelectItem value="3">EduLearn Platform</SelectItem>
                <SelectItem value="4">RetailHub Dashboard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            All
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {stats.totalTasks}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processing" className="gap-2">
            Processing
            {stats.processing > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-blue-500/20">
                {stats.processing}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            Completed
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {stats.completed}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="failed" className="gap-2">
            Failed
            {stats.failed > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-rose-500/20">
                {stats.failed}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {aiTasks.map((task) => (
            <AITaskCard key={task.id} task={task} />
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {aiTasks.filter((t) => t.status === "processing").length > 0 ? (
            aiTasks
              .filter((t) => t.status === "processing")
              .map((task) => <AITaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No tasks currently processing
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {aiTasks.filter((t) => t.status === "completed").length > 0 ? (
            aiTasks
              .filter((t) => t.status === "completed")
              .map((task) => <AITaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No completed tasks
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          {aiTasks.filter((t) => t.status === "failed").length > 0 ? (
            aiTasks
              .filter((t) => t.status === "failed")
              .map((task) => <AITaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No failed tasks
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
