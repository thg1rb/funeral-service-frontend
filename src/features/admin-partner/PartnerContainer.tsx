import { Button } from "antd"
import { Pencil, Trash } from "lucide-react"
import { ReactNode } from "react"

interface PartnerContainerProps {
  icon: ReactNode
  partnerName: string
  status: string
  type: string
  ownerName: string
  tel: string
  address: string
  openModal: () => void
}

export default function PartnerContainer(props: PartnerContainerProps) {
  return (
    <div className="bg-secondary rounded-xl p-4 border hover:border-primary transition-all flex flex-col gap-4 w-full max-w-80">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          {props.icon}
          <p className="font-semibold">{props.partnerName}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500 text-green-500 py-1 px-3 rounded-full text-sm">
          {props.status}
        </div>
      </div>
      <div className="text-sm flex flex-col gap-1">
        <p className="text-gray-400">{props.type}</p>
        <p>{props.ownerName} • {props.tel}</p>
        <p className="text-gray-400">{props.address}</p>
      </div>
      <div className="flex gap-3 ">
        <Button type="text" className="border! border-gray-500!" onClick={props.openModal}>
          <Pencil size={18} />
          แก้ไข
        </Button>
        <Button type="text" className="text-red-400! broder! border-red-400!">
          <Trash size={18} />
          ลบ
        </Button>
      </div>
    </div>
  )
}