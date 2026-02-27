"use client";

import { useState } from "react";
import { VenueCard } from "./venue-card";
import { funeralVenues } from "@/src/data/mock-data";

export function LocationList() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const sortedVenues = [...funeralVenues].sort(
    (a, b) => a.distance - b.distance,
  );

  return (
    <div className="mt-10">
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            isSelected={selectedVenueId === venue.id}
            onSelect={() => setSelectedVenueId(venue.id)}
          />
        ))}
      </div>
    </div>
  );
}
