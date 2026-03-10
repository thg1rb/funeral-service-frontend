import { DecorationItem, ItemCategory } from "@/src/features/customize/types/customize"
import { DECORATE_KEY, KEY } from "../../data/constants"
import { INITIAL_DECORATION_ITEMS } from "@/src/features/customize/data/decoration-items"

export const getDecorationItem = (category: ItemCategory, partnerId: string): DecorationItem[] => {
  const res = localStorage.getItem(DECORATE_KEY)
  let result = INITIAL_DECORATION_ITEMS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(DECORATE_KEY, JSON.stringify(INITIAL_DECORATION_ITEMS))
  }
  result = result.filter((element) => element.deletedAt === null)

  if (partnerId === "") {
    return result.filter((element) => element.category === category)
  }

  return filterPartnersByTypeAndPartnerId(category, result, partnerId)
}

const filterPartnersByTypeAndPartnerId = (type: ItemCategory, items: DecorationItem[], id: string) => {
  return items.filter((element) => element.category === type && element.partnerId === id)
}