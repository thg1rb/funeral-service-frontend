export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  funeralType: FuneralType | "both";
}
