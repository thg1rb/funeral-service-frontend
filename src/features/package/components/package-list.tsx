"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PackageCard } from "./package-card";
import { FuneralType } from "@/src/types/types";
import { funeralPackages } from "@/src/data/mock-data";

export function PackageList() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as FuneralType | null;
  const [activeType, setActiveType] = useState<FuneralType>(
    typeParam ?? "human",
  );

  const filtered = funeralPackages.filter(
    (pkg) => pkg.funeralType === activeType,
  );

  return (
    <div className="mt-10">
      {/* Package cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
