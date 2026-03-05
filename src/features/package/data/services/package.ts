import type { FuneralPackage, DecorationItem } from "@/src/types/types";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_FUNERAL_PACKAGES } from "../package-items";
import { INITIAL_DECORATION_ITEMS } from "@/src/features/customize/data/decoration-items";

const KEY = "funeral_packages";

// Helper function to resolve item references to full decoration items
const resolvePackageItems = (
  packageItems: typeof INITIAL_FUNERAL_PACKAGES[0]["items"],
): DecorationItem[] => {
  return packageItems.map((itemRef) => {
    const item = INITIAL_DECORATION_ITEMS.find((d) => d.id === itemRef.id);
    if (!item) {
      throw new Error(`Decoration item not found: ${itemRef.id}`);
    }
    return item;
  });
};

// Helper function to resolve full packages with decoration items
const resolvePackages = (
  packages: FuneralPackage[],
): Array<Omit<FuneralPackage, "items"> & { items: DecorationItem[] }> => {
  return packages.map((pkg) => ({
    ...pkg,
    items: resolvePackageItems(pkg.items),
  }));
};

export const packageService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_FUNERAL_PACKAGES);
    } else {
      // Check if the cached data uses old format with invalid item IDs
      const cached: FuneralPackage[] = JSON.parse(existing);
      const hasInvalidIds = cached.some((pkg) =>
        pkg.items.some((item) => !INITIAL_DECORATION_ITEMS.find((d) => d.id === item.id))
      );
      if (hasInvalidIds) {
        // Reset to new format
        storageService.set(KEY, INITIAL_FUNERAL_PACKAGES);
      }
    }
  },

  getAll: () => {
    const packages = storageService.get(KEY, INITIAL_FUNERAL_PACKAGES);
    return resolvePackages(packages);
  },

  getById: (id: string) => {
    const packages = storageService.get(KEY, INITIAL_FUNERAL_PACKAGES);
    const pkg = packages.find((item) => item.id === id);
    if (!pkg) return undefined;
    return {
      ...pkg,
      items: resolvePackageItems(pkg.items),
    };
  },

  getByFuneralType: (funeralType: string) => {
    const packages = storageService.get(KEY, INITIAL_FUNERAL_PACKAGES);
    return packages
      .filter((item) => item.funeralType === funeralType)
      .map((pkg) => ({
        ...pkg,
        items: resolvePackageItems(pkg.items),
      }));
  },

  update: (updatedItems: FuneralPackage[]): void =>
    storageService.set(KEY, updatedItems),
};
