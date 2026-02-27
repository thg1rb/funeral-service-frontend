"use client";

import { FuneralVenue } from "@/src/types/types";
import { cn } from "@/src/utils/utils";
import { Button } from "antd";
import { MapPin, Users, Phone, Navigation } from "lucide-react";
import Link from "next/link";

interface VenueCardProps {
  venue: FuneralVenue;
  isSelected: boolean;
  onSelect: () => void;
}

export function VenueCard({ venue, isSelected, onSelect }: VenueCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 bg-card p-5 transition-all",
        isSelected
          ? "border-primary shadow-md"
          : "border-border hover:border-primary/40",
      )}
    >
      <div className="mb-3 flex h-32 items-center justify-center rounded-md bg-muted">
        <MapPin className="h-8 w-8 text-muted-foreground/50" />
      </div>

      <h3 className="text-base font-semibold text-foreground">{venue.name}</h3>

      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Navigation className="h-4 w-4 shrink-0" />
          <span>
            {"ห่าง "}
            {venue.distance}
            {" กม."}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" />
          <span>
            {"รองรับ "}
            {venue.capacity}
            {" คน"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0" />
          <span>{venue.contact}</span>
        </div>
        <p className="text-xs text-muted-foreground">{venue.address}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <Button onClick={onSelect} className="flex-1">
          {isSelected ? "เลือกแล้ว" : "เลือกสถานที่นี้"}
        </Button>
        {isSelected && (
          <Link href="/schedule">
            <Button>เลือกวัน</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
