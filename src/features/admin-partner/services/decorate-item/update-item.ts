import { DecorationItem } from "@/src/features/customize/types/customize"
import { DECORATE_KEY } from "../../data/constants"
import { INITIAL_DECORATION_ITEMS } from "@/src/features/customize/data/decoration-items"
import { DecorationItemUpdate } from "../../types/item"

export const updateDecorationItem = (newItem: DecorationItemUpdate, id: string) => {
  const res = localStorage.getItem(DECORATE_KEY)
  let data = INITIAL_DECORATION_ITEMS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: DecorationItem | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.name = newItem.name
    targetData.category = newItem.category
    targetData.description = newItem.description
    targetData.image = newItem.image
    targetData.maxQuantity = newItem.maxQuantity
    targetData.name = newItem.name
    targetData.price = newItem.price
    localStorage.setItem(DECORATE_KEY, JSON.stringify(data))
  }
}