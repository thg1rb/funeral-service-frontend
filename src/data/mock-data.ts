import type {
  DecorationItem,
  FuneralPackage,
  FuneralVenue,
} from "../types/types";

export const decorationItems: DecorationItem[] = [
  // Coffins
  {
    id: "coffin-1",
    name: "โลงไม้สักทอง แบบคลาสสิค",
    category: "coffin",
    price: 25000,
    image: "/images/items/coffin-1.jpg",
    vendor: "สุขสันต์ หีบศพ",
    description: "โลงไม้สักทองแกะสลักอย่างประณีต",
  },
  {
    id: "coffin-2",
    name: "โลงไม้สักทอง แบบพรีเมียม",
    category: "coffin",
    price: 45000,
    image: "/images/items/coffin-2.jpg",
    vendor: "สุขสันต์ หีบศพ",
    description: "โลงไม้สักทองระดับพรีเมียม ตกแต่งทองคำเปลว",
  },
  {
    id: "coffin-3",
    name: "โกศลายไทย",
    category: "coffin",
    price: 35000,
    image: "/images/items/coffin-3.jpg",
    vendor: "ศิลป์ไทย โกศ",
    description: "โกศเซรามิกลายไทยประยุกต์",
  },
  {
    id: "coffin-4",
    name: "โลงไม้มะค่า แบบเรียบ",
    category: "coffin",
    price: 18000,
    image: "/images/items/coffin-4.jpg",
    vendor: "ช่างศิลป์ หีบศพ",
    description: "โลงไม้มะค่าเรียบหรู ดีไซน์เรียบง่าย",
  },
  // Flowers
  {
    id: "flower-1",
    name: "พวงหรีดดอกเบญจมาศ",
    category: "flowers",
    price: 3500,
    image: "/images/items/flower-1.jpg",
    vendor: "ร้านดอกไม้ สวนสวรรค์",
    description: "พวงหรีดดอกเบญจมาศสีขาวบริสุทธิ์",
    maxQuantity: 10,
  },
  {
    id: "flower-2",
    name: "พวงหรีดดอกกุหลาบขาว",
    category: "flowers",
    price: 5500,
    image: "/images/items/flower-2.jpg",
    vendor: "ร้านดอกไม้ สวนสวรรค์",
    description: "พวงหรีดดอกกุหลาบขาวจัดอย่างสวยงาม",
    maxQuantity: 10,
  },
  {
    id: "flower-3",
    name: "ดอกไม้จัดงานศพ ชุดใหญ่",
    category: "flowers",
    price: 8000,
    image: "/images/items/flower-3.jpg",
    vendor: "Flora Design",
    description: "ชุดดอกไม้จัดตกแต่งงานศพแบบครบชุด",
    maxQuantity: 5,
  },
  {
    id: "flower-4",
    name: "ดอกไม้จัดหน้าศพ แบบประหยัด",
    category: "flowers",
    price: 2000,
    image: "/images/items/flower-4.jpg",
    vendor: "ดอกไม้ ศรีสุข",
    description: "ดอกไม้จัดหน้าศพราคาประหยัด สวยงาม",
    maxQuantity: 10,
  },
  // Backdrop
  {
    id: "backdrop-1",
    name: "ฉากหลังพิธี แบบพุทธ",
    category: "backdrop",
    price: 12000,
    image: "/images/items/backdrop-1.jpg",
    vendor: "เวที สุขศรี",
    description: "ฉากหลังตกแต่งด้วยลายไทยพุทธศาสนา",
  },
  {
    id: "backdrop-2",
    name: "ฉากหลังพิธี แบบสมัยใหม่",
    category: "backdrop",
    price: 15000,
    image: "/images/items/backdrop-2.jpg",
    vendor: "เวที สุขศรี",
    description: "ฉากหลังดีไซน์สมัยใหม่ มินิมอล",
  },
  {
    id: "backdrop-3",
    name: "ฉากหลังพิธี แบบหรูหรา",
    category: "backdrop",
    price: 25000,
    image: "/images/items/backdrop-3.jpg",
    vendor: "Royal Stage",
    description: "ฉากหลังระดับหรูหรา ตกแต่งด้วยทองและผ้าไหม",
  },
  // Table
  {
    id: "table-1",
    name: "โต๊ะหมู่บูชา 5 ตัว",
    category: "table",
    price: 8000,
    image: "/images/items/table-1.jpg",
    vendor: "ร้านสังฆภัณฑ์ บุญมี",
    description: "ชุดโต๊ะหมู่บูชา 5 ตัว พร้อมผ้าคลุม",
    maxQuantity: 3,
  },
  {
    id: "table-2",
    name: "โต๊ะหมู่บูชา 9 ตัว",
    category: "table",
    price: 12000,
    image: "/images/items/table-2.jpg",
    vendor: "ร้านสังฆภัณฑ์ บุญมี",
    description: "ชุดโต๊ะหมู่บูชา 9 ตัว สำหรับงานใหญ่",
    maxQuantity: 2,
  },
  {
    id: "table-3",
    name: "โต๊ะรับแขก พร้อมผ้าคลุม",
    category: "table",
    price: 5000,
    image: "/images/items/table-3.jpg",
    vendor: "เฟอร์นิเจอร์ ศรีสมบูรณ์",
    description: "ชุดโต๊ะรับแขก 10 ชุด พร้อมเก้าอี้",
    maxQuantity: 20,
  },
  // Equipment
  {
    id: "equip-1",
    name: "ชุดสวดพระอภิธรรม",
    category: "equipment",
    price: 5000,
    image: "/images/items/equip-1.jpg",
    vendor: "สังฆภัณฑ์ วัดใหม่",
    description: "ชุดอุปกรณ์สำหรับสวดพระอภิธรรม ครบชุด",
  },
  {
    id: "equip-2",
    name: "เครื่องเสียงพิธี",
    category: "equipment",
    price: 7000,
    image: "/images/items/equip-2.jpg",
    vendor: "Sound Pro",
    description: "ชุดเครื่องเสียงสำหรับพิธีกรรม พร้อมไมค์",
  },
  {
    id: "equip-3",
    name: "ชุดอุปกรณ์รดน้ำศพ",
    category: "equipment",
    price: 3000,
    image: "/images/items/equip-3.jpg",
    vendor: "ร้านสังฆภัณฑ์ บุญมี",
    description: "ชุดอุปกรณ์รดน้ำศพ ครบชุดสมบูรณ์",
  },
  {
    id: "equip-4",
    name: "ธูปเทียนชุดใหญ่",
    category: "equipment",
    price: 1500,
    image: "/images/items/equip-4.jpg",
    vendor: "สังฆภัณฑ์ วัดใหม่",
    description: "ชุดธูปเทียน สำหรับพิธีกรรมครบชุด",
    maxQuantity: 5,
  },
];

