import { storageService } from "@/src/data/services/storageService";
import { INITIAL_UNAVAILABLE_DATES } from "../unavailable-dates";

const KEY = "unavailable_dates";

export const scheduleService = {
  init: () => {
    const existing = localStorage.getItem(KEY);
    if (!existing) {
      storageService.set(KEY, INITIAL_UNAVAILABLE_DATES);
    }
  },

  getAll: () => {
    const dates = storageService.get<string[]>(KEY, INITIAL_UNAVAILABLE_DATES);
    return dates;
  },

  isDateUnavailable: (date: string) => {
    const dates = storageService.get<string[]>(KEY, INITIAL_UNAVAILABLE_DATES);
    return dates.includes(date);
  },

  update: (updatedDates: string[]): void =>
    storageService.set(KEY, updatedDates),
};
