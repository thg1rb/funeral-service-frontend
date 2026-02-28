import { KEY } from "../data/constants"
import { partners } from "../data/partners"
import { PartnerStatus } from "../types/enum"
import { Partner } from "../types/partner"

export const updatePartner = (newPartner: Partner) => {
  const res = localStorage.getItem(KEY)
  let data = partners
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: Partner | undefined = data.find((element) => element.name === newPartner.name)
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