"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"
import PartnerContainer from "./PartnerContainer"
import { Plus, Store } from "lucide-react"
import { Button } from "antd"
import PartnerModal from "./PartnerModal"
import { getPartners } from "../services/get-partners"
import { Partner } from "../types/partner"
import { PartnerType } from "../types/enum"

export default function AdminPartnerSection() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [currentTab, setCurrentTab] = useState(0)
  const [modalPartner, setModalPartner] = useState<Partner | undefined>(undefined)
  const tabList: PartnerType[] = [PartnerType.ALL, PartnerType.SHOP, PartnerType.AVENUE]

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (partner?: Partner) => {
    console.log(partner)
    setModalPartner(partner)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchPartner = () => {
    const newPartners: Partner[] = getPartners(tabList[currentTab])
    setPartners(newPartners)
  }

  useEffect(() => {
    fetchPartner()
  }, [currentTab])

  return (
    <div className="p-10 flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">พาร์ทเนอร์</p>
        <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={() => {
          showModal()
        }}>
          <Plus />
          เพิ่มพาร์ทเนอร์
        </Button>
        <PartnerModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          partner={modalPartner}
          fetchPartner={fetchPartner}
        />
      </div>
      <div className="flex gap-2 bg-secondary w-fit p-2 rounded-xl text-gray-400 text-sm">
        {
          tabList.map((element, index) => {
            return <button key={index} onClick={() => setCurrentTab(index)} className={clsx("transition-all px-5 py-2 rounded-lg cursor-pointer", {
              "bg-background px-5 py-2 rounded-lg text-white! ": currentTab === index
            })}>
              <p>{element}</p>
            </button>
          })
        }
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 justify-center">
        {
          partners.map((element, index) => {
            return <PartnerContainer openModal={(partner?: Partner) => {
              showModal(partner)
            }}
              key={index}
              icon={<Store className="stroke-primary" />}
              partner={element}
              fetchPartner={fetchPartner} />
          })
        }
      </div>
    </div>
  )
}