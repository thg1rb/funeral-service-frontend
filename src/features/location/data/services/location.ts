import type { FuneralVenue } from "@/src/features/location/types/location";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_LOCATIONS } from "../locations";

const KEY = "funeral_venues";

export const locationService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_LOCATIONS);
    }
  },

  getAll: () => {
    const locations = storageService.get(KEY, INITIAL_LOCATIONS);
    return locations;
  },

  getById: (id: string) => {
    const locations = storageService.get(KEY, INITIAL_LOCATIONS);
    return locations.find((location) => location.id === id);
  },

  update: (updatedItems: FuneralVenue[]): void =>
    storageService.set(KEY, updatedItems),
};
