import { KEY } from "../data/constants"
import { partners } from "../data/partners"
import { PartnerStatus, PartnerType } from "../types/enum"
import { Partner } from "../types/partner"

export const getPartners = (type: PartnerType): Partner[] => {
  const res = localStorage.getItem(KEY)
  let result = partners
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(KEY, JSON.stringify(partners))
  }
  result = result.filter((element) => element.status === PartnerStatus.ACTIVE)

  return filterPartnersByType(type, result)
}

const filterPartnersByType = (type: PartnerType, partners: Partner[]) => {
  if (type === PartnerType.ALL) return partners
  return partners.filter((element) => element.type === type)
}