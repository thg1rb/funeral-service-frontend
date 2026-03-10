"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"
import PartnerContainer from "./PartnerContainer"
import { ArrowLeft, Plus, Store } from "lucide-react"
import { Button } from "antd"
import PartnerModal from "./PartnerModal"
import { getPartners } from "../services/get-partners"
import { Partner } from "../types/partner"
import { PartnerType } from "../types/enum"
import { CATEGORY_LABELS, DecorationItem, ItemCategory } from "../../customize/types/customize"
import DecorateItemBox from "./DecorateItemBox"
import { getDecorationItem } from "../services/decorate-item/get-decorate-item"
import { useRouter } from "next/navigation"
import ItemModal from "./ItemModal"
import { getVender } from "../services/decorate-item/get-vender"

interface Props {
  params: Promise<{ id: string }>;
}

export default function PartnerItemsSection({ params }: Props) {
  const [vender, setVender] = useState<Partner | undefined>()
  const [items, setItems] = useState<DecorationItem[]>([])

  const [currentTab, setCurrentTab] = useState<ItemCategory>("coffin")
  const tabList: ItemCategory[] = [
    "coffin", "flowers", "backdrop", "table", "equipment"
  ]
  const [modalItem, setModalItem] = useState<DecorationItem | undefined>(undefined)

  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item?: DecorationItem) => {
    setModalItem(item)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handdleBack = () => {
    router.back()
  }

  const fetchVender = async () => {
    const { id } = await params
    const targetVender = getVender(id)
    setVender(targetVender)
  }

  const fetchDecorationItem = async () => {
    const { id } = await params
    const newItems: DecorationItem[] = getDecorationItem(currentTab, id)
    setItems(newItems)
  }

  useEffect(() => {
    fetchDecorationItem()
    fetchVender()
  }, [currentTab])

  return (
    <div className="p-10 flex flex-col gap-7">
      <Button className="flex items-center gap-3 text-sm w-fit" onClick={handdleBack} type="text">
        <ArrowLeft />
        <p>ย้านกลับไปหน้าก่อนหน้า</p>
      </Button>
      {
        vender === undefined ?
          <div>
            ไม่พบข้อมูลของพาร์ทเนอร์
          </div>
          :
          <>
            <div className="flex justify-between">
              <ItemModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} fetchItem={fetchDecorationItem} item={modalItem} vender={vender} />
              <p className="font-bold text-2xl">รายการสินค้า</p>
              <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={() => {
                showModal()
              }}>
                <Plus />
                เพิ่มสินค้า
              </Button>
            </div>
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 justify-center">
              {
                items.map((element, index) => {
                  return <DecorateItemBox item={element} key={element.id} isAdmin={true} openModal={showModal} fetchItem={fetchDecorationItem} />
                })
              }
            </div>
          </>
      }
    </div >
  )
}