import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  // If user is logged in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  // Otherwise show landing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-semibold">MVP Manager</span>
              <span className="ml-2 text-sm text-muted-foreground">
                by StartupVision
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </header>

        {/* Hero */}
        <main className="mt-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Part of the StartupVision Platform
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-light tracking-tight md:text-6xl">
            Track your MVP from{" "}
            <span className="font-semibold text-gradient">idea to launch</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Multi-tenant project management with AI loops, human engineering
            oversight, and client approval workflows. See exactly where your
            project stands at every phase.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Start Tracking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://startupvision.net" target="_blank">
              <Button variant="outline" size="lg">
                Learn about StartupVision
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <h3 className="mt-4 font-semibold">8-Phase Workflow</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From Discovery to Launch, track progress through every
                development phase with clear milestones.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <h3 className="mt-4 font-semibold">AI Task Monitoring</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track Claude AI usage, costs, and outputs. See exactly how AI
                accelerates your development.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <span className="text-lg">✅</span>
              </div>
              <h3 className="mt-4 font-semibold">Client Approvals</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built-in approval workflows keep clients in the loop and
                projects moving forward.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-24 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} StartupVision. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
