import { StepIndicator } from "@/src/components/step-indication";
import { Suspense } from "react";
import { CustomBuilder } from "./components/custom-builder";

export default function CustomizePage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={2} />
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            ออกแบบแพ็คเกจเอง
          </h1>
          <p className="mt-3 text-muted-foreground">
            เลือกของตกแต่งและอุปกรณ์ทีละรายการ ปรับแต่งได้ตามต้องการ
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mt-10 text-center text-muted-foreground">
              กำลังโหลด...
            </div>
          }
        >
          <CustomBuilder />
        </Suspense>
      </div>
    </main>
  );
}
