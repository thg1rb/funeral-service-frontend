import { BlogPost } from "../../types/blog";
import { storageService } from "@/src/data/services/storageService";
import { INITIAL_BLOGS } from "../blogs";

const KEY = "funeral_blogs";

export const blogService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_BLOGS);
    }
  },

  getAll: (): BlogPost[] => storageService.get(KEY, []),

  getById: (id: string): BlogPost | undefined => {
    const items = storageService.get(KEY, INITIAL_BLOGS);
    return items.find((item) => item.id === id);
  },

  update: (updatedItems: BlogPost[]): void =>
    storageService.set(KEY, updatedItems),
};
