import { Order } from "../types/order";

// แนะนำให้ไปเพิ่ม orderId: string ใน interface Order ด้วยนะครับ
export const INITIAL_ORDERS: (Order & { orderId: string })[] = [
  {
    orderId: "ORD-2026-001",
    customerDetails: {
      name: "คุณสมชาย รักดี",
      phone: "081-234-5678",
      email: "somchai.r@example.com",
      address: "123 หมู่บ้านสุขใจ ถ.สุขุมวิท กรุงเทพฯ",
    },
    funeralType: "human",
    startDate: "2026-04-10T18:00:00",
    endDate: "2026-04-13T21:00:00",
    paymentMethod: "transfer",
    totalPrice: 95500,
    vanue: {
      id: "67c3ca84-3580-466a-939e-d30c5e796062",
      name: "วัดธาตุทอง พระอารามหลวง",
      type: "AVENUE" as any,
      category: "ศาลาสวดอภิธรรม",
      ownerName: "สำนักงานศาสนสมบัติ",
      ownerTel: "02-391-9616",
      address: "1325 ถ.สุขุมวิท แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพฯ 10110",
      status: "ACTIVE" as any,
      lat: 13.7191,
      lng: 100.5847,
    },
    extraServices: [
      {
        id: "extra-h4",
        name: "พระสงฆ์ประกอบพิธี",
        description: "นิมนต์พระสงฆ์ 9 รูป ประกอบพิธีสวดอภิธรรม",
        price: 18000,
        icon: "users",
        funeralType: "human",
        deletedAt: null,
      },
      {
        id: "extra-h1",
        name: "ถ่ายภาพพิธีกรรม",
        description: "ช่างภาพมืออาชีพบันทึกภาพตลอดพิธี",
        price: 8000,
        icon: "camera",
        funeralType: "human",
        deletedAt: null,
      }
    ],
    items: [
      { partnerId: "550e8400-e29b-41d4-a716-446655440000", id: "mf-01", name: "จัดดอกไม้หน้าศพ ชุดนกยูงคู่บารมี", category: "flowers", price: 25000, image: "https://picsum.photos/200?sig=1", vendor: "ร้านดอกไม้ประดับศพ มนตรีฟลาวเวอร์", description: "ดอกไม้สดคัดพิเศษ จัดทรงนกยูงรำแพน 2 ตัว หรูหราสง่างาม", deletedAt: null, maxQuantity: 2 },
      { partnerId: "2d3e4f5g-6h7i-8j9k-0l1m-2n3o4p5q6r7s", id: "sy-01", name: "หีบศพไม้สักทอง แกะสลักลายไทย", category: "coffin", price: 45000, image: "https://picsum.photos/200?sig=21", vendor: "สุริยาหีบศพ (สาขาคลองหลวง)", description: "ไม้สักแท้เกรดพรีเมียม ลงรักปิดทองคำเปลว", deletedAt: null, maxQuantity: 3 }
    ],
  },
  {
    orderId: "ORD-2026-002",
    customerDetails: {
      name: "คุณวิภาวี ใจบุญ",
      phone: "092-888-9999",
      email: "vipa_j@petlover.com",
    },
    funeralType: "pet",
    startDate: "2026-05-20T14:00:00",
    endDate: "2026-05-20T17:00:00",
    paymentMethod: "credit_card",
    totalPrice: 15300,
    vanue: {
      id: "e4f5a6b7-c8d9-4e0f-1a2b-3c4d5e6f7a8b",
      name: "ฌาปนสถานกองทัพอากาศ (วัดพระศรีมหาธาตุ)",
      type: "AVENUE" as any,
      category: "เมรุ/ศาลาจัดงาน",
      ownerName: "กองการสงเคราะห์ กรมสวัสดิการทหารอากาศ",
      ownerTel: "02-552-4521",
      address: "ถ.พหลโยธิน แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพฯ 10220",
      status: "ACTIVE" as any,
      lat: 13.8741,
      lng: 100.5919,
    },
    extraServices: [
      {
        id: "extra-p1",
        name: "ถ่ายภาพพิธีอำลา",
        description: "ช่างภาพบันทึกช่วงเวลาอำลาสัตว์เลี้ยงที่รัก",
        price: 3500,
        icon: "camera",
        funeralType: "pet",
        deletedAt: null,
      },
      {
        id: "extra-p4",
        name: "กล่องเก็บอัฐิพรีเมียม",
        description: "กล่องไม้แกะสลักสำหรับเก็บอัฐิสัตว์เลี้ยง",
        price: 3200,
        icon: "shield",
        funeralType: "pet",
        deletedAt: null,
      }
    ],
    items: [
      { partnerId: "550e8400-e29b-41d4-a716-446655440000", id: "mf-02", name: "พวงหรีดดอกไม้สด โทนขาว-เขียว", category: "flowers", price: 2500, image: "https://picsum.photos/200?sig=2", vendor: "ร้านดอกไม้ประดับศพ มนตรีฟลาวเวอร์", description: "ดอกมัม ดอกเบญจมาศ และกล้วยไม้สีขาว จัดทรงกลม", deletedAt: null, maxQuantity: 20 },
      { partnerId: "8c7b8e5c-1b7e-4b2a-8c3d-9d4e5f6a7b8c", id: "br-05", name: "ดอกไม้จันทน์ ลายกุหลาบ (100 ดอก)", category: "flowers", price: 250, image: "https://picsum.photos/200?sig=15", vendor: "ร้านของชำร่วย บุญรักษา", description: "ดอกไม้จันทน์สำหรับแขก ทำจากไม้จันทน์แท้", deletedAt: null, maxQuantity: 50 }
    ],
  },
  {
    orderId: "ORD-2026-003",
    customerDetails: {
      name: "คุณมานะ กล้าหาญ",
      phone: "085-111-2233",
    },
    funeralType: "human",
    startDate: "2026-06-01T19:00:00",
    endDate: "2026-06-03T20:00:00",
    paymentMethod: "cash",
    totalPrice: 32800,
    vanue: {
      id: "c2d3e4f5-a6b7-4c8d-9e0f-1a2b3c4d5e6f",
      name: "วัดตรีทศเทพวรวิหาร",
      type: "AVENUE" as any,
      category: "ศาลาสวดอภิธรรม",
      ownerName: "ฝ่ายสถานที่วัดตรีทศเทพ",
      ownerTel: "02-281-2430",
      address: "167 ถ.ประชาธิปไตย แขวงบ้านพานถม เขตพระนคร กรุงเทพฯ 10200",
      status: "ACTIVE" as any,
      lat: 13.7619,
      lng: 100.5019,
    },
    extraServices: [
      {
        id: "extra-h3",
        name: "อาหารและเครื่องดื่ม",
        description: "ชุดอาหารว่างและเครื่องดื่มสำหรับแขก 50 ท่าน",
        price: 12000,
        icon: "utensils",
        funeralType: "human",
        deletedAt: null,
      }
    ],
    items: [
      { partnerId: "550e8400-e29b-41d4-a716-446655440000", id: "mf-08", name: "หีบศพขาวลายเทพนม (มาตรฐาน)", category: "coffin", price: 8500, image: "https://picsum.photos/200?sig=8", vendor: "ร้านดอกไม้ประดับศพ มนตรีฟลาวเวอร์", description: "หีบศพไม้ปาติเกิล บุผ้าตาดประดับลาย", deletedAt: null, maxQuantity: 5 },
      { partnerId: "b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e", id: "rn-01", name: "Snack Box ชุดอิ่มท้อง (3 ชิ้น)", category: "equipment", price: 65, image: "https://picsum.photos/200?sig=41", vendor: "ร้านอาหารรสนิยม (Catering งานศพ)", description: "เบเกอรี่อบสด 2 ชิ้น + น้ำผลไม้ 1 กล่อง", deletedAt: null, maxQuantity: 300 }
    ],
  },
];