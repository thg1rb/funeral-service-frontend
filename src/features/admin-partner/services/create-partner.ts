import { KEY } from "../data/constants"
import { INITIAL_PARTNERS } from "../data/partners"
import { Partner } from "../types/partner"

export const createPartner = (newPartner: Partner) => {
  const res = localStorage.getItem(KEY)
  let update = INITIAL_PARTNERS
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newPartner]
  } else {
    update = [...INITIAL_PARTNERS, newPartner]
  }
    localStorage.setItem(KEY, JSON.stringify(update))
}