export const funeralPackages: FuneralPackage[] = [
  {
    id: "pkg-basic-human",
    name: "แพ็คเกจพื้นฐาน",
    tier: "basic",
    price: 39900,
    description: "แพ็คเกจสำหรับงานศพเรียบง่าย ครบถ้วนในราคาประหยัด",
    funeralType: "human",
    items: [
      decorationItems[3], // coffin basic
      decorationItems[7], // flower basic
      decorationItems[8], // backdrop basic
      decorationItems[10], // table basic
      decorationItems[15], // equip basic
    ],
  },
  {
    id: "pkg-standard-human",
    name: "แพ็คเกจมาตรฐาน",
    tier: "standard",
    price: 69900,
    description: "แพ็คเกจมาตรฐาน ครบครันทุกรายละเอียด เหมาะสำหรับงานศพทั่วไป",
    funeralType: "human",
    items: [
      decorationItems[0], // coffin standard
      decorationItems[5], // flower standard
      decorationItems[8], // backdrop
      decorationItems[11], // table
      decorationItems[13], // equip
      decorationItems[14], // equip sound
    ],
  },
  {
    id: "pkg-premium-human",
    name: "แพ็คเกจพรีเมียม",
    tier: "premium",
    price: 129900,
    description: "แพ็คเกจระดับพรีเมียม หรูหราสมเกียรติ พร้อมบริการครบวงจร",
    funeralType: "human",
    items: [
      decorationItems[1], // coffin premium
      decorationItems[6], // flower premium
      decorationItems[9], // backdrop premium
      decorationItems[11], // table 9
      decorationItems[12], // table guest
      decorationItems[13], // equip
      decorationItems[14], // sound
      decorationItems[15], // water
    ],
  },
  {
    id: "pkg-basic-pet",
    name: "แพ็คเกจสัตว์เลี้ยง พื้นฐาน",
    tier: "basic",
    price: 9900,
    description: "แพ็คเกจงานอำลาสัตว์เลี้ยง เรียบง่ายและอบอุ่น",
    funeralType: "pet",
    items: [
      decorationItems[7], // flowers
      decorationItems[15], // equip basic
    ],
  },
  {
    id: "pkg-standard-pet",
    name: "แพ็คเกจสัตว์เลี้ยง มาตรฐาน",
    tier: "standard",
    price: 19900,
    description: "แพ็คเกจงานอำลาสัตว์เลี้ยง พร้อมพิธีกรรมครบถ้วน",
    funeralType: "pet",
    items: [
      decorationItems[4], // flowers
      decorationItems[8], // backdrop
      decorationItems[13], // equip
    ],
  },
  {
    id: "pkg-premium-pet",
    name: "แพ็คเกจสัตว์เลี้ยง พรีเมียม",
    tier: "premium",
    price: 35900,
    description: "แพ็คเกจงานอำลาสัตว์เลี้ยง ระดับพรีเมียม ดูแลทุกรายละเอียด",
    funeralType: "pet",
    items: [
      decorationItems[5], // flowers premium
      decorationItems[9], // backdrop premium
      decorationItems[10], // table
      decorationItems[13], // equip
      decorationItems[14], // sound
    ],
  },
];

export const extraServices: ExtraService[] = [
  // Human funeral services
  {
    id: "extra-h1",
    name: "ถ่ายภาพพิธีกรรม",
    description: "ช่างภาพมืออาชีพบันทึกภาพตลอดพิธี",
    price: 8000,
    icon: "camera",
    funeralType: "human",
  },
  {
    id: "extra-h2",
    name: "บริการรถรับ-ส่ง",
    description: "รถตู้ VIP รับ-ส่งแขกผู้ร่วมงาน 1 คัน",
    price: 5000,
    icon: "car",
    funeralType: "human",
  },
  {
    id: "extra-h3",
    name: "อาหารและเครื่องดื่ม",
    description: "ชุดอาหารว่างและเครื่องดื่มสำหรับแขก 50 ท่าน",
    price: 12000,
    icon: "utensils",
    funeralType: "human",
  },
  {
    id: "extra-h4",
    name: "พระสงฆ์ประกอบพิธี",
    description: "นิมนต์พระสงฆ์ 9 รูป ประกอบพิธีสวดอภิธรรม",
    price: 18000,
    icon: "users",
    funeralType: "human",
  },
  {
    id: "extra-h5",
    name: "ดนตรีบรรเลง",
    description: "วงดนตรีบรรเลงเพลงไทยเดิมตลอดพิธี",
    price: 9500,
    icon: "music",
    funeralType: "human",
  },
  {
    id: "extra-h6",
    name: "บริการรักษาศพ",
    description: "บริการดูแลรักษาสภาพศพโดยผู้เชี่ยวชาญ",
    price: 15000,
    icon: "shield",
    funeralType: "human",
  },
  {
    id: "extra-h7",
    name: "ของที่ระลึกสำหรับแขก",
    description: "ของที่ระลึกสำหรับแขกผู้ร่วมงาน 100 ชิ้น",
    price: 4500,
    icon: "gift",
    funeralType: "human",
  },
  {
    id: "extra-h8",
    name: "วิดีโอรำลึก",
    description: "จัดทำวิดีโอรำลึกความทรงจำจากภาพถ่ายของผู้วายชนม์",
    price: 6500,
    icon: "video",
    funeralType: "human",
  },
  // Pet funeral services
  {
    id: "extra-p1",
    name: "ถ่ายภาพพิธีอำลา",
    description: "ช่างภาพบันทึกช่วงเวลาอำลาสัตว์เลี้ยงที่รัก",
    price: 3500,
    icon: "camera",
    funeralType: "pet",
  },
  {
    id: "extra-p2",
    name: "วิดีโอรำลึกสัตว์เลี้ยง",
    description: "มอนตาจวิดีโอสั้นจากภาพถ่ายช่วงชีวิตของน้อง",
    price: 2500,
    icon: "video",
    funeralType: "pet",
  },
  {
    id: "extra-p3",
    name: "กรอบรูปรำลึก",
    description: "กรอบรูปพรีเมียมพร้อมข้อความที่ระลึกและชื่อน้อง",
    price: 1800,
    icon: "gift",
    funeralType: "pet",
  },
  {
    id: "extra-p4",
    name: "กล่องเก็บอัฐิพรีเมียม",
    description: "กล่องไม้แกะสลักสำหรับเก็บอัฐิสัตว์เลี้ยง",
    price: 3200,
    icon: "shield",
    funeralType: "pet",
  },
  {
    id: "extra-p5",
    name: "ต้นไม้รำลึก",
    description: "ปลูกต้นไม้เพื่อเป็นอนุสรณ์แทนน้องที่จากไป",
    price: 1500,
    icon: "sparkles",
    funeralType: "pet",
  },
  {
    id: "extra-p6",
    name: "พิธีสวดอุทิศส่วนกุศล",
    description: "พิธีสวดมนต์สั้น อุทิศส่วนกุศลให้สัตว์เลี้ยง",
    price: 4000,
    icon: "users",
    funeralType: "pet",
  },
];

