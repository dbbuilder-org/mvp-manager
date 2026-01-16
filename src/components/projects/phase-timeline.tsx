"use client";

import { cn } from "@/lib/utils";
import { Check, Circle, Clock, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Phase {
  id: string;
  phaseNumber: number;
  phaseName: string;
  status: "pending" | "in_progress" | "pending_review" | "approved";
  startedAt?: string;
  completedAt?: string;
  notes?: string;
}

interface PhaseTimelineProps {
  phases: Phase[];
  currentPhase: number;
  onPhaseClick?: (phase: Phase) => void;
}

const phaseDescriptions: Record<number, string> = {
  1: "Gather requirements, understand goals, define scope",
  2: "Design system architecture and technical approach",
  3: "Define database schema and data relationships",
  4: "Build REST/GraphQL APIs and backend logic",
  5: "Write tests and implement test-driven development",
  6: "Build user interface and frontend components",
  7: "QA testing, bug fixes, and deployment setup",
  8: "Final polish, performance optimization, and launch",
};

function getPhaseIcon(status: string, isCurrentPhase: boolean) {
  if (status === "approved") {
    return <Check className="h-4 w-4" />;
  }
  if (status === "pending_review") {
    return <AlertCircle className="h-4 w-4" />;
  }
  if (status === "in_progress" || isCurrentPhase) {
    return <Clock className="h-4 w-4" />;
  }
  return <Circle className="h-4 w-4" />;
}

function getPhaseColor(status: string, isCurrentPhase: boolean) {
  if (status === "approved") {
    return "bg-emerald-500 text-white border-emerald-500";
  }
  if (status === "pending_review") {
    return "bg-amber-500 text-white border-amber-500";
  }
  if (status === "in_progress" || isCurrentPhase) {
    return "bg-violet-500 text-white border-violet-500";
  }
  return "bg-background text-muted-foreground border-border";
}

function getLineColor(status: string) {
  if (status === "approved") {
    return "bg-emerald-500";
  }
  return "bg-border";
}

export function PhaseTimeline({
  phases,
  currentPhase,
  onPhaseClick,
}: PhaseTimelineProps) {
  return (
    <TooltipProvider>
      <div className="relative">
        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          {/* Connection Lines */}
          <div className="absolute top-6 left-0 right-0 flex justify-between px-[calc(100%/16)]">
            {phases.slice(0, -1).map((phase, index) => (
              <div
                key={`line-${index}`}
                className={cn(
                  "h-0.5 flex-1 mx-1",
                  getLineColor(phase.status)
                )}
              />
            ))}
          </div>

          {/* Phase Nodes */}
          <div className="relative flex justify-between">
            {phases.map((phase) => {
              const isCurrentPhase = phase.phaseNumber === currentPhase;
              return (
                <Tooltip key={phase.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onPhaseClick?.(phase)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div
                        className={cn(
                          "h-12 w-12 rounded-full border-2 flex items-center justify-center transition-all",
                          getPhaseColor(phase.status, isCurrentPhase),
                          isCurrentPhase && "ring-4 ring-violet-500/20",
                          "group-hover:scale-110"
                        )}
                      >
                        {getPhaseIcon(phase.status, isCurrentPhase)}
                      </div>
                      <div className="text-center">
                        <div
                          className={cn(
                            "text-xs font-medium",
                            isCurrentPhase
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          Phase {phase.phaseNumber}
                        </div>
                        <div
                          className={cn(
                            "text-xs",
                            isCurrentPhase
                              ? "text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {phase.phaseName.split(" ")[0]}
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <div className="space-y-1">
                      <div className="font-medium">{phase.phaseName}</div>
                      <div className="text-xs text-muted-foreground">
                        {phaseDescriptions[phase.phaseNumber]}
                      </div>
                      <div className="text-xs capitalize">
                        Status: {phase.status.replace("_", " ")}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline (Vertical) */}
        <div className="lg:hidden space-y-4">
          {phases.map((phase, index) => {
            const isCurrentPhase = phase.phaseNumber === currentPhase;
            return (
              <div key={phase.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      getPhaseColor(phase.status, isCurrentPhase),
                      isCurrentPhase && "ring-4 ring-violet-500/20"
                    )}
                  >
                    {getPhaseIcon(phase.status, isCurrentPhase)}
                  </div>
                  {index < phases.length - 1 && (
                    <div
                      className={cn(
                        "w-0.5 flex-1 my-2",
                        getLineColor(phase.status)
                      )}
                    />
                  )}
                </div>
                <button
                  onClick={() => onPhaseClick?.(phase)}
                  className="flex-1 text-left pb-4"
                >
                  <div
                    className={cn(
                      "font-medium",
                      isCurrentPhase ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    Phase {phase.phaseNumber}: {phase.phaseName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {phaseDescriptions[phase.phaseNumber]}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 capitalize">
                    {phase.status.replace("_", " ")}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
