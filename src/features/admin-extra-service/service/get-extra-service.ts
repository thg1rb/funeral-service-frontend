import { INITIAL_EXTRA_SERVICES } from "../../extra-service/data/extra-services"
import { ExtraService } from "../../extra-service/types/extra-service"
import { EXTRA_SERVICE_KEY } from "../data/constants"

export const getExtraService = (): ExtraService[] => {
  const res = localStorage.getItem(EXTRA_SERVICE_KEY)
  let result = INITIAL_EXTRA_SERVICES
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(EXTRA_SERVICE_KEY, JSON.stringify(INITIAL_EXTRA_SERVICES))
  }
  result = result.filter((element) => element.deletedAt === null)

  return result
}