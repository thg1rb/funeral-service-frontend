import { formatDate } from "@/src/utils/format"
import { Button } from "antd"
import { Pencil, Trash } from "lucide-react"

interface BlogBoxProps {
  title: string
  description: string
  authorName: string
  createdAt: string
}

export default function BlogBox(props: BlogBoxProps) {
  return (
    <div className="bg-secondary p-5 rounded-xl flex flex-col gap-1 hover:border-primary border">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">{props.title}</p>
        <div className="flex items-center gap-5">
          <Button icon={
            <Pencil size={18} className="cursor-pointer" />
          }>
          </Button>
          <Button
            icon={
              <Trash size={18} className="stroke-red-400 cursor-pointer" />
            }>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-400">{props.description}</p>
        <p className="text-sm text-gray-400">โดย {props.authorName}</p>
        <p className="text-sm text-gray-400">สร้างเมื่อ {formatDate(props.createdAt)}</p>
      </div>
    </div>
  )
}