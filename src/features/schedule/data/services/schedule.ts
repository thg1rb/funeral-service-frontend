import { storageService } from "@/src/data/services/storageService";
import { INITIAL_UNAVAILABLE_DATES } from "../unavailable-dates";

const UNAVAILABLE_DATES_KEY = "funeral_unavailable_dates";
const BOOKED_DATES_KEY = "funeral_booked_dates";

export const scheduleService = {
  init: () => {
    const existing = localStorage.getItem(UNAVAILABLE_DATES_KEY);
    if (!existing) {
      storageService.set(UNAVAILABLE_DATES_KEY, INITIAL_UNAVAILABLE_DATES);
    }

    // Initialize booked dates if not exists
    const bookedExists = localStorage.getItem(BOOKED_DATES_KEY);
    if (!bookedExists) {
      storageService.set(BOOKED_DATES_KEY, [] as string[]);
    }
  },

  getAll: () => {
    const dates = storageService.get<string[]>(UNAVAILABLE_DATES_KEY, INITIAL_UNAVAILABLE_DATES);
    const booked = storageService.get<string[]>(BOOKED_DATES_KEY, []);
    // Combine both unavailable dates and booked dates
    return [...new Set([...dates, ...booked])];
  },

  getBookedDates: () => {
    return storageService.get<string[]>(BOOKED_DATES_KEY, []);
  },

  isDateUnavailable: (date: string) => {
    const dates = scheduleService.getAll();
    return dates.includes(date);
  },

  // Add a date range to booked dates (simulating other users' bookings)
  addBookedDates: (startDate: string, endDate: string) => {
    const booked = storageService.get<string[]>(BOOKED_DATES_KEY, []);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const newBookedDates: string[] = [];

    // Add all dates in the range
    let current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      newBookedDates.push(dateStr);
      current.setDate(current.getDate() + 1);
    }

    // Merge and save
    const updatedBooked = [...new Set([...booked, ...newBookedDates])];
    storageService.set(BOOKED_DATES_KEY, updatedBooked);
  },

  // Clear booked dates (for testing purposes)
  clearBookedDates: () => {
    storageService.set(BOOKED_DATES_KEY, [] as string[]);
  },

  update: (updatedDates: string[]): void =>
    storageService.set(UNAVAILABLE_DATES_KEY, updatedDates),
};
