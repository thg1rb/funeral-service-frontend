import { ItemCategory } from "../../customize/types/customize";

export interface DecorationItemCreate {
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

export interface DecorationItemUpdate {
  name: string;
  category: ItemCategory;
  price: number;
  image: string;
  description: string;
  maxQuantity?: number;
}