import { formatPrice } from "@/src/utils/format"
import { ExtraService } from "../../extra-service/types/extra-service"
import {
  Pencil,
  Trash,
} from "lucide-react"
import { Button } from "antd"
import { softDeleteExtraService } from "../service/soft-delete-extra-service"

interface ExtraServiceBoxProps {
  extraService: ExtraService
  openModal: (extraService: ExtraService) => void
  fetchExtraService: () => void
}

export default function ExtraServiceBox(props: ExtraServiceBoxProps) {

  const handleDelete = () => {
    softDeleteExtraService(props.extraService?.id)
    props.fetchExtraService()
  }

  return <div
    key={props.extraService.id}
    className={(
      "group relative flex flex-col rounded-lg border-2 bg-card p-5 text-left transition-all")}
  >
    {/* <div
      className={"mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors"}
    >
    </div> */}

    <h3 className="text-lg font-semibold text-foreground">{props.extraService.name}</h3>
    <p className="mt-1 flex-1 text-xs text-muted-foreground leading-relaxed">
      {props.extraService.description}
    </p>

    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm font-bold text-primary">
        {formatPrice(props.extraService.price)}
      </span>
      <div
        className={"flex h-7 w-7 items-center justify-center rounded-full transition-colors"}
      >
      </div>
    </div>
    <div className="flex gap-3 mt-5">
      <Button type="text" className="border! border-gray-500!" onClick={() => {
        props.openModal(props.extraService)
      }}>
        <Pencil size={18} />
        แก้ไข
      </Button>
      <Button type="text" className="text-red-400! broder! border-red-400!" onClick={handleDelete}>
        <Trash size={18} />
        ลบ
      </Button>
    </div>
  </div>
}