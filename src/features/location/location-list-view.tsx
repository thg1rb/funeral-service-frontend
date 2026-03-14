"use client";

import { StepIndicator } from "@/src/components/step-indication";
import { LocationList } from "./components/location-list";

export default function LocationListPage() {
  return (
    <main className="min-h-screen">
      <StepIndicator currentStep={3} />
      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            เลือกสถานที่จัดงาน
          </h1>
          <p className="mt-3 text-muted-foreground">
            ค้นหาวัดและสถานที่จัดงานใกล้บ้านคุณ
          </p>
        </div>
        <LocationList />
      </div>
    </main>
  );
}
