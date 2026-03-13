"use client";

import Link from "next/link";
import { Check, Pencil, Star } from "lucide-react";
import { cn } from "@/src/utils/utils";
import { Button } from "antd";
import type { ResolvedPackage } from "@/src/features/package/types/package";
import { CATEGORY_LABELS } from "@/src/features/customize/types/customize";
import { formatPrice } from "@/src/utils/format";
import { useRouter } from "next/navigation";

interface PackageCardProps {
  pkg: ResolvedPackage;
  isAdmin?: boolean
}

const tierStyles = {
  basic: {
    border: "border-border",
    badge: "bg-muted text-muted-foreground",
    label: "พื้นฐาน",
  },
  standard: {
    border: "border-primary/40",
    badge: "bg-primary/10 text-primary",
    label: "แนะนำ",
  },
  premium: {
    border: "border-primary",
    badge: "bg-primary text-primary-foreground",
    label: "พรีเมียม",
  },
};

export function PackageCard({ pkg, isAdmin }: PackageCardProps) {
  const style = tierStyles[pkg.tier];
  const isHighlighted = pkg.tier === "standard";
  const router = useRouter()

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border-2 bg-card p-6",
        style.border,
        isHighlighted && "shadow-lg ring-1 ring-primary/20",
      )}
    >
      {isHighlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full btn-gold px-3 py-1 text-xs font-medium">
            <Star className="h-3 w-3" />
            {style.label}
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold text-foreground">
          {formatPrice(pkg.price)}
        </span>
      </div>

      <div className="mb-6 flex-1">
        <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          รายการที่รวมอยู่
        </p>
        <ul className="flex flex-col gap-2">
          {pkg.items.map((item) => (
            <li key={item.id} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  ({CATEGORY_LABELS[item.category]})
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isAdmin === undefined ?
        <div className="flex flex-col gap-2">
          <Link href={`/extra-services?package=${pkg.id}`}>
            <Button className="w-full">เลือกแพ็คเกจนี้</Button>
          </Link>
          <Link href={`/customize?package=${pkg.id}`}>
            <Button className="w-full">ปรับแต่งแพ็คเกจ</Button>
          </Link>
        </div>
        :
        <Button type="text" className="border! border-gray-500!"
          onClick={() => {
            router.push(`package/${pkg.id}`)
          }}>
          <Pencil size={18} />
          แก้ไข
        </Button>

      }
    </div>
  );
}
