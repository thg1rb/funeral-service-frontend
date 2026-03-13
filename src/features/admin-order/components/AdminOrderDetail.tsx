"use client"
import { formatPrice } from "@/src/utils/format";
import { Button, Card, Descriptions, Table, Tag, Divider, Space, Skeleton, Modal, message } from "antd";
import { ArrowLeft, Printer, MapPin, Phone, Clock, Package, PlusCircle, User, CheckCircle2, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useEffect, useState, use } from "react";
import { getOrderById } from "../services/get-orders";
import { Order, OrderUpdate } from "../types/order";
import clsx from "clsx";
import { OrderStatus } from "../types/enums";
import { updateOrder } from "../services/update-order";

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mapping สถานะและสไตล์
  const statusStyles = {
    [OrderStatus.PENDING]: {
      class: "text-gray-400 border border-gray-400 bg-gray-500/10",
      label: "รอดำเนินการ",
      nextAction: "รับออเดอร์",
      nextStatus: OrderStatus.INPROGRESS,
      icon: <Clock size={16} />
    },
    [OrderStatus.INPROGRESS]: {
      class: "text-amber-500 border border-amber-500 bg-amber-500/10",
      label: "กำลังดำเนินงาน",
      nextAction: "จัดการสำเร็จ",
      nextStatus: OrderStatus.COMPLETE,
      icon: <PlayCircle size={16} />
    },
    [OrderStatus.COMPLETE]: {
      class: "text-green-500 border border-green-500 bg-green-500/10",
      label: "เสร็จสิ้น",
      nextAction: null,
      icon: <CheckCircle2 size={16} />
    },
  };

  useEffect(() => {
    setIsClient(true);
    const res = getOrderById(id);
    setOrder(res);
  }, [id]);

  const handleUpdateStatus = (nextStatus: OrderStatus) => {
    if (!order) return;
    const nextLabel = statusStyles[nextStatus].label;

    Modal.confirm({
      title: 'ยืนยันการเปลี่ยนสถานะ',
      content: `คุณต้องการเปลี่ยนสถานะออเดอร์เป็น "${nextLabel}" ใช่หรือไม่?`,
      centered: true,
      onOk: async () => {
        setLoading(true);
        try {
          // เตรียมข้อมูลสำหรับ OrderUpdate โดยนำข้อมูลเดิมมาทั้งหมดและเปลี่ยนแค่ status
          const updateData: OrderUpdate = {
            customerDetails: order.customerDetails,
            endDate: order.endDate,
            extraServices: order.extraServices,
            funeralType: order.funeralType,
            items: order.items,
            paymentMethod: order.paymentMethod,
            startDate: order.startDate,
            totalPrice: order.totalPrice,
            status: nextStatus, // สถานะใหม่
            vanue: order.vanue,
          };

          // เรียกใช้ฟังก์ชันที่คุณเตรียมมา
          updateOrder(updateData, id);

          // อัปเดต State ในหน้าจอเพื่อให้ UI เปลี่ยนทันที
          setOrder({ ...order, status: nextStatus });

          message.success(`อัปเดตสถานะเป็น ${nextLabel} เรียบร้อยแล้ว`);
        } catch (error) {
          console.error(error);
          message.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  if (!isClient || !order) {
    return <div className="p-8"><Skeleton active /></div>;
  }

  const currentStatusInfo = statusStyles[order.status as OrderStatus] || statusStyles[OrderStatus.PENDING];

  return (
    <div className="p-8 min-h-screen ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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
              ออเดอร์ #{order.orderId.split('-')[0]}
              <span className={clsx("text-xs px-3 py-1 rounded-full font-medium flex items-center gap-2", currentStatusInfo.class)}>
                {currentStatusInfo.icon}
                {currentStatusInfo.label}
              </span>
            </h1>
          </div>
        </Space>

        <Space>
          <Button icon={<Printer size={18} />} className="flex items-center gap-2">
            พิมพ์ใบสั่งซื้อ
          </Button>

          {currentStatusInfo.nextAction && (
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={() => handleUpdateStatus(currentStatusInfo.nextStatus!)}
              className={clsx("flex items-center gap-2 font-bold border-none h-10 px-6 rounded-lg shadow-md transition-all", {
                "bg-amber-500 hover:bg-amber-600": order.status === OrderStatus.PENDING,
                "bg-green-600 hover:bg-green-700": order.status === OrderStatus.INPROGRESS,
              })}
            >
              {currentStatusInfo.nextAction}
            </Button>
          )}
        </Space>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* คอลัมน์ซ้าย: รายการสินค้าและบริการ */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card
            title={<div className="flex items-center gap-2 font-bold"><Package size={18} className="text-primary" /> รายการสินค้าหลัก</div>}
            className="shadow-sm border-none rounded-2xl"
          >
            <Table
              dataSource={order.items}
              pagination={false}
              rowKey={(record) => record.item.id}
              columns={[
                {
                  title: 'สินค้า',
                  key: 'name',
                  render: (_, rec) => (
                    <div className="flex items-center gap-3">
                      <img src={rec.item.image} className="w-12 h-12 rounded-lg object-cover border" alt="" />
                      <div>
                        <p className="font-semibold m-0">{rec.item.name}</p>
                        <p className="text-xs text-muted-foreground m-0">{rec.item.vendor}</p>
                      </div>
                    </div>
                  )
                },
                {
                  title: 'จำนวน',
                  dataIndex: 'quantity',
                  key: 'quantity',
                  align: 'center',
                  render: (q) => <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs">x{q}</span>
                },
                {
                  title: 'ราคา/หน่วย',
                  key: 'price',
                  align: 'right',
                  render: (_, rec) => <span className="font-medium">{formatPrice(rec.item.price)}</span>
                },
              ]}
            />
          </Card>

          <Card
            title={<div className="flex items-center gap-2 font-bold"><PlusCircle size={18} className="text-primary" /> บริการเสริม</div>}
            className="shadow-sm border-none rounded-2xl"
          >
            <Table
              dataSource={order.extraServices}
              pagination={false}
              rowKey="id"
              columns={[
                { title: 'ชื่อบริการ', dataIndex: 'name', key: 'name', render: (name) => <span className="font-medium">{name}</span> },
                { title: 'รายละเอียด', dataIndex: 'description', key: 'description', className: 'text-muted-foreground text-xs' },
                { title: 'ราคา', dataIndex: 'price', key: 'price', align: 'right', render: (p) => <span className="font-medium">{formatPrice(p)}</span> },
              ]}
            />
          </Card>
        </div>

        {/* คอลัมน์ขวา: ข้อมูลลูกค้าและสรุปยอด */}
        <div className="flex flex-col gap-6">
          <Card title={<span className="font-bold">ข้อมูลการจัดงาน</span>} className="shadow-sm border-none rounded-2xl">
            <Descriptions column={1} size="small" className="font-medium">
              <Descriptions.Item label={<UserIcon />}>
                {order.customerDetails.name}
              </Descriptions.Item>
              <Descriptions.Item label={<PhoneIcon />}>
                {order.customerDetails.phone}
              </Descriptions.Item>
              <Descriptions.Item label={<MapIcon />}>
                <span className="text-primary">{order.vanue?.name}</span>
              </Descriptions.Item>
              <Descriptions.Item label={<TimeIcon />}>
                {dayjs(order.startDate).format('D MMM YYYY')} - {dayjs(order.endDate).format('D MMM YYYY')}
              </Descriptions.Item>
            </Descriptions>
            <Divider className="my-3" />
            <div className="p-3 rounded-xl border border-gray-500">
              <p className="text-xs text-muted-foreground m-0 leading-relaxed">
                <MapPin size={12} className="inline mr-1 text-destructive" /> {order.vanue?.address}
              </p>
            </div>
          </Card>

          <Card className="shadow-md bg-slate-900 text-white border-none rounded-2xl overflow-hidden relative">
            <div className="relative z-10">
              <p className="m-0 opacity-70 text-sm">ยอดชำระสุทธิ</p>
              <h2 className="text-4xl font-bold m-0 mt-2 text-white tracking-tight">
                {formatPrice(order.totalPrice)}
              </h2>
              <Divider className="bg-white/10 my-4" />
              <div className="flex justify-between items-center opacity-80 text-xs uppercase tracking-widest">
                <span>ชำระผ่าน: {order.paymentMethod}</span>
                <Tag color="green" className="m-0 border-none bg-green-500/20 text-green-400 font-bold px-3">PAID</Tag>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Package size={100} />
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