"use client"
import { useEffect, useState } from "react"
import { CATEGORY_LABELS, DecorationItem, ItemCategory } from "../../customize/types/customize"
import clsx from "clsx"
import { getDecorationItem } from "../../admin-partner/services/decorate-item/get-decorate-item";
import DecorateItemBox from "../../admin-partner/components/DecorateItemBox";
import DecorateItemContainer from "./DecorateItemContainer";
import { getDecorationItemByPackage } from "../services/get-packages";
import { PackageItemRef } from "../../package/types/package";
import { Button } from "antd";
import { updatePackageDecorationItem } from "../services/update-package-item";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PackageItemList({ params }: Props) {
  const [packageId, setPackageId] = useState("")
  const [currentTab, setCurrentTab] = useState<ItemCategory>("coffin")
  const tabList: ItemCategory[] = [
    "coffin", "flowers", "backdrop", "table", "equipment"
  ]
  const [items, setItems] = useState<DecorationItem[]>([])
  const [selectedItems, setSelectedItems] = useState<PackageItemRef[]>([])

  const router = useRouter()


  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const isExist = prev.find((i) => i.id === itemId);
      if (isExist) {
        return prev.filter((i) => i.id !== itemId);
      } else {
        return [...prev, { id: itemId, quantity: 1 }];
      }
    });
  };

  const fetchDecorationItem = async () => {
    const { id } = await params
    const newItems: DecorationItem[] = getDecorationItem(currentTab, "")
    const packageItem = getDecorationItemByPackage(id)
    setSelectedItems(packageItem)
    setItems(newItems)
  }

  const updateDecorationItem = () => {
    updatePackageDecorationItem(packageId, selectedItems)
    router.back()
  }


  const fetchPackageId = async () => {
    const { id } = await params
    setPackageId(id)
  }

  useEffect(() => {
    fetchDecorationItem()
    fetchPackageId()
  }, [currentTab])
  return (
    <div className="p-10 flex flex-col gap-7">
      <div>
        <p className="font-bold text-2xl">รายการสินค้าในแพคเกจ</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 bg-secondary w-fit p-2 rounded-xl text-gray-400 text-sm">
          {
            tabList.map((element, index) => {
              return <button key={index} onClick={() => setCurrentTab(element)} className={clsx("transition-all px-5 py-2 rounded-lg cursor-pointer", {
                "bg-background px-5 py-2 rounded-lg text-white! ": currentTab === element
              })}>
                <p>{CATEGORY_LABELS[element]}</p>
              </button>
            })
          }
        </div>
        <Button onClick={() => {
          updateDecorationItem()
        }}>
          บันทึก
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 justify-center">
        {items.map((element) => {
          // 3. ตรวจสอบว่า item นี้ถูกเลือกอยู่หรือไม่
          const isSelected = selectedItems.some((i) => i.id === element.id);

          return (
            <DecorateItemContainer
              key={element.id}
              item={element}
              packageId={packageId}
              isSelected={isSelected}
              onToggle={() => handleToggleItem(element.id)} // ส่งฟังก์ชันไป
            />
          )
        })}
      </div>
    </div>
  )
}