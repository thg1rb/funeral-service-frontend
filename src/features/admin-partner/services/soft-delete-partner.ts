import { KEY } from "../data/constants"
import { partners } from "../data/partners"
import { PartnerStatus } from "../types/enum"
import { Partner } from "../types/partner"

export const softDeletePartner = (name: string) => {
  const res = localStorage.getItem(KEY)
  let data = partners
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: Partner | undefined = data.find((element) => element.name === name)
  if (targetData !== undefined) {
    targetData.status = PartnerStatus.INACTIVE
    localStorage.setItem(KEY, JSON.stringify(data))
  }
}