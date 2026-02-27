import { StepIndicator } from "@/src/components/step-indication";
import { DatePicker } from "./components/date-picker";

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={4} />
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            เลือกวันจัดงาน
          </h1>
          <p className="mt-3 text-muted-foreground">
            เลือกวันที่ต้องการจัดงาน ระบบจะแสดงวันที่ว่างให้คุณ
          </p>
        </div>
        {/* TODO: Implement Date-Picker */}
        <DatePicker />
      </div>
    </main>
  );
}
