import { Check } from "lucide-react";
import { cn } from "../utils/utils";

interface Step {
  label: string;
  href: string;
}

const steps: Step[] = [
  { label: "เลือกประเภท", href: "/" },
  { label: "เลือกแพ็คเกจ", href: "/packages" },
  { label: "ปรับแต่ง", href: "/customize" },
  { label: "สรุปราคา", href: "/summary" },
  { label: "เลือกสถานที่", href: "/locations" },
  { label: "เลือกวัน", href: "/schedule" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.href} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  index < currentStep
                    ? "btn-gold"
                    : index === currentStep
                      ? "btn-gold ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "hidden text-xs md:block",
                  index <= currentStep
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-1 h-px w-6 lg:w-12",
                  index < currentStep ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
