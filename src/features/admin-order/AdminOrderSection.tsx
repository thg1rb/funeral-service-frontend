"use client"
import { formatPrice } from "@/src/utils/format";
import { Button, Space, Table, TableProps } from "antd";
import clsx from "clsx";
import { Eye } from "lucide-react";

interface OrderType {
  order_id: string
  contact_name: string
  place: string
  status: string
  price: number
}
const dataSource: OrderType[] = [
  {
    order_id: "ORD-2024-001",
    contact_name: "สมหญิง ใจดี",
    place: "วัดพระศรีมหาธาตุ",
    status: "รอดำเนินการ",
    price: 185000
  },
  {
    order_id: "ORD-2024-002",
    contact_name: "ประสิทธิ์ สุขสม",
    place: "วัดบวรนิเวศ",
    status: "กำลังดำเนินการ",
    price: 220000
  },
  {
    order_id: "ORD-2024-003",
    contact_name: "	สุดา รักษ์ดี",
    place: "วัดเทพศิรินทร์",
    status: "เสร็จสิ้น",
    price: 150000
  },
];

const columns: TableProps<OrderType>['columns'] = [
  {
    title: 'เลขออเดอร์',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: 'ผู้ติดต่อ',
    dataIndex: 'contact_name',
    key: 'contact_name',
  },
  {
    title: 'สถานที่',
    dataIndex: 'place',
    key: 'place',
  },
  {
    title: 'สถานะ',
    render: (_, { status }) => (
      <div className={clsx("w-fit p-2 rounded-full", {
        "bg-amber-500/10 border border-amber-500 text-amber-500": status === "รอดำเนินการ",
        "bg-blue-500/10 border border-blue-500 text-blue-500": status === "กำลังดำเนินการ",
        "bg-green-500/10 border border-green-500 text-green-500": status === "เสร็จสิ้น"
      })}>
        {status}
      </div>
    ),
    key: 'status',
  },
  {
    title: 'ราคารวม',
    render: (_, { price }) => (
      <p className="text-primary font-semibold">
        {formatPrice(price)}
      </p>
    ),
    key: 'price',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Button type="text" className="border-accent! border!">
        รายละเอียดเพิ่มเติม
      </Button>
    ),
  },
];
export default function AdminOrderSection() {
  return (
    <div className="p-10 flex flex-col gap-7">
      <p className="font-bold text-2xl">คำสั่งซื้อ</p>
      <Table className="rounded-xl! bg-card!" dataSource={dataSource} columns={columns} rowKey="order_id" />
    </div>
  )
}