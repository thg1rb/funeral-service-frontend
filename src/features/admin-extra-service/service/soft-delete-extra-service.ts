import { INITIAL_EXTRA_SERVICES } from "../../extra-service/data/extra-services"
import { ExtraService } from "../../extra-service/types/extra-service"
import { EXTRA_SERVICE_KEY } from "../data/constants"

export const softDeleteExtraService = (id: string) => {
  const res = localStorage.getItem(EXTRA_SERVICE_KEY)
  let data = INITIAL_EXTRA_SERVICES
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: ExtraService | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.deletedAt = (new Date()).toDateString()
    localStorage.setItem(EXTRA_SERVICE_KEY, JSON.stringify(data))
  }
}