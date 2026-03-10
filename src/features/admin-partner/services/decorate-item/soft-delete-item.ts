import { INITIAL_DECORATION_ITEMS } from "@/src/features/customize/data/decoration-items"
import { DECORATE_KEY } from "../../data/constants"
import { DecorationItem } from "@/src/features/customize/types/customize"

export const softDeleteItem = (id: string) => {
  const res = localStorage.getItem(DECORATE_KEY)
  let data = INITIAL_DECORATION_ITEMS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: DecorationItem | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.deletedAt = (new Date()).toDateString()
    localStorage.setItem(DECORATE_KEY, JSON.stringify(data))
  }
}