"use client"
import { formatPrice } from "@/src/utils/format";
// เพิ่ม Select หรือ Dropdown ถ้าต้องการ แต่ในที่นี้ใช้ Segmented เพื่อความสวยงาม
import { Button, Table, Tag, Input, Segmented, type TableProps } from "antd";
import { Eye, Calendar, MapPin, User, Package, Search, Filter } from "lucide-react";
import dayjs from "dayjs";
import 'dayjs/locale/th';
import { Order } from "../types/order"; // มั่นใจว่า Import Enum มาด้วย
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";
import { getOrders } from "../services/get-orders";
import { OrderStatus } from "../types/enums";

type OrderWithId = Order & { orderId: string };

export default function AdminOrderSection() {
  const [orders, setOrders] = useState<OrderWithId[]>([])
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all"); // State สำหรับกรองสถานะ
  const router = useRouter()

  const fetchOrders = () => {
    const res = getOrders() as OrderWithId[]
    setOrders(res)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // --- Logic การกรองข้อมูลแบบ Multi-filter ---
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. ค้นหาจาก Text (ID หรือ ชื่อลูกค้า)
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customerDetails.name.toLowerCase().includes(searchText.toLowerCase());

      // 2. กรองจากประเภทงาน (human/pet)
      const matchesType = filterType === "all" || order.funeralType === filterType;

      // 3. กรองจากสถานะออเดอร์
      const matchesStatus = filterStatus === "all" || order.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [orders, searchText, filterType, filterStatus]);

  const columns: TableProps<OrderWithId>['columns'] = [
    {
      title: 'เลขออเดอร์',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (id) => <span className="font-mono font-bold text-primary">{id.split('-')[0]}...</span>, // ย่อ UUID ให้สั้นลง
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
      title: 'ประเภทงาน',
      dataIndex: 'funeralType',
      key: 'funeralType',
      render: (type: string) => (
        <Tag
          className={clsx("rounded-full px-3 border-none font-medium", {
            "bg-blue-900/40 text-blue-300": type === 'human',
            "bg-orange-900/40 text-orange-300": type === 'pet'
          })}
        >
          {type === 'human' ? 'บุคคล' : 'สัตว์เลี้ยง'}
        </Tag>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => {
        const statusConfig = {
          [OrderStatus.PENDING]: { class: "text-gray-400 border border-gray-400 bg-gray-500/30", label: "รอดำเนินการ" },
          [OrderStatus.INPROGRESS]: { class: "text-amber-500 border border-amber-500 bg-amber-500/30", label: "กำลังดำเนินงาน" },
          [OrderStatus.COMPLETE]: { class: "text-green-500 border border-green-500 bg-green-500/30", label: "เสร็จสิ้น" },
        };
        const config = statusConfig[status] || { class: "default", label: status };
        return (
          <div className={`font-medium ${config.class}   w-fit p-2 rounded-full text-xs`}>
            {config.label}
          </div>
        );
      },
    },
    {
      title: 'ราคารวม',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'right',
      render: (price) => (
        <span className="font-bold text-primary">
          {formatPrice(price)}
        </span>
      ),
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (_, record: OrderWithId) => (
        <Button
          type="default"
          icon={<Eye size={16} />}
          className="hover:border-primary! hover:text-primary! flex items-center gap-2"
          onClick={() => router.push(`/admin/orders/${record.orderId}`)}
        >
          รายละเอียด
        </Button>
      ),
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-6 bg-background min-h-screen">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">รายการคำสั่งซื้อ</h1>
          <p className="text-muted-foreground">ตรวจสอบและจัดการคำสั่งซื้อบริการจัดงานทั้งหมด</p>
        </div>

        {/* --- Toolbar: Search & Filters --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            {/* กรองประเภทงาน */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground ml-1">ประเภทงาน</span>
              <Segmented
                options={[
                  { label: 'ทั้งหมด', value: 'all' },
                  { label: 'บุคคล', value: 'human' },
                  { label: 'สัตว์เลี้ยง', value: 'pet' },
                ]}
                value={filterType}
                onChange={(v) => setFilterType(v as string)}
              />
            </div>

            {/* กรองสถานะ */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted-foreground ml-1">สถานะออเดอร์</span>
              <Segmented
                options={[
                  { label: 'ทั้งหมด', value: 'all' },
                  { label: 'รอดำเนินการ', value: OrderStatus.PENDING },
                  { label: 'กำลังทำ', value: OrderStatus.INPROGRESS },
                  { label: 'สำเร็จ', value: OrderStatus.COMPLETE },
                ]}
                value={filterStatus}
                onChange={(v) => setFilterStatus(v as string)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full md:w-auto">
            <span className="text-xs font-medium text-muted-foreground ml-1">ค้นหา</span>
            <Input
              placeholder="ค้นหาชื่อลูกค้า/ID..."
              prefix={<Search size={16} className="text-muted-foreground" />}
              className="w-full md:w-64 h-9 rounded-lg"
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <Table
          dataSource={filteredOrders}
          columns={columns}
          rowKey="orderId"
          pagination={{
            pageSize: 10,
            showTotal: (total) => `พบทั้งหมด ${total} รายการ`
          }}
          className="custom-table"
        />
      </div>
    </div>
  )
}