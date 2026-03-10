import { FuneralPackage } from "../types/package";

export const INITIAL_FUNERAL_PACKAGES: FuneralPackage[] = [
  {
    id: "pkg-basic-human",
    name: "แพ็คเกจพื้นฐาน",
    tier: "basic",
    price: 39900,
    description: "แพ็คเกจสำหรับงานศพเรียบง่าย ครบถ้วนในราคาประหยัด",
    funeralType: "human",
    items: [
      { id: "mf-08", quantity: 1 }, // หีบศพขาวลายเทพนม (มาตรฐาน)
      { id: "mf-02", quantity: 2 }, // พวงหรีดดอกไม้สด
      { id: "mf-04", quantity: 1 }, // ฉาก Backdrop ผ้าไหม
      { id: "mf-07", quantity: 1 }, // โต๊ะหมู่บูชา
      { id: "br-01", quantity: 100 }, // ของชำร่วยยาหม่อง
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
      { id: "sy-02", quantity: 1 }, // หีบศพปรับอากาศ (โลงเย็น)
      { id: "mf-10", quantity: 2 }, // แจกันดอกไม้หน้าหีบ
      { id: "sy-04", quantity: 1 }, // Backdrop ลายจิตรกรรม
      { id: "sy-05", quantity: 1 }, // แท่นตั้งหีบศพขาสิงห์
      { id: "sy-06", quantity: 1 }, // ชุดเครื่องทองน้อย
      { id: "rr-01", quantity: 5 },  // ชุดสังฆทานยา
      { id: "br-02", quantity: 50 }, // ของชำร่วยร่มพับ
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
      { id: "sy-01", quantity: 1 }, // หีบศพไม้สักทอง แกะสลัก
      { id: "mf-01", quantity: 1 }, // จัดดอกไม้ชุดนกยูงคู่บารมี
      { id: "pd-03", quantity: 1 }, // Backdrop ไวนิลรูปผู้เสียชีวิต
      { id: "rr-04", quantity: 1 }, // โต๊ะหมู่บูชาไม้สักแท้หน้า 9
      { id: "rn-02", quantity: 2 }, // กระเพาะปลา (สำหรับแขก 100 ท่าน)
      { id: "pd-04", quantity: 1 }, // โต๊ะลงนามคำไว้อาลัย
      { id: "sy-07", quantity: 1 }, // โกศเซรามิกเบญจรงค์
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
      { id: "mf-02", quantity: 1 }, // พวงหรีดดอกไม้สด
      { id: "pd-05", quantity: 1 }, // สติ๊กเกอร์ติดของที่ระลึก
      { id: "br-10", quantity: 20 }, // สเปรย์แอลกอฮอล์
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
      { id: "sy-09", quantity: 1 }, // จัดดอกไม้หน้าหีบแบบทันสมัย
      { id: "mf-04", quantity: 1 }, // ฉาก Backdrop ผ้าไหม
      { id: "sy-10", quantity: 1 }, // เชิงเทียนและกระถางธูปทองเหลือง
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
      { id: "mf-01", quantity: 1 }, // ดอกไม้นกยูงชุดเล็ก
      { id: "sy-04", quantity: 1 }, // Backdrop ลายจิตรกรรม
      { id: "br-07", quantity: 1 }, // โต๊ะวางของ
      { id: "rn-01", quantity: 30 }, // Snack Box รสนิยม
      { id: "sy-07", quantity: 1 }, // โกศเซรามิกเบญจรงค์
    ],
  },
];