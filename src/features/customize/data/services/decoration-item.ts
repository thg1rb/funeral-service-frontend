import type { DecorationItem } from "@/src/types/types";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_DECORATION_ITEMS } from "../decoration-items";

const KEY = "funeral_decoration_items";

export const decorationItemService = {
  init: () => {
    const existing = storageService.get(KEY, INITIAL_DECORATION_ITEMS);
    if (existing === INITIAL_DECORATION_ITEMS) {
      storageService.set(KEY, INITIAL_DECORATION_ITEMS);
    }
  },

  getAll: (): DecorationItem[] =>
    storageService.get(KEY, INITIAL_DECORATION_ITEMS),

  getById: (id: string): DecorationItem | undefined => {
    const items = storageService.get(KEY, INITIAL_DECORATION_ITEMS);
    return items.find((item) => item.id === id);
  },

  getByIds: (ids: string[]): DecorationItem[] => {
    const items = storageService.get(KEY, INITIAL_DECORATION_ITEMS);
    return items.filter((item) => ids.includes(item.id));
  },

  getByCategory: (category: string): DecorationItem[] => {
    const items = storageService.get(KEY, INITIAL_DECORATION_ITEMS);
    return items.filter((item) => item.category === category);
  },

  update: (updatedItems: DecorationItem[]): void =>
    storageService.set(KEY, updatedItems),
};
