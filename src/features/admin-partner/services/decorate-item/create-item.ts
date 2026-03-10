import { INITIAL_DECORATION_ITEMS } from "@/src/features/customize/data/decoration-items"
import { DECORATE_KEY } from "../../data/constants"
import { DecorationItemCreate } from "../../data/item"

export const createDecorationItem = (newItem: DecorationItemCreate) => {
  const res = localStorage.getItem(DECORATE_KEY)
  let update = INITIAL_DECORATION_ITEMS
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newItem]
  } else {
    update = [...INITIAL_DECORATION_ITEMS, newItem]
  }
  localStorage.setItem(DECORATE_KEY, JSON.stringify(update))
}