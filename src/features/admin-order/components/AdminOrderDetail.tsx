"use client"
import { formatPrice } from "@/src/utils/format";
import { Button, Card, Descriptions, Table, Tag, Divider, Space } from "antd";
import { ArrowLeft, Printer, MapPin, Phone, Mail, Clock, Package, PlusCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getOrderById } from "../services/get-orders";
import { Order } from "../types/order";

// สมมติว่ารับ data มาจาก Mock หรือ API

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | undefined>()
  const router = useRouter();

  const fetchOrderById = async () => {
    const { id } = await params
    const res = getOrderById(id)
    setOrder(res)
  }

  useEffect(() => {
    fetchOrderById()
  }, [])


  return (
    <div className="p-8  min-h-screen">
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
          <div>
            <h1 className="text-2xl font-bold m-0 flex items-center gap-3">
              ออเดอร์ {order?.orderId}

            </h1>
          </div>
        </Space>

        <Button icon={<Printer size={18} />} className="flex items-center gap-2">
          พิมพ์ใบสั่งซื้อ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column: รายการสินค้าและบริการ (70%) */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Main Items Table */}
          <Card title={<div className="flex items-center gap-2"><Package size={18} /> รายการสินค้าหลัก</div>} className="shadow-sm">
            <Table
              dataSource={order?.items}
              pagination={false}
              rowKey="id"
              columns={[
                {
                  title: 'สินค้า', dataIndex: 'name', key: 'name', render: (text, rec) => (
                    <div>
                      <p className="font-medium m-0">{text}</p>
                      <p className="text-xs text-muted-foreground m-0">{rec.vendor}</p>
                    </div>
                  )
                },
                { title: 'หมวดหมู่', dataIndex: 'category', key: 'category', render: (cat) => <Tag>{cat}</Tag> },
                { title: 'ราคา', dataIndex: 'price', key: 'price', align: 'right', render: (p) => formatPrice(p) },
              ]}
            />
          </Card>

          {/* Extra Services Table */}
          <Card title={<div className="flex items-center gap-2"><PlusCircle size={18} /> บริการเสริม</div>} className="shadow-sm">
            <Table
              dataSource={order?.extraServices}
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

        {/* Right Column: สรุปข้อมูล (30%) */}
        <div className="flex flex-col gap-6">

          {/* Customer & Venue Info */}
          <Card title="ข้อมูลการจัดงาน" className="shadow-sm">
            <Descriptions column={1} size="small">
              <Descriptions.Item label={<UserIcon />}>
                <span className="font-semibold">{order?.customerDetails.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneIcon />}>
                {order?.customerDetails.phone}
              </Descriptions.Item>
              <Descriptions.Item label={<MapIcon />}>
                <span className="text-primary font-medium">{order?.vanue.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<TimeIcon />}>
                {dayjs(order?.startDate).format('D MMM BB')} - {dayjs(order?.endDate).format('D MMM BB')}
              </Descriptions.Item>
            </Descriptions>
            <Divider className="my-3" />
            <p className="text-xs text-muted-foreground">
              <MapPin size={12} className="inline mr-1" /> {order?.vanue.address}
            </p>
          </Card>

          {/* Payment Summary */}
          <Card className="shadow-sm bg-primary text-white border-none">
            <p className="m-0 opacity-80">ยอดชำระสุทธิ</p>
            <h2 className="text-3xl font-bold m-0 mt-1">
              {formatPrice(order === undefined ? 0 : order.totalPrice)}
            </h2>
            <Divider className="bg-white/20 my-4" />
            <div className="flex justify-between items-center opacity-90">
              <span>วิธีชำระเงิน</span>
              <span className="font-medium uppercase">{order?.paymentMethod}</span>
            </div>
          </Card>

          {/* Actions */}
          {/* <div className="flex flex-col gap-2">
            <Button type="primary" size="large" className="w-full bg-green-600 hover:bg-green-500! border-none">
              ยืนยันการดำเนินงาน
            </Button>
            <Button size="large" danger className="w-full">
              ยกเลิกออเดอร์นี้
            </Button>
          </div> */}
        </div>

      </div>
    </div>
  );
}

// Small Icons for Descriptions
const UserIcon = () => <User size={14} className="text-muted-foreground mr-2" />;
const PhoneIcon = () => <Phone size={14} className="text-muted-foreground mr-2" />;
const MapIcon = () => <MapPin size={14} className="text-muted-foreground mr-2" />;
const TimeIcon = () => <Clock size={14} className="text-muted-foreground mr-2" />;