import { INITIAL_EXTRA_SERVICES } from "../../extra-service/data/extra-services"
import { ExtraService } from "../../extra-service/types/extra-service"
import { EXTRA_SERVICE_KEY } from "../data/constants"
import { ExtraServiceCreate, ExtraServiceUpdate } from "../data/extra-service"

export const createExtraService = (newExtraService: ExtraServiceCreate) => {
  const res = localStorage.getItem(EXTRA_SERVICE_KEY)
  let update = INITIAL_EXTRA_SERVICES
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newExtraService]
  } else {
    update = [...INITIAL_EXTRA_SERVICES, newExtraService]
  }
  localStorage.setItem(EXTRA_SERVICE_KEY, JSON.stringify(update))
}