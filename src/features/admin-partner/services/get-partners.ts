import { KEY } from "../data/constants"
import { INITIAL_PARTNERS } from "../data/partners"
import { PartnerStatus, PartnerType } from "../types/enum"
import { Partner } from "../types/partner"

export const getPartners = (type: PartnerType): Partner[] => {
  // Check if we're on the client side (localStorage is only available in browser)
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    // Return empty array during SSR
    return []
  }

  const res = localStorage.getItem(KEY)
  let result = INITIAL_PARTNERS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(KEY, JSON.stringify(INITIAL_PARTNERS))
  }
  result = result.filter((element) => element.status === PartnerStatus.ACTIVE)

  return filterPartnersByType(type, result)
}

const filterPartnersByType = (type: PartnerType, partners: Partner[]) => {
  if (type === PartnerType.ALL) return partners
  return partners.filter((element) => element.type === type)
}