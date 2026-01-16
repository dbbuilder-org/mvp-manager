import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  GitBranch,
  User,
} from "lucide-react";

// Placeholder data - will be replaced with Prisma queries
const reviews = [
  {
    id: "1",
    projectId: "1",
    projectName: "FinanceTracker Pro",
    phaseNumber: 3,
    phaseName: "Data Model",
    reviewType: "phase_checkpoint",
    title: "Data Model Review",
    description: "Review database schema design and entity relationships for the finance tracking module.",
    assignedTo: "Alex Johnson",
    status: "pending",
    dueDate: "2026-01-18",
    createdAt: "2026-01-15",
    client: "TechCorp Inc",
  },
  {
    id: "2",
    projectId: "2",
    projectName: "HealthSync Mobile",
    phaseNumber: 6,
    phaseName: "UI Development",
    reviewType: "code_review",
    title: "Patient Dashboard Components",
    description: "Review React Native components for patient dashboard including appointment scheduling and messaging.",
    assignedTo: "Sarah Chen",
    status: "in_review",
    dueDate: "2026-01-17",
    createdAt: "2026-01-14",
    client: "MedStart Labs",
  },
  {
    id: "3",
    projectId: "1",
    projectName: "FinanceTracker Pro",
    phaseNumber: 4,
    phaseName: "API Development",
    reviewType: "client_signoff",
    title: "API Endpoints Approval",
    description: "Client approval needed for the REST API design and endpoint structure.",
    assignedTo: "Client",
    status: "pending",
    dueDate: "2026-01-20",
    createdAt: "2026-01-16",
    client: "TechCorp Inc",
  },
  {
    id: "4",
    projectId: "3",
    projectName: "EduLearn Platform",
    phaseNumber: 1,
    phaseName: "Discovery & Requirements",
    reviewType: "phase_checkpoint",
    title: "Requirements Document Review",
    description: "Review and approve the initial requirements document and project scope.",
    assignedTo: "Mike Rivera",
    status: "approved",
    decision: "approved",
    feedback: "Requirements are comprehensive and well-documented. Approved for architecture phase.",
    decidedAt: "2026-01-12",
    dueDate: "2026-01-12",
    createdAt: "2026-01-10",
    client: "Learning Co",
  },
  {
    id: "5",
    projectId: "4",
    projectName: "RetailHub Dashboard",
    phaseNumber: 5,
    phaseName: "TDD Implementation",
    reviewType: "code_review",
    title: "Unit Test Coverage Review",
    description: "Review test coverage for inventory management module. Target: 80% coverage.",
    assignedTo: "Alex Johnson",
    status: "rejected",
    decision: "revise",
    feedback: "Test coverage at 65%. Need additional tests for edge cases in inventory calculations.",
    decidedAt: "2026-01-13",
    dueDate: "2026-01-13",
    createdAt: "2026-01-11",
    client: "ShopRight Inc",
  },
];

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
      return <CheckCircle2 className="h-4 w-4" />;
    case "code_review":
      return <GitBranch className="h-4 w-4" />;
    case "client_signoff":
      return <User className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
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

function getStatusIcon(status: string) {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "in_review":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case "approved":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-rose-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const isActionable = review.status === "pending" || review.status === "in_review";

  return (
    <Link href={`/dashboard/reviews/${review.id}`}>
      <Card className={`hover:border-primary/50 transition-colors cursor-pointer ${isActionable ? "border-l-4 border-l-violet-500" : ""}`}>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-3">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  {getReviewTypeIcon(review.reviewType)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{review.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.projectName} • Phase {review.phaseNumber}: {review.phaseName}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {review.description}
              </p>

              {/* Feedback (if decided) */}
              {review.feedback && (
                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <span className="font-medium">Feedback: </span>
                  {review.feedback}
                </div>
              )}

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {review.assignedTo}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due {new Date(review.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>{review.client}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col items-end gap-2">
              <Badge variant="outline" className={getStatusColor(review.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(review.status)}
                  {review.status.replace("_", " ")}
                </span>
              </Badge>
              <Badge variant="outline" className="bg-zinc-500/10 text-zinc-600 border-zinc-500/20">
                {getReviewTypeLabel(review.reviewType)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ReviewsPage() {
  const pendingReviews = reviews.filter(r => r.status === "pending" || r.status === "in_review");
  const completedReviews = reviews.filter(r => r.status === "approved" || r.status === "rejected");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-foreground">Reviews</h1>
          <p className="text-muted-foreground mt-1">
            Manage approvals and review requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1">
            {pendingReviews.length} pending
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{reviews.filter(r => r.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{reviews.filter(r => r.status === "in_review").length}</p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{reviews.filter(r => r.status === "approved").length}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{reviews.filter(r => r.status === "rejected").length}</p>
                <p className="text-sm text-muted-foreground">Needs Revision</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Review Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="phase_checkpoint">Phase Checkpoint</SelectItem>
                <SelectItem value="code_review">Code Review</SelectItem>
                <SelectItem value="client_signoff">Client Signoff</SelectItem>
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

      {/* Reviews List */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            Pending
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {pendingReviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            Completed
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {completedReviews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all">All Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingReviews.length > 0 ? (
            pendingReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No pending reviews
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedReviews.length > 0 ? (
            completedReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No completed reviews
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
