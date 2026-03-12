"use client"
import { formatPrice } from "@/src/utils/format";
import { Button, Card, Descriptions, Table, Tag, Divider, Space, Skeleton } from "antd";
import { ArrowLeft, Printer, MapPin, Phone, Clock, Package, PlusCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState, use } from "react"; // เพิ่ม use
import { getOrderById } from "../services/get-orders";
import { Order } from "../types/order";

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap params ตามมาตรฐาน Next.js 15
  const { id } = use(params);
  
  const [order, setOrder] = useState<Order | undefined>();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const res = getOrderById(id);
    setOrder(res);
  }, [id]);

  // ถ้ายังไม่โหลด หรือยังไม่อยู่บน Client ให้โชว์ Skeleton ป้องกัน Hydration Error
  if (!isClient || !order) {
    return <div className="p-8"><Skeleton active /></div>;
  }

  return (
    <div className="p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <Space size="middle">
          <Button
            icon={<ArrowLeft size={18} />}
            onClick={() => router.back()}
            className="flex items-center"
          >
            ย้อนกลับ
          </Button>
          <h1 className="text-2xl font-bold m-0">ออเดอร์ {order.orderId}</h1>
        </Space>

        <Button icon={<Printer size={18} />} className="flex items-center gap-2">
          พิมพ์ใบสั่งซื้อ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card title={<div className="flex items-center gap-2"><Package size={18} /> รายการสินค้าหลัก</div>}>
            <Table
              dataSource={order.items}
              pagination={false}
              rowKey={(record) => record.item.id} // 2. แก้ key ให้แน่นอน
              columns={[
                {
                  title: 'สินค้า', 
                  dataIndex: 'name', 
                  key: 'name', 
                  render: (_, rec) => (
                    <div>
                      <p className="font-medium m-0">{rec.item.name}</p>
                      <p className="text-xs text-muted-foreground m-0">{rec.item.vendor}</p>
                    </div>
                  )
                },
                { 
                  title: 'หมวดหมู่', 
                  dataIndex: ['item', 'category'], // เข้าถึง nested object
                  key: 'category', 
                  render: (cat) => <Tag>{cat}</Tag> 
                },
                { 
                  title: 'ราคา', 
                  key: 'price', 
                  align: 'right', 
                  render: (_, rec) => formatPrice(rec.item.price) 
                },
              ]}
            />
          </Card>

          <Card title={<div className="flex items-center gap-2"><PlusCircle size={18} /> บริการเสริม</div>}>
            <Table
              dataSource={order.extraServices}
              pagination={false}
              rowKey="id"
              columns={[
                { title: 'ชื่อบริการ', dataIndex: 'name', key: 'name' },
                { title: 'รายละเอียด', dataIndex: 'description', key: 'description', className: 'text-muted-foreground text-xs' },
                { title: 'ราคา', dataIndex: 'price', key: 'price', align: 'right', render: (p) => formatPrice(p) },
              ]}
            />
          </Card>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <Card title="ข้อมูลการจัดงาน" className="shadow-sm">
            <Descriptions column={1} size="small">
              <Descriptions.Item label={<UserIcon />}>
                <span className="font-semibold">{order.customerDetails.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneIcon />}>
                {order.customerDetails.phone}
              </Descriptions.Item>
              <Descriptions.Item label={<MapIcon />}>
                {/* 3. เช็คการสะกด vanue -> venue */}
                <span className="text-primary font-medium">{order.vanue?.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<TimeIcon />}>
                {/* 4. Render วันที่ปลอดภัยเพราะผ่าน isClient แล้ว */}
                {dayjs(order.startDate).format('D MMM YYYY')} - {dayjs(order.endDate).format('D MMM YYYY')}
              </Descriptions.Item>
            </Descriptions>
            <Divider className="my-3" />
            <p className="text-xs text-muted-foreground">
              <MapPin size={12} className="inline mr-1" /> {order.vanue?.address}
            </p>
          </Card>

          <Card className="shadow-sm bg-primary text-white border-none">
            <p className="m-0 opacity-80">ยอดชำระสุทธิ</p>
            <h2 className="text-3xl font-bold m-0 mt-1 text-white">
              {formatPrice(order.totalPrice)}
            </h2>
            <Divider className="bg-white/20 my-4" />
            <div className="flex justify-between items-center opacity-90">
              <span>วิธีชำระเงิน</span>
              <span className="font-medium uppercase">{order.paymentMethod}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const UserIcon = () => <User size={14} className="text-muted-foreground mr-2" />;
const PhoneIcon = () => <Phone size={14} className="text-muted-foreground mr-2" />;
const MapIcon = () => <MapPin size={14} className="text-muted-foreground mr-2" />;
const TimeIcon = () => <Clock size={14} className="text-muted-foreground mr-2" />;