import { Suspense } from "react";
import { ExtraServicesSelector } from "./components/extra-service-selector";
import { StepIndicator } from "@/src/components/step-indication";

export default function ExtraServicesPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={2} />
      <div className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            บริการเสริม
          </h1>
          <p className="mt-3 text-muted-foreground">
            เพิ่มบริการพิเศษเพื่อให้งานสมบูรณ์แบบยิ่งขึ้น
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mt-10 text-center text-muted-foreground">
              กำลังโหลด...
            </div>
          }
        >
          <ExtraServicesSelector />
        </Suspense>
      </div>
    </main>
  );
}
