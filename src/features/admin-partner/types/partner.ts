import { PartnerStatus, PartnerType } from "./enum"

export interface Partner {
  id: string
  name: string
  type: PartnerType
  category: string
  ownerName: string
  ownerTel: string
  address: string
  status: PartnerStatus
}