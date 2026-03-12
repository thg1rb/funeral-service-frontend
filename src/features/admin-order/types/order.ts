import { FuneralType } from "@/src/types/types";
import { CustomerDetails } from "../../customer-details/types/customer-details";
import { ExtraService } from "../../extra-service/types/extra-service";
import { DecorationItem, SelectedItem } from "../../customize/types/customize";
import { Partner } from "../../admin-partner/types/partner";

export interface Order {
  orderId: string
  customerDetails: CustomerDetails
  endDate: string
  extraServices: ExtraService[]
  funeralType: FuneralType
  items: SelectedItem[]
  paymentMethod: string
  startDate: string
  totalPrice: number
  vanue: Partner
}

export interface OrderCreate {
  orderId: string
  customerDetails: CustomerDetails
  endDate: string
  extraServices: ExtraService[]
  funeralType: FuneralType
  items: SelectedItem[]
  paymentMethod: string
  startDate: string
  totalPrice: number
  vanue: Partner
}