"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PackageCard } from "./package-card";
import { FuneralType } from "@/src/types/types";
import { packageService } from "../data/services/package";

export function PackageList() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as FuneralType | null;
  const [activeType, setActiveType] = useState<FuneralType>(
    typeParam ?? "human",
  );

  useEffect(() => {
    packageService.init();
  }, []);

  const filtered = packageService.getByFuneralType(activeType);

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
