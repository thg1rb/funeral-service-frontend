// Shared types used by multiple features
export type FuneralType = "human" | "pet";

// OrderSummary aggregating all feature types
// Import feature types directly to avoid circular dependencies
import type { SelectedItem } from "@/src/features/customize/types/customize";
import type { ExtraService } from "@/src/features/extra-service/types/extra-service";
import type { CustomerDetails } from "@/src/features/customer-details/types/customer-details";
import type { PaymentMethod } from "@/src/features/payment/types/payment";
import type { Partner } from "../features/admin-partner/types/partner";

export { Partner };

export interface OrderSummary {
  orderId: string | null;
  packageName: string | null;
  funeralType: FuneralType;
  items: SelectedItem[];
  extraServices: ExtraService[];
  totalPrice: number;
  venue: Partner | null;
  startDate: string | null;
  endDate: string | null;
  customerDetails: CustomerDetails | null;
  paymentMethod: PaymentMethod | null;
}
