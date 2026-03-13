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
  capacity?: number
  lat: number
  lng: number
}

export interface PartnerCreate {
  id: string
  name: string
  type: PartnerType
  category: string
  ownerName: string
  ownerTel: string
  address: string
  status: PartnerStatus
  capacity?: number
  lat: number
  lng: number
}

export interface PartnerUpdate {
  name: string
  type: PartnerType
  category: string
  ownerName: string
  ownerTel: string
  address: string
  status: PartnerStatus
  capacity?: number
  lat: number
  lng: number
}