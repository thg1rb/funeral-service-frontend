import { FileText, ShoppingCart, TrendingUp, Users } from "lucide-react";
import StatContainer from "./StatContainer";
import LastOrderContainer from "./LastOrderContainer";

export default function AdminDashboardSection() {
  return (
    <div className="p-10 flex flex-col gap-7">
      <p className="font-bold text-2xl">แดชบอร์ด</p>
      <div className="flex gap-4">
        <StatContainer title="คำสั่งซื้อทั้งหมด" icon={<ShoppingCart className="stroke-primary" />} stat={4} />
        <StatContainer title="รอดำเนินการ" icon={<TrendingUp className="stroke-primary" />} stat={2} />
        <StatContainer title="พาร์ทเนอร์" icon={<Users className="stroke-primary" />} stat={5} />
        <StatContainer title="บทความ" icon={<FileText className="stroke-primary" />} stat={3} />
      </div>
      <LastOrderContainer />
    </div>
  )
}