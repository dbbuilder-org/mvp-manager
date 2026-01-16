export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  GitBranch,
  User,
  Calendar,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";

// Placeholder data - will be replaced with Prisma queries
const reviewsData: Record<string, {
  id: string;
  projectId: string;
  projectName: string;
  phaseId: string;
  phaseNumber: number;
  phaseName: string;
  reviewType: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToEmail: string;
  status: string;
  decision?: string;
  feedback?: string;
  decidedBy?: string;
  decidedAt?: string;
  dueDate: string;
  createdAt: string;
  client: string;
  clientEmail: string;
  artifacts: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
  checklist: Array<{
    id: string;
    label: string;
    required: boolean;
  }>;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    createdAt: string;
  }>;
}> = {
  "1": {
    id: "1",
    projectId: "1",
    projectName: "FinanceTracker Pro",
    phaseId: "p3",
    phaseNumber: 3,
    phaseName: "Data Model",
    reviewType: "phase_checkpoint",
    title: "Data Model Review",
    description: "Review database schema design and entity relationships for the finance tracking module. This includes the core entities for accounts, transactions, budgets, and investment portfolios.",
    assignedTo: "Alex Johnson",
    assignedToEmail: "alex@startupvision.net",
    status: "pending",
    dueDate: "2026-01-18",
    createdAt: "2026-01-15",
    client: "TechCorp Inc",
    clientEmail: "contact@techcorp.com",
    artifacts: [
      { id: "a1", name: "Database Schema Diagram", type: "pdf", url: "#" },
      { id: "a2", name: "Entity Relationship Document", type: "docx", url: "#" },
      { id: "a3", name: "Migration Scripts", type: "sql", url: "#" },
    ],
    checklist: [
      { id: "c1", label: "Schema follows naming conventions", required: true },
      { id: "c2", label: "All relationships properly defined", required: true },
      { id: "c3", label: "Indexes optimized for common queries", required: true },
      { id: "c4", label: "Data types appropriate for all fields", required: true },
      { id: "c5", label: "Soft delete implemented where needed", required: false },
      { id: "c6", label: "Audit fields included (created_at, updated_at)", required: true },
    ],
    comments: [
      {
        id: "m1",
        author: "Alex Johnson",
        content: "I've added support for multi-currency transactions as discussed. Please review the new Currency table and the exchange_rate fields.",
        createdAt: "2026-01-15T10:30:00Z",
      },
      {
        id: "m2",
        author: "System",
        content: "Review assigned to Alex Johnson",
        createdAt: "2026-01-15T09:00:00Z",
      },
    ],
  },
  "2": {
    id: "2",
    projectId: "2",
    projectName: "HealthSync Mobile",
    phaseId: "p6",
    phaseNumber: 6,
    phaseName: "UI Development",
    reviewType: "code_review",
    title: "Patient Dashboard Components",
    description: "Review React Native components for patient dashboard including appointment scheduling, messaging with providers, and prescription management.",
    assignedTo: "Sarah Chen",
    assignedToEmail: "sarah@startupvision.net",
    status: "in_review",
    dueDate: "2026-01-17",
    createdAt: "2026-01-14",
    client: "MedStart Labs",
    clientEmail: "hello@medstart.io",
    artifacts: [
      { id: "a1", name: "Component Screenshots", type: "png", url: "#" },
      { id: "a2", name: "Storybook Preview", type: "link", url: "#" },
      { id: "a3", name: "Pull Request #42", type: "github", url: "#" },
    ],
    checklist: [
      { id: "c1", label: "Components follow design system", required: true },
      { id: "c2", label: "Accessibility requirements met (WCAG 2.1)", required: true },
      { id: "c3", label: "Error states handled gracefully", required: true },
      { id: "c4", label: "Loading states implemented", required: true },
      { id: "c5", label: "Responsive across device sizes", required: true },
      { id: "c6", label: "Unit tests written", required: false },
    ],
    comments: [
      {
        id: "m1",
        author: "Sarah Chen",
        content: "Ready for review. I've addressed the previous feedback about the appointment time picker UX.",
        createdAt: "2026-01-14T14:20:00Z",
      },
    ],
  },
};

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "in_review":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    case "approved":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "rejected":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
  }
}

function getReviewTypeIcon(type: string) {
  switch (type) {
    case "phase_checkpoint":
      return <CheckCircle2 className="h-5 w-5" />;
    case "code_review":
      return <GitBranch className="h-5 w-5" />;
    case "client_signoff":
      return <User className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
}

function getReviewTypeLabel(type: string) {
  switch (type) {
    case "phase_checkpoint":
      return "Phase Checkpoint";
    case "code_review":
      return "Code Review";
    case "client_signoff":
      return "Client Signoff";
    default:
      return type;
  }
}

function getArtifactIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="h-4 w-4 text-rose-500" />;
    case "docx":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "sql":
      return <FileText className="h-4 w-4 text-emerald-500" />;
    case "png":
    case "jpg":
      return <FileText className="h-4 w-4 text-violet-500" />;
    case "github":
      return <GitBranch className="h-4 w-4 text-zinc-500" />;
    case "link":
      return <ExternalLink className="h-4 w-4 text-cyan-500" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

export default async function ReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const review = reviewsData[id];

  if (!review) {
    notFound();
  }

  const isActionable = review.status === "pending" || review.status === "in_review";

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/dashboard/reviews"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Reviews
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
              {getReviewTypeIcon(review.reviewType)}
            </div>
            <div>
              <h1 className="text-2xl font-light">{review.title}</h1>
              <p className="text-muted-foreground">
                <Link href={`/dashboard/projects/${review.projectId}`} className="hover:underline">
                  {review.projectName}
                </Link>
                {" "} • Phase {review.phaseNumber}: {review.phaseName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getStatusColor(review.status)}>
            {review.status.replace("_", " ")}
          </Badge>
          <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/20">
            {getReviewTypeLabel(review.reviewType)}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.description}</p>
            </CardContent>
          </Card>

          {/* Artifacts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Artifacts to Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {review.artifacts.map((artifact) => (
                  <a
                    key={artifact.id}
                    href={artifact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    {getArtifactIcon(artifact.type)}
                    <span className="flex-1">{artifact.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Review Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {review.checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Checkbox id={item.id} disabled={!isActionable} />
                    <div className="flex-1">
                      <Label
                        htmlFor={item.id}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                      {item.required && (
                        <span className="text-xs text-rose-500 ml-2">Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Approval Form */}
          {isActionable && (
            <Card className="border-violet-500/20">
              <CardHeader>
                <CardTitle className="text-lg">Submit Review Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Provide feedback for this review..."
                    rows={4}
                  />
                </div>
                <Separator />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" className="flex-1 border-amber-500/50 text-amber-600 hover:bg-amber-500/10 gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Request Revision
                  </Button>
                  <Button variant="outline" className="flex-1 border-rose-500/50 text-rose-600 hover:bg-rose-500/10 gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {review.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-2">
                  <Textarea placeholder="Add a comment..." rows={2} />
                  <Button size="sm">Post Comment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Assigned To</span>
                <span className="text-sm font-medium">{review.assignedTo}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Client</span>
                <span className="text-sm">{review.client}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <span className="text-sm flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(review.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="text-sm">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Project Link */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/dashboard/projects/${review.projectId}`}>
                <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                  <h3 className="font-medium">{review.projectName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Phase {review.phaseNumber}: {review.phaseName}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {review.client}
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href={`mailto:${review.assignedToEmail}`}>
                  <User className="h-4 w-4" />
                  Contact Assignee
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a href={`mailto:${review.clientEmail}`}>
                  <User className="h-4 w-4" />
                  Contact Client
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="h-4 w-4" />
                Extend Due Date
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
