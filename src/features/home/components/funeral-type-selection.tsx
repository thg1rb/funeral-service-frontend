"use client"

import Link from "next/link"
import { Heart, PawPrint } from "lucide-react"
import { useState } from "react"
import { Button } from "antd"
import { cn } from "@/src/utils/utils"
import { FuneralType } from "@/src/types/types"

const funeralTypes = [
  {
    type: "human" as FuneralType,
    title: "งานศพคน",
    description:
      "บริการจัดงานศพสำหรับบุคคลอันเป็นที่รัก ด้วยพิธีกรรมทางศาสนาอย่างครบถ้วน และการดูแลทุกรายละเอียดอย่างเคารพ",
    icon: Heart,
    features: ["พิธีกรรมทางพุทธศาสนา", "จัดดอกไม้และตกแต่ง", "บริการครบวงจร"],
  },
  {
    type: "pet" as FuneralType,
    title: "งานอำลาสัตว์เลี้ยง",
    description:
      "บริการจัดงานอำลาสัตว์เลี้ยง เพราะเขาคือสมาชิกในครอบครัว ดูแลด้วยความรักและอ่อนโยน",
    icon: PawPrint,
    features: ["พิธีอำลาอบอุ่น", "จัดตกแต่งสวยงาม", "ดูแลทุกขั้นตอน"],
  },
]

export function FuneralTypeSelection() {
  const [selected, setSelected] = useState<FuneralType | null>(null)

  return (
    <section id="select-type" className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold text-foreground">
          เลือกประเภทบริการ
        </h2>
        <p className="mt-3 text-muted-foreground">
          กรุณาเลือกประเภทงานที่ต้องการ เพื่อดูแพ็คเกจและบริการที่เหมาะสม
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {funeralTypes.map((item) => {
          const Icon = item.icon
          const isSelected = selected === item.type
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => setSelected(item.type)}
              className={cn(
                "group relative rounded-lg border-2 p-8 text-left transition-all cursor-pointer",
                isSelected
                  ? "border-primary bg-card shadow-lg"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-accent"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {isSelected && (
                <div className="absolute -top-px -right-px rounded-bl-lg rounded-tr-lg btn-gold px-3 py-1 text-xs font-medium">
                  เลือกแล้ว
                </div>
              )}
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="mt-8 text-center">
          <Link href={`/packages?type=${selected}`}>
            <Button className="gap-2 btn-gold!">
              ดำเนินการต่อ
              <span className="text-sm">
                {"("}
                {selected === "human" ? "งานศพคน" : "งานอำลาสัตว์เลี้ยง"}
                {")"}
              </span>
            </Button>
          </Link>
        </div>
      )}
    </section>
  )
}
