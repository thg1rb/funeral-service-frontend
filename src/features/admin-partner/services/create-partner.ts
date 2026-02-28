import { KEY } from "../data/constants"
import { partners } from "../data/partners"
import { Partner } from "../types/partner"

export const createPartner = (newPartner: Partner) => {
  const res = localStorage.getItem(KEY)
  let update = partners
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newPartner]
  } else {
    update = [...partners, newPartner]
  }
    localStorage.setItem(KEY, JSON.stringify(update))
}