import type {
  DecorationItem,
  FuneralPackage,
  FuneralVenue,
  BlogPost,
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

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "การจัดงานศพแบบพุทธ: สิ่งที่ควรรู้",
    excerpt:
      "เรียนรู้ขั้นตอนและพิธีกรรมทางพุทธศาสนาในการจัดงานศพ ตั้งแต่การรดน้ำศพจนถึงการฌาปนกิจ",
    content: `<h2>การจัดงานศพแบบพุทธศาสนา</h2>
<p>การจัดงานศพในพุทธศาสนาเป็นพิธีกรรมที่สำคัญ เป็นการแสดงความเคารพและอาลัยต่อผู้วายชนม์ รวมถึงเป็นการทำบุญอุทิศส่วนกุศลให้แก่ผู้ล่วงลับ</p>
<h3>ขั้นตอนสำคัญ</h3>
<p>1. การรดน้ำศพ - เป็นพิธีแรกหลังจากผู้วายชนม์เสียชีวิต</p>
<p>2. การสวดพระอภิธรรม - จัดสวดพระอภิธรรมทุกคืน</p>
<p>3. การฌาปนกิจ - พิธีเผาศพซึ่งเป็นขั้นตอนสุดท้าย</p>
<h3>สิ่งที่ควรเตรียม</h3>
<p>การเตรียมงานศพต้องใช้เวลาและความใส่ใจ ควรปรึกษาผู้เชี่ยวชาญเพื่อให้การจัดงานเป็นไปอย่างราบรื่น</p>`,
    author: "พระอาจารย์สมชาย",
    date: "2026-01-15",
    image: "/images/blog/blog-1.jpg",
    category: "ความรู้",
  },
  {
    id: "blog-2",
    title: "วิธีเลือกพวงหรีดให้เหมาะสม",
    excerpt:
      "แนะนำการเลือกพวงหรีดที่เหมาะสมสำหรับงานศพ ทั้งประเภท สีสัน และความหมาย",
    content: `<h2>การเลือกพวงหรีดอย่างเหมาะสม</h2>
<p>พวงหรีดเป็นสัญลักษณ์แห่งความอาลัย การเลือกพวงหรีดที่เหมาะสมจึงเป็นสิ่งสำคัญ</p>
<h3>ประเภทของพวงหรีด</h3>
<p>1. พวงหรีดดอกไม้สด - ใช้ดอกไม้สดจัดอย่างสวยงาม</p>
<p>2. พวงหรีดผ้า - ทำจากผ้าสีขาวหรือสีดำ</p>
<p>3. พวงหรีดพัดลม - เป็นของใช้ที่เป็นประโยชน์</p>`,
    author: "คุณสมหญิง รักดอกไม้",
    date: "2026-01-20",
    image: "/images/blog/blog-2.jpg",
    category: "แนะนำ",
  },
  {
    id: "blog-3",
    title: "การดูแลจิตใจหลังสูญเสีย",
    excerpt:
      "บทความเพื่อผู้ที่กำลังเผชิญกับการสูญเสีย พร้อมแนวทางในการดูแลจิตใจ",
    content: `<h2>การดูแลจิตใจหลังสูญเสียคนที่รัก</h2>
<p>การสูญเสียคนที่รักเป็นเหตุการณ์ที่เจ็บปวดที่สุดอย่างหนึ่งในชีวิต การดูแลจิตใจในช่วงเวลานี้จึงเป็นสิ่งสำคัญ</p>
<h3>ขั้นตอนของการยอมรับ</h3>
<p>1. การปฏิเสธ - เป็นปฏิกิริยาแรกที่เกิดขึ้น</p>
<p>2. ความโกรธ - อาจรู้สึกโกรธและไม่ยุติธรรม</p>
<p>3. การต่อรอง - พยายามหาทางย้อนกลับ</p>
<p>4. ความเศร้า - ช่วงเวลาที่เจ็บปวดที่สุด</p>
<p>5. การยอมรับ - เริ่มปรับตัวและก้าวต่อไป</p>`,
    author: "ดร.สุภาพร จิตดี",
    date: "2026-02-01",
    image: "/images/blog/blog-3.jpg",
    category: "สุขภาพจิต",
  },
  {
    id: "blog-4",
    title: "งานอำลาสัตว์เลี้ยง: เพราะเขาคือครอบครัว",
    excerpt:
      "เรื่องราวและแนวทางในการจัดงานอำลาสัตว์เลี้ยงที่รัก อย่างเหมาะสมและอบอุ่น",
    content: `<h2>งานอำลาสัตว์เลี้ยง</h2>
<p>สัตว์เลี้ยงเป็นส่วนหนึ่งของครอบครัว การจากลาจึงเป็นเรื่องที่เจ็บปวดไม่ต่างกัน</p>
<h3>ทำไมต้องจัดงานอำลา</h3>
<p>การจัดงานอำลาช่วยให้เจ้าของได้แสดงความรักและความอาลัยต่อสัตว์เลี้ยง เป็นกระบวนการที่ช่วยในการรับมือกับการสูญเสีย</p>`,
    author: "คุณรักสัตว์ ใจดี",
    date: "2026-02-03",
    image: "/images/blog/blog-4.jpg",
    category: "สัตว์เลี้ยง",
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
