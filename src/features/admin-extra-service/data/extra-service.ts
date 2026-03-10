import { FuneralType } from "@/src/types/types";

export interface ExtraServiceCreate {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  funeralType: FuneralType | "both";
  deletedAt: string | null
}

export interface ExtraServiceUpdate {
  name: string;
  description: string;
  price: number;
  icon: string;
  funeralType: FuneralType | "both";
}