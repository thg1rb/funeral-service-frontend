import { Package, Palette, MapPin, CalendarDays } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "แพ็คเกจพร้อมใช้",
    description: "เลือกจากแพ็คเกจที่เตรียมไว้ ตั้งแต่พื้นฐานถึงพรีเมียม ราคาชัดเจน",
  },
  {
    icon: Palette,
    title: "ออกแบบเอง",
    description: "ปรับแต่งรายละเอียดทุกชิ้น เลือกสินค้าจากหลากหลายร้านค้า",
  },
  {
    icon: MapPin,
    title: "เลือกสถานที่",
    description: "ค้นหาวัดและสถานที่จัดงานใกล้คุณ พร้อมข้อมูลครบถ้วน",
  },
  {
    icon: CalendarDays,
    title: "จองวันจัดงาน",
    description: "เลือกวันที่สะดวก ดูวันว่างได้ทันที จองง่ายเพียงไม่กี่คลิก",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground">
            บริการครบวงจร ทุกขั้นตอน
          </h2>
          <p className="mt-3 text-muted-foreground">
            ดูแลทุกรายละเอียดจากจุดเดียว ประหยัดเวลา สะดวก และวางใจได้
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-background p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
