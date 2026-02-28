import { StepIndicator } from "@/src/components/step-indication";
import { Completed } from "./components/completed";

export default function CompletedPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={7} />
      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <Completed />
      </div>
    </main>
  );
}
