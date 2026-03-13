import { LucideProps, X } from "lucide-react"
import { ReactNode, } from "react"

interface StatContainerProps {
  title: string
  icon: ReactNode
  stat: number
}
export default function StatContainer(props: StatContainerProps) {
  return (
    <div className="p-5 bg-secondary border-border border rounded-xl w-full flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <p>{props.title}</p>
        {props.icon}
      </div>
      <p className="text-5xl font-semibold">{props.stat}</p>
    </div>
  )
}