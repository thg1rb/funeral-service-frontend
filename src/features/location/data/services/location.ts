import { getPartners } from "@/src/features/admin-partner/services/get-partners";
import { PartnerType } from "@/src/features/admin-partner/types/enum";

export const locationService = {
  init: () => {
    // Locations are now fetched from partners data, no separate initialization needed
  },

  getAll: () => {
    // Fetch only AVENUE type partners (venues) from the partners data
    return getPartners(PartnerType.AVENUE);
  },

  getById: (id: string) => {
    const venues = getPartners(PartnerType.AVENUE);
    return venues.find((venue) => venue.id === id);
  },

  // Note: update is handled by the partner service in admin/partners
  update: (updatedItems: any[]): void => {
    // This is now handled by the partner service
  },
};
