"use client"
import { formatPrice } from "@/src/utils/format";
import { Button, Table, Tag, type TableProps } from "antd";
import { Eye, Calendar, MapPin, User, Package } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/th';
import { Order } from "../types/order";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getOrders } from "../services/get-orders";

// ขยาย Type เล็กน้อยเพื่อรองรับ orderId ที่เพิ่มเข้าไป
type OrderWithId = Order & { orderId: string };


export default function AdminOrderSection() {
  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  const fetchOrders = () => {
    const res: Order[] = getOrders()
    setOrders(res)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const columns: TableProps<OrderWithId>['columns'] = [
    {
      title: 'เลขออเดอร์',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (id) => <span className="font-mono font-bold text-primary">{id}</span>,
    },
    {
      title: 'ข้อมูลลูกค้า',
      key: 'customer',
      render: (_, record) => (
        <div className="flex items-start gap-2">
          <div className="p-2 bg-accent rounded-lg">
            <User size={16} className="text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{record.customerDetails.name}</span>
            <span className="text-xs text-muted-foreground">{record.customerDetails.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'สถานที่ & วันที่',
      key: 'venue_date',
      render: (_, record) => (
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-1.5 text-foreground">
            <MapPin size={14} className="text-destructive" />
            <span>{record.vanue.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Calendar size={13} />
            <span>{dayjs(record.startDate).locale('th').format('D MMM BB')}</span>
            <span>-</span>
            <span>{dayjs(record.endDate).locale('th').format('D MMM BB')}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'ประเภทงาน',
      dataIndex: 'funeralType',
      key: 'funeralType',
      render: (type: string) => (
        <Tag
          className={clsx("rounded-full px-3 border-none font-medium", {
            // โทนสีน้ำเงินเข้ม-หม่น สำหรับบุคคล
            "bg-blue-900/40 text-blue-300": type === 'human',
            // โทนสีส้มอิฐ-ทอง สำหรับสัตว์เลี้ยง
            "bg-orange-900/40 text-orange-300": type === 'pet'
          })}
        >
          {type === 'human' ? 'บุคคล' : 'สัตว์เลี้ยง'}
        </Tag>
      ),
    },
    {
      title: 'รายการบริการเสริมและสินค้า',
      key: 'items',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-1 text-muted-foreground">
          <Package size={14} />
          <span>{record.items.length + record.extraServices.length} รายการ</span>
        </div>
      ),
    },
    {
      title: 'ราคารวม',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'right',
      render: (price) => (
        <span className="text-lg font-bold text-primary">
          {formatPrice(price)}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record: Order) => (
        <Button
          type="default"
          icon={<Eye size={16} />}
          className="hover:border-primary! hover:text-primary! flex items-center gap-2"
          onClick={() => {
            router.push(`/admin/orders/${record.orderId}`)
          }}
        >
          รายละเอียด
        </Button>
      ),
    },
  ];
  return (
    <div className="p-8 flex flex-col gap-6 bg-background min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">รายการคำสั่งซื้อ</h1>
        <p className="text-muted-foreground">ตรวจสอบและจัดการคำสั่งซื้อบริการจัดงานทั้งหมด</p>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="orderId"
          pagination={{ pageSize: 8 }}
          className="custom-table"
        />
      </div>
    </div>
  )
}