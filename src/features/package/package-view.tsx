import { Suspense } from "react";
import { PackageList } from "./components/package-list";
import { StepIndicator } from "@/src/components/step-indication";

export default function PackagesPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={1} />
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            เลือกแพ็คเกจ
          </h1>
          <p className="mt-3 text-muted-foreground">
            เลือกแพ็คเกจที่เหมาะสม หรือปรับแต่งได้ตามต้องการ
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mt-10 text-center text-muted-foreground">
              กำลังโหลด...
            </div>
          }
        >
          <PackageList />
        </Suspense>
      </div>
    </main>
  );
}
