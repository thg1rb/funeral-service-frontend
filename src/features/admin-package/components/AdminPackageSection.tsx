"use client"
import { useEffect, useState } from "react"
import { FuneralPackage, ResolvedPackage } from "../../package/types/package"
import { PackageCard } from "../../package/components/package-card"
import { FuneralType } from "@/src/types/types";
import { useSearchParams } from "next/navigation";
import { packageService } from "../../package/data/services/package";
import clsx from "clsx";

export default function AdminPackageSection() {
  const [packages, setPackages] = useState<ResolvedPackage[]>([])
  const [currentTab, setCurrentTab] = useState("human")
  const tabList: FuneralType[] = ["human", "pet"]

  const fetchPackages = () => {
    const filtered = packageService.getByFuneralType(currentTab);
    setPackages(filtered)
  }

  useEffect(() => {
    packageService.init();
    fetchPackages()
  }, [currentTab]);


  return (
    <div className="p-10 flex flex-col gap-7">
      <div className="flex justify-between flex-col">
        <p className="font-bold text-2xl">แพคเกจ</p>
        <div className="flex gap-2 bg-secondary w-fit p-2 rounded-xl text-gray-400 text-sm mt-5">
          {
            tabList.map((element, index) => {
              return <button key={index} onClick={() => setCurrentTab(element)} className={clsx("transition-all px-5 py-2 rounded-lg cursor-pointer", {
                "bg-background px-5 py-2 rounded-lg text-white! ": currentTab === element
              })}>
                <p>{element === "pet" ? "สัตว์เลี้ยง" : "คน"}</p>
              </button>
            })
          }
        </div>
        {/* <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={() => {
        showModal()
      }}>
        <Plus />
        เพิ่มพาร์ทเนอร์
      </Button> */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} isAdmin={true} />
          ))}
        </div>
      </div>
    </div>
  )
}