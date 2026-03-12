// Shared types used by multiple features
export type FuneralType = "human" | "pet";

// OrderSummary aggregating all feature types
// Import feature types directly to avoid circular dependencies
import type { SelectedItem } from "@/src/features/customize/types/customize";
import type { ExtraService } from "@/src/features/extra-service/types/extra-service";
import type { CustomerDetails } from "@/src/features/customer-details/types/customer-details";
import type { PaymentMethod } from "@/src/features/payment/types/payment";
import { Partner } from "../features/admin-partner/types/partner";

export interface OrderSummary {
  funeralType: FuneralType;
  items: SelectedItem[];
  extraServices: ExtraService[];
  totalPrice: number;
  venue: Partner;
  startDate: string;
  endDate: string;
  customerDetails: CustomerDetails;
  paymentMethod: PaymentMethod;
}
