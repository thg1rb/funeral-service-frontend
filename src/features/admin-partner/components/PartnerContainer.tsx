import { Button } from "antd"
import { Pencil, Trash } from "lucide-react"
import { ReactNode } from "react"
import { Partner } from "../types/partner"
import { softDeletePartner } from "../services/soft-delete-partner"

interface PartnerContainerProps {
  icon: ReactNode
  partner: Partner
  openModal: (partner?: Partner) => void
  fetchPartner: () => void
}

export default function PartnerContainer(props: PartnerContainerProps) {

  const deletePartner = () => {
    softDeletePartner(props.partner.ownerName)
    props.fetchPartner()
  }

  return (
    <div className="bg-secondary rounded-xl p-4 border hover:border-primary transition-all flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-3 items-center">
          {props.icon}
          <p className="font-semibold">{props.partner.name}</p>
        </div>
        {/* <div className="bg-green-500/10 border border-green-500 text-green-500 py-1 px-3 rounded-full text-xs text-nowrap truncate">
          {props.partner.status}
        </div> */}
      </div>
      <div className="text-sm flex flex-col gap-1">
        <p className="text-gray-400">{props.partner.category}</p>
        <p>{props.partner.ownerName} • {props.partner.ownerTel}</p>
        <p className="text-gray-400">{props.partner.address}</p>
      </div>
      <div className="flex gap-3 ">
        <Button type="text" className="border! border-gray-500!" onClick={() => {
          props.openModal(props.partner)
        }}>
          <Pencil size={18} />
          แก้ไข
        </Button>
        <Button type="text" className="text-red-400! broder! border-red-400!" onClick={deletePartner}>
          <Trash size={18} />
          ลบ
        </Button>
      </div>
    </div>
  )
}