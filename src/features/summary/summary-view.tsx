import { StepIndicator } from "@/src/components/step-indication";
import { Suspense } from "react";
import { OrderSummary } from "./components/order-summary";

export default function SummaryPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={6} />
      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            สรุปรายการและราคา
          </h1>
          <p className="mt-3 text-muted-foreground">
            ตรวจสอบรายละเอียดทั้งหมดก่อนชำระเงิน
          </p>
        </div>
        <Suspense
          fallback={
            <div className="mt-10 text-center text-muted-foreground">
              กำลังโหลด...
            </div>
          }
        >
          <OrderSummary />
        </Suspense>
      </div>
    </main>
  );
}
