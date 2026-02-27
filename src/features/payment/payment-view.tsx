import { StepIndicator } from "@/src/components/step-indication";
import { PaymentOptions } from "./components/payment-options";

export default function PaymentPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={6} />
      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            ชำระเงิน
          </h1>
          <p className="mt-3 text-muted-foreground">
            เลือกวิธีการชำระเงินที่สะดวก
          </p>
        </div>
        <PaymentOptions />
      </div>
    </main>
  );
}
