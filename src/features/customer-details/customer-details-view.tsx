import { StepIndicator } from "@/src/components/step-indication";
import { CustomerDetailsForm } from "./components/customer-details-form";

export default function CustomerDetailsPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={5} />
      <div className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            ข้อมูลลูกค้า
          </h1>
          <p className="mt-3 text-muted-foreground">
            กรอกข้อมูลสำหรับการติดต่อและจัดเตรียมพิธีกรรม
          </p>
        </div>
        <CustomerDetailsForm />
      </div>
    </main>
  );
}
