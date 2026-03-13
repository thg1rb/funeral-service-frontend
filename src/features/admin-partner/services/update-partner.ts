import { KEY } from "../data/constants"
import { INITIAL_PARTNERS } from "../data/partners"
import { PartnerStatus } from "../types/enum"
import { Partner, PartnerUpdate } from "../types/partner"

export const updatePartner = (newPartner: PartnerUpdate, id: string) => {
  const res = localStorage.getItem(KEY)
  let data = INITIAL_PARTNERS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: Partner | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.address = newPartner.address
    targetData.name = newPartner.name
    targetData.ownerName = newPartner.ownerName
    targetData.ownerTel = newPartner.ownerTel
    targetData.type = newPartner.type
    targetData.category = newPartner.category
    localStorage.setItem(KEY, JSON.stringify(data))
  }
}