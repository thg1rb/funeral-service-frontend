import type { FuneralType } from "@/src/types/types";
import type { DecorationItem } from "@/src/features/customize/types/customize";

export interface PackageItemRef {
  id: string;
  quantity?: number;
}

export interface FuneralPackage {
  id: string;
  name: string;
  tier: "basic" | "standard" | "premium";
  price: number;
  description: string;
  items: PackageItemRef[];
  funeralType: FuneralType;
}

export interface ResolvedPackage extends Omit<FuneralPackage, "items"> {
  items: DecorationItem[];
}
