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
  { label: "บริการเสริม", href: "/extra-services" },
  { label: "เลือกสถานที่", href: "/locations" },
  { label: "เลือกวัน", href: "/schedule" },
  { label: "สรุปราคา", href: "/summary" },
  { label: "ข้อมูลลูกค้า", href: "/customer" },
  { label: "ชำระค่าบริการ", href: "/payment" },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <>
      <MobileIndicator currentStep={currentStep} />
      <DesktopIndicator currentStep={currentStep} />
    </>
  );
}

// Desktop Indicator Component
function DesktopIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="hidden md:flex justify-center w-full py-8">
      <div className="flex items-start w-full max-w-6xl px-6">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.href}
              className={cn(
                "flex items-start",
                index !== steps.length - 1 ? "flex-1" : "flex-initial",
              )}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all",
                    isCompleted && "btn-gold",
                    isCurrent && "btn-gold ring-4 ring-primary/20",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>

                <span
                  className={cn(
                    "hidden lg:block mt-3 text-sm text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]",
                    isCurrent
                      ? "font-semibold text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="flex-1 h-[2px] mt-5 mx-3 bg-border relative min-w-[20px]">
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-full bg-primary transition-all duration-300",
                      isCompleted ? "w-full" : "w-0",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mobile Indicator Component
function MobileIndicator({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="md:hidden w-full px-4 py-4">
      {/* label */}
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">
          ขั้นตอน {currentStep + 1} จาก {steps.length}
        </span>

        <span className="text-muted-foreground">
          {steps[currentStep].label}
        </span>
      </div>

      {/* progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
