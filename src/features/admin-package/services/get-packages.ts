import { INITIAL_FUNERAL_PACKAGES } from "../../package/data/package-items"
import { FuneralPackage, PackageItemRef } from "../../package/types/package"
import { PACKAGE_KEY } from "../data/constants"

export const getPackages = (): FuneralPackage[] => {
  const res = localStorage.getItem(PACKAGE_KEY)
  let result = INITIAL_FUNERAL_PACKAGES
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(PACKAGE_KEY, JSON.stringify(INITIAL_FUNERAL_PACKAGES))
  }

  return result
}

export const getPackageById = (id: string): FuneralPackage | undefined => {
  const res = localStorage.getItem(PACKAGE_KEY)
  let result = INITIAL_FUNERAL_PACKAGES
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(PACKAGE_KEY, JSON.stringify(INITIAL_FUNERAL_PACKAGES))
  }

  const target = result.find((element) => element.id === id)

  return target
}

export const getDecorationItemByPackage = (packageId: string): PackageItemRef[] => {
  const targetPackage = getPackageById(packageId)
  if (targetPackage !== undefined) {
    return targetPackage.items
  }

  return []
}