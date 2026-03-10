"use client"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Plus, Store } from "lucide-react"
import { Button } from "antd"
import { ExtraService } from "../../extra-service/types/extra-service"
import { getExtraService } from "../service/get-extra-service"
import ExtraServiceBox from "./ExtraServiceBox"

export default function ExtraServiceSection() {
  const [extraService, setExtraServices] = useState<ExtraService[]>([])
  const [modalExtraService, setModalExtraService] = useState<ExtraService | undefined>(undefined)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (partner?: ExtraService) => {
    setModalExtraService(partner)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchExtraService = () => {
    const newExtraService: ExtraService[] = getExtraService()
    setExtraServices(newExtraService)
  }

  useEffect(() => {
    fetchExtraService()
  }, [])

  return (
    <div className="p-10 flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">บริการเสริม</p>
        <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={() => {
          // showModal()
        }}>
          <Plus />
          เพิ่มบริการเสริม
        </Button>
        {/* <PartnerModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          partner={modalPartner}
          fetchPartner={fetchPartner}
        /> */}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-5 justify-center">
        {
          extraService.map((element, index) => {
            return <ExtraServiceBox extraService={element} key={element.id}/>
          })
        }
      </div>
    </div>
  )
}