export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(40_60%_50%/0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
            บริการจัดงานศพครบวงจร
          </p>
          <h1 className="text-balance text-4xl font-bold leading-tight text-foreground lg:text-5xl">
            ดูแลทุกขั้นตอน ด้วยความใส่ใจและเคารพ
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            บริการจัดงานศพสำหรับคนและสัตว์เลี้ยง พร้อมแพ็คเกจที่หลากหลาย
            ออกแบบได้ตามต้องการ เพื่อการอำลาอย่างสมเกียรติ
          </p>
        </div>
      </div>
    </section>
  );
}
