import { formatPrice } from "@/src/utils/format"

interface LastOrderBoxProps {
  title: string
  name: string
  place: string
  price: number
}
export default function LastOrderBox(props: LastOrderBoxProps) {
  return (
    <div className="flex justify-between bg-accent rounded-xl p-3 items-center border-gray-600 border">
      <div className="flex flex-col gap-2">
        <p>{props.title}</p>
        <p className="text-gray-400 text-sm">ชื่อผู้ติดต่อ: {props.name}</p>
        <p className="text-gray-400 text-sm">ชื่อสถานที่: {props.place}</p>
      </div>
      <p className="font-semibold text-primary">{formatPrice(props.price)}</p>
    </div>
  )
}