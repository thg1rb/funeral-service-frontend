import { formatPrice } from "@/src/utils/format";
import { DecorationItem } from "../../customize/types/customize";
import { Button } from "antd";
import { Pencil, Trash } from "lucide-react";
import { softDeleteItem } from "../services/decorate-item/soft-delete-item";

interface DecorateItemBoxProps {
  item: DecorationItem
  openModal?: (item?: DecorationItem) => void
  fetchItem?: () => void
  isAdmin?: boolean
}

export default function DecorateItemBox(props: DecorateItemBoxProps) {

  const handdleDeleteItem = () => {
    if (props.fetchItem !== undefined) {
      softDeleteItem(props.item.id)
      props.fetchItem()
    }
  }

  return (
    <div
      // key={item.id}
      className={"group relative flex flex-col rounded-lg border-2 bg-card p-4 text-left transition-all"}
    >
      {/* Clickable area for toggle */}
      <div
        className="text-left"
      >
        <div className="mb-3 flex h-32 items-center justify-center rounded-md bg-muted">
          <span className="text-xs text-muted-foreground">
            {props.item.name}
          </span>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">
            {props.item.name}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {props.item.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {"ผู้ให้บริการ: "}
            {props.item.vendor}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-start flex-1 pb-5">
        <div>
          <span className="text-sm font-bold text-primary">
            {formatPrice(props.item.price)}
          </span>
          <span className="ml-1 text-xs text-muted-foreground">
            {"/ ชิ้น (สูงสุด "}
            {props.item.maxQuantity}
            {")"}
          </span>
        </div>
      </div >
      {
        props.isAdmin !== undefined && props.openModal !== undefined ?
          <div className="flex gap-3">
            <Button type="text" className="border! border-gray-500!"
              onClick={() => {
                props.openModal?.(props.item)
              }}>
              <Pencil size={18} />
              แก้ไข
            </Button>
            <Button type="text" className="text-red-400! broder! border-red-400!" onClick={handdleDeleteItem}>
              <Trash size={18} />
              ลบ
            </Button>
          </div>
          :
          <></>
      }
    </div>
  )
}