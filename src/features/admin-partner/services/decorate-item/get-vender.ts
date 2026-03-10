import { KEY } from "../../data/constants"
import { INITIAL_PARTNERS } from "../../data/partners"
import { Partner } from "../../types/partner"

export const getVender = (id: string): Partner | undefined => {
  const res = localStorage.getItem(KEY)
  let result = INITIAL_PARTNERS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(KEY, JSON.stringify(INITIAL_PARTNERS))
  }
  const targetVender: Partner | undefined = result.find((element) => element.id === id)

  return targetVender
}