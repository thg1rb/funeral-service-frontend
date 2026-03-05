import type { FuneralPackage } from "@/src/types/types";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_FUNERAL_PACKAGES } from "../package-items";

const KEY = "funeral_packages";

export const packageService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_FUNERAL_PACKAGES);
    }
  },

  getAll: (): FuneralPackage[] =>
    storageService.get(KEY, INITIAL_FUNERAL_PACKAGES),

  getById: (id: string): FuneralPackage | undefined => {
    const items = storageService.get(KEY, INITIAL_FUNERAL_PACKAGES);
    return items.find((item) => item.id === id);
  },

  getByFuneralType: (funeralType: string): FuneralPackage[] => {
    const items = storageService.get(KEY, INITIAL_FUNERAL_PACKAGES);
    return items.filter((item) => item.funeralType === funeralType);
  },

  update: (updatedItems: FuneralPackage[]): void =>
    storageService.set(KEY, updatedItems),
};
