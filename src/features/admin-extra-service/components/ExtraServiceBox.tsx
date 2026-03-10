import { formatPrice } from "@/src/utils/format"
import { ExtraService } from "../../extra-service/types/extra-service"
import {
  Camera,
  Car,
  Utensils,
  Users,
  Music,
  Video,
  Shield,
  Gift,
  Sparkles,
  Check,
  Plus,
  ArrowLeft,
  ArrowRight,
  GiftIcon,
} from "lucide-react"
import { useEffect, useState } from "react"

interface ExtraServiceBoxProps {
  extraService: ExtraService
}

export default function ExtraServiceBox(props: ExtraServiceBoxProps) {
  return <button
    key={props.extraService.id}
    type="button"
    // onClick={() => toggleExtraService(service)}
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
  </button>
}