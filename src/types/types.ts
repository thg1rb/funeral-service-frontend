export type FuneralType = "human" | "pet";

export interface DecorationItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  image: string;
  vendor: string;
  description: string;
  maxQuantity?: number;
}

export interface SelectedItem {
  item: DecorationItem;
  quantity: number;
}

export type ItemCategory =
  | "coffin"
  | "flowers"
  | "backdrop"
  | "table"
  | "equipment";

export interface FuneralPackage {
  id: string;
  name: string;
  tier: "basic" | "standard" | "premium";
  price: number;
  description: string;
  items: DecorationItem[];
  funeralType: FuneralType;
}

export interface FuneralVenue {
  id: string;
  name: string;
  distance: number;
  capacity: number;
  contact: string;
  address: string;
  lat: number;
  lng: number;
}

export interface OrderSummary {
  funeralType: FuneralType;
  packageName: string | null;
  items: SelectedItem[];
  extraServices: ExtraService[];
  totalPrice: number;
  venue: FuneralVenue | null;
  startDate: string | null;
  endDate: string | null;
  customerDetails: CustomerDetails | null;
  paymentMethod: PaymentMethod | null;
}

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  coffin: "โลงศพ / โกศ",
  flowers: "ดอกไม้จัดงาน",
  backdrop: "ฉากหลังพิธี",
  table: "โต๊ะพิธี",
  equipment: "อุปกรณ์พิธีกรรม",
};

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  funeralType: FuneralType | "both";
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export type PaymentMethod = "bank_transfer" | "qr_code" | "credit_card";
