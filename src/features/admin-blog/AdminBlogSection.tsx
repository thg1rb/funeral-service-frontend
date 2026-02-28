import { Button } from "antd";
import { Plus } from "lucide-react";
import BlogBox from "./BlogBox";

export default function AdminBlog() {
  return (
    <div className="p-10 flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">บทความ</p>
        <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!">
          <Plus />
          เพิ่มบทความ
        </Button>
        {/* <PartnerModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} /> */}
      </div>
      <div>
        <BlogBox title="ขั้นตอนการจัดงานศพแบบพุทธ" description="เรียนรู้ขั้นตอนการจัดงานศพตามประเพณีพุทธศาสนาอย่างถูกต้อง" authorName="พิชัย แก้วมณี" createdAt="2024-05-20 14:30:05.123456+07"/>
      </div>
    </div>
  )
}