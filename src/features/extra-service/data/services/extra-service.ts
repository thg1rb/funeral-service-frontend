import type { ExtraService } from "@/src/features/extra-service/types/extra-service";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_EXTRA_SERVICES } from "../extra-services";

const KEY = "funeral_extra_services";

export const extraService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_EXTRA_SERVICES);
    }
  },

  getAll: () => {
    const services = storageService.get(KEY, INITIAL_EXTRA_SERVICES);
    return services;
  },

  getById: (id: string) => {
    const services = storageService.get(KEY, INITIAL_EXTRA_SERVICES);
    return services.find((service) => service.id === id);
  },

  getByFuneralType: (funeralType: string) => {
    const services = storageService.get(KEY, INITIAL_EXTRA_SERVICES);
    return services.filter(
      (service) => service.funeralType === funeralType || service.funeralType === "both"
    );
  },

  update: (updatedItems: ExtraService[]): void => storageService.set(KEY, updatedItems),
};
