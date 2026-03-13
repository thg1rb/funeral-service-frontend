const testimonials = [
  {
    name: "คุณสมศรี ทองคำ",
    role: "ใช้บริการงานศพคุณแม่",
    content:
      "ประทับใจมากค่ะ ทีมงานดูแลทุกรายละเอียด ไม่ต้องกังวลเรื่องอะไรเลย งานออกมาสวยงามและสมเกียรติ ขอบคุณจากใจค่ะ",
  },
  {
    name: "คุณวิชัย สุขสบาย",
    role: "ใช้บริการงานศพคุณพ่อ",
    content:
      "บริการดีมาก ราคายุติธรรม เลือกแพ็คเกจได้ง่าย และยังสามารถปรับแต่งได้ตามที่ต้องการ แนะนำเลยครับ",
  },
  {
    name: "คุณนิภา รักดี",
    role: "ใช้บริการงานอำลาสัตว์เลี้ยง",
    content:
      "ขอบคุณที่ดูแลน้องหมาของเราอย่างอบอุ่นค่ะ พิธีอำลาสวยงามมาก ทำให้เราได้บอกลาอย่างสมบูรณ์",
  },
]

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold text-foreground">
          เสียงจากผู้ใช้บริการ
        </h2>
        <p className="mt-3 text-muted-foreground">
          ความไว้วางใจจากครอบครัวที่เราได้มีโอกาสดูแล
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              {`"${t.content}"`}
            </p>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