export const funeralVenues: FuneralVenue[] = [
  {
    id: "venue-1",
    name: "วัดพระเชตุพนวิมลมังคลาราม",
    distance: 2.5,
    capacity: 200,
    contact: "02-225-9595",
    address: "2 ถ.สนามไชย แขวงพระบรมมหาราชวัง เขตพระนคร",
    lat: 13.7465,
    lng: 100.4929,
  },
  {
    id: "venue-2",
    name: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    distance: 3.1,
    capacity: 150,
    contact: "02-222-6011",
    address: "3 ถ.มหาราช แขวงพระบรมมหาราชวัง เขตพระนคร",
    lat: 13.7537,
    lng: 100.4927,
  },
  {
    id: "venue-3",
    name: "วัดธาตุทอง",
    distance: 5.2,
    capacity: 300,
    contact: "02-391-8535",
    address: "1024 ถ.สุขุมวิท แขวงพระโขนง เขตคลองเตย",
    lat: 13.7225,
    lng: 100.5814,
  },
  {
    id: "venue-4",
    name: "วัดเทพศิรินทราวาส",
    distance: 4.0,
    capacity: 250,
    contact: "02-223-5042",
    address: "เขตป้อมปราบศัตรูพ่าย",
    lat: 13.7481,
    lng: 100.5157,
  },
  {
    id: "venue-5",
    name: "วัดบวรนิเวศราชวรวิหาร",
    distance: 3.8,
    capacity: 180,
    contact: "02-281-2831",
    address: "248 ถ.พระสุเมรุ แขวงบวรนิเวศ เขตพระนคร",
    lat: 13.7614,
    lng: 100.5025,
  },
  {
    id: "venue-6",
    name: "วัดหัวลำโพง",
    distance: 1.8,
    capacity: 120,
    contact: "02-236-4295",
    address: "728 ถ.พระราม 4 แขวงสี่พระยา เขตบางรัก",
    lat: 13.7316,
    lng: 100.5188,
  },
];

export const unavailableDates = [
  "2026-02-10",
  "2026-02-14",
  "2026-02-20",
  "2026-02-28",
  "2026-03-05",
  "2026-03-12",
  "2026-03-15",
];
