import { INITIAL_FUNERAL_PACKAGES } from "../../package/data/package-items"
import { FuneralPackage, PackageItemRef } from "../../package/types/package"
import { PACKAGE_KEY } from "../data/constants"

export const updatePackageDecorationItem = (id: string, itemRef: PackageItemRef[]) => {
  const res = localStorage.getItem(PACKAGE_KEY)
  let data = INITIAL_FUNERAL_PACKAGES
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: FuneralPackage | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.items = itemRef
    localStorage.setItem(PACKAGE_KEY, JSON.stringify(data))
  }

}