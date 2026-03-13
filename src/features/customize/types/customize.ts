export interface DecorationItem {
  partnerId: string
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  image: string;
  vendor: string;
  description: string;
  maxQuantity?: number;
  deletedAt: string | null
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

export const CATEGORY_LABELS: Record<ItemCategory, string> = {
  coffin: "โลงศพ / โกศ",
  flowers: "ดอกไม้จัดงาน",
  backdrop: "ฉากหลังพิธี",
  table: "โต๊ะพิธี",
  equipment: "อุปกรณ์พิธีกรรม",
};
