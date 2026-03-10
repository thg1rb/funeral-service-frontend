import { INITIAL_EXTRA_SERVICES } from "../../extra-service/data/extra-services"
import { ExtraService } from "../../extra-service/types/extra-service"
import { EXTRA_SERVICE_KEY } from "../data/constants"
import { ExtraServiceUpdate } from "../data/extra-service"

export const updateExtraService = (newExtraService: ExtraServiceUpdate, id: string) => {
  const res = localStorage.getItem(EXTRA_SERVICE_KEY)
  let data = INITIAL_EXTRA_SERVICES
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: ExtraService | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.name = newExtraService.name
    targetData.price = newExtraService.price
    targetData.description = newExtraService.description
    targetData.funeralType = newExtraService.funeralType
    targetData.icon = newExtraService.icon
    localStorage.setItem(EXTRA_SERVICE_KEY, JSON.stringify(data))
  }
}