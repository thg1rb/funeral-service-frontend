import { storageService } from "@/src/data/services/storageService";
import { INITIAL_LOCATIONS } from "../locations";
import { Partner } from "@/src/features/admin-partner/types/partner";

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

  update: (updatedItems: Partner[]): void =>
    storageService.set(KEY, updatedItems),
};
