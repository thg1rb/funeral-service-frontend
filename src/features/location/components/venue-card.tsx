"use client";

import { cn } from "@/src/utils/utils";
import { Button } from "antd";
import { MapPin, Users, Phone, Navigation } from "lucide-react";
import Link from "next/link";
import { Partner } from "../../admin-partner/types/partner";

interface VenueCardProps {
  venue: Partner;
  distance: number; // รับค่าระยะทางจาก Props
  isSelected: boolean;
  onSelect: () => void;
}

export function VenueCard({ venue, distance, isSelected, onSelect }: VenueCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 bg-card p-5 transition-all flex flex-col h-full",
        isSelected
          ? "border-primary shadow-md ring-1 ring-primary/20"
          : "border-border hover:border-primary/40",
      )}
    >
      <div className="mb-3 flex h-32 items-center justify-center rounded-md bg-muted transition-colors">
        <MapPin className={cn(
          "h-8 w-8 transition-colors",
          isSelected ? "text-primary" : "text-muted-foreground/30"
        )} />
      </div>

      <h3 className="text-base font-semibold text-foreground line-clamp-1">
        {venue.name}
      </h3>

      <div className="mt-3 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className="h-4 w-4 shrink-0" />
          <span>
            ห่าง {distance} กม.
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" />
          <span>รองรับ {venue.capacity ?? 0} คน</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0" />
          <span>{venue.ownerTel}</span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {venue.address}
        </p>
      </div>

      <div className="mt-5 flex gap-2">
        {
          !isSelected && (
            <Button
              type={isSelected ? "primary" : "default"}
              onClick={onSelect}
              className="flex-1"
            >
              {isSelected ? "ยกเลิก" : "เลือกสถานที่นี้"}
            </Button>

          )
        }

        {isSelected && (
          <Link href={`/schedule?venue=${venue.id}`} passHref className="flex-1">
            <Button type="primary" className="btn-gold border-none w-full">
              เลือกวัน
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}