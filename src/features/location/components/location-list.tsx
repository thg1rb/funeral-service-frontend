"use client";

import { useState, useEffect } from "react";
import { VenueCard } from "./venue-card";
import { useOrder } from "@/src/hooks/order-context";
import { locationService } from "@/src/features/location/data/services/location";

export function LocationList() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const { setVenue } = useOrder();

  // Initialize location service
  useEffect(() => {
    locationService.init();
  }, []);

  // Save selected venue to order context
  useEffect(() => {
    if (selectedVenueId) {
      const venue = locationService.getById(selectedVenueId);
      if (venue) {
        setVenue(venue);
      }
    }
  }, [selectedVenueId, setVenue]);

  const sortedVenues = [...locationService.getAll()].sort(
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
