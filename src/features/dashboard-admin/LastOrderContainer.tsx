import LastOrderBox from "./LastOrderBox";

export default function LastOrderContainer() {
  return (
    <div className="bg-secondary rounded-xl p-5 flex flex-col gap-5">
      <p className="text-lg font-semibold">ออเดอร์จัดงานล่าสุด</p>
      <div className=" flex flex-col gap-5">
        <LastOrderBox price={185000} title="ORD-2024-001" name="สมชาย ใจดี" place="วัดพระศรีมหาธาตุ" />
        <LastOrderBox price={185000} title="ORD-2024-001" name="สมชาย ใจดี" place="วัดพระศรีมหาธาตุ" />
        <LastOrderBox price={185000} title="ORD-2024-001" name="สมชาย ใจดี" place="วัดพระศรีมหาธาตุ" />
      </div>
    </div>
  )
}