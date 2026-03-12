import { Order } from "../types/order";

// ตัวอย่างโครงสร้าง SelectedItem ที่คุณระบุ
// export interface SelectedItem {
//   item: DecorationItem;
//   quantity: number;
// }

export const INITIAL_ORDERS: (Order & { orderId: string })[] = [
  {
    orderId: "550e8400-e29b-41d4-a716-446655440000", // เปลี่ยนเป็น UUID
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
    ],
    // ปรับ items ให้เป็นโครงสร้าง { item: DecorationItem, quantity: number }
    items: [
      {
        quantity: 1,
        item: { 
          partnerId: "p-01", 
          id: "mf-01", 
          name: "จัดดอกไม้หน้าศพ ชุดนกยูงคู่บารมี", 
          category: "flowers", 
          price: 25000, 
          image: "https://picsum.photos/200?sig=1", 
          vendor: "ร้านดอกไม้ประดับศพ มนตรีฟลาวเวอร์", 
          description: "ดอกไม้สดคัดพิเศษ จัดทรงนกยูงรำแพน 2 ตัว", 
          deletedAt: null, 
          maxQuantity: 2 
        }
      },
      {
        quantity: 1,
        item: { 
          partnerId: "p-02", 
          id: "sy-01", 
          name: "หีบศพไม้สักทอง แกะสลักลายไทย", 
          category: "coffin", 
          price: 45000, 
          image: "https://picsum.photos/200?sig=21", 
          vendor: "สุริยาหีบศพ", 
          description: "ไม้สักแท้เกรดพรีเมียม", 
          deletedAt: null, 
          maxQuantity: 3 
        }
      }
    ],
  },
  {
    orderId: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d", // UUID
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
      name: "ฌาปนสถานกองทัพอากาศ",
      type: "AVENUE" as any,
      category: "เมรุ/ศาลาจัดงาน",
      ownerName: "กรมสวัสดิการทหารอากาศ",
      ownerTel: "02-552-4521",
      address: "เขตบางเขน กรุงเทพฯ 10220",
      status: "ACTIVE" as any,
      lat: 13.8741,
      lng: 100.5919,
    },
    extraServices: [],
    items: [
      {
        quantity: 2, // ระบุจำนวน
        item: { 
          partnerId: "p-01", 
          id: "mf-02", 
          name: "พวงหรีดดอกไม้สด โทนขาว-เขียว", 
          category: "flowers", 
          price: 2500, 
          image: "https://picsum.photos/200?sig=2", 
          vendor: "ร้านดอกไม้ประดับศพ มนตรีฟลาวเวอร์", 
          description: "ดอกไม้สีขาว จัดทรงกลม", 
          deletedAt: null, 
          maxQuantity: 20 
        }
      }
    ],
  },
  {
    orderId: "f9e8d7c6-b5a4-4321-abcd-ef0987654321", // UUID
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
      address: "แขวงบ้านพานถม เขตพระนคร กรุงเทพฯ 10200",
      status: "ACTIVE" as any,
      lat: 13.7619,
      lng: 100.5019,
    },
    extraServices: [],
    items: [
      {
        quantity: 100, // ระบุจำนวน (Snack Box)
        item: { 
          partnerId: "p-03", 
          id: "rn-01", 
          name: "Snack Box ชุดอิ่มท้อง (3 ชิ้น)", 
          category: "equipment", 
          price: 65, 
          image: "https://picsum.photos/200?sig=41", 
          vendor: "ร้านอาหารรสนิยม", 
          description: "เบเกอรี่อบสด 2 ชิ้น + น้ำผลไม้ 1 กล่อง", 
          deletedAt: null, 
          maxQuantity: 300 
        }
      }
    ],
  },
];