import { PartnerStatus, PartnerType } from "../../admin-partner/types/enum";
import { Partner } from "../../admin-partner/types/partner";

export const INITIAL_LOCATIONS: Partner[] = [
  {
    id: "venue-1",
    name: "วัดพระเชตุพนวิมลมังคลาราม",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระธรรมรัตนากร",
    ownerTel: "02-225-9595",
    address: "2 ถ.สนามไชย แขวงพระบรมมหาราชวัง เขตพระนคร",
    status: PartnerStatus.ACTIVE,
    capacity: 250, // สุ่ม
    lat: 13.7465,
    lng: 100.4929,
  },
  {
    id: "venue-2",
    name: "วัดมหาธาตุยุวราชรังสฤษฎิ์",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระธรรมวชิรมุนี",
    ownerTel: "02-222-6011",
    address: "3 ถ.มหาราช แขวงพระบรมมหาราชวัง เขตพระนคร",
    status: PartnerStatus.ACTIVE,
    capacity: 180, // สุ่ม
    lat: 13.7537,
    lng: 100.4927,
  },
  {
    id: "venue-3",
    name: "วัดธาตุทอง",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระราชวรญาณโสภณ",
    ownerTel: "02-391-8535",
    address: "1024 ถ.สุขุมวิท แขวงพระโขนง เขตคลองเตย",
    status: PartnerStatus.ACTIVE,
    capacity: 450, // สุ่ม
    lat: 13.7225,
    lng: 100.5814,
  },
  {
    id: "venue-4",
    name: "วัดเทพศิรินทราวาส",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระธรรมธัชมุนี",
    ownerTel: "02-223-5042",
    address: "เขตป้อมปราบศัตรูพ่าย กรุงเทพมหานคร",
    status: PartnerStatus.ACTIVE,
    capacity: 320, // สุ่ม
    lat: 13.7481,
    lng: 100.5157,
  },
  {
    id: "venue-5",
    name: "วัดบวรนิเวศราชวรวิหาร",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระธรรมวิสุทธาจารย์",
    ownerTel: "02-281-2831",
    address: "248 ถ.พระสุเมรุ แขวงบวรนิเวศ เขตพระนคร",
    status: PartnerStatus.ACTIVE,
    capacity: 210, // สุ่ม
    lat: 13.7614,
    lng: 100.5025,
  },
  {
    id: "venue-6",
    name: "วัดหัวลำโพง",
    type: PartnerType.AVENUE,
    category: "วัด",
    ownerName: "พระเทพวิสุทธิเมธี",
    ownerTel: "02-236-4295",
    address: "728 ถ.พระราม 4 แขวงสี่พระยา เขตบางรัก",
    status: PartnerStatus.ACTIVE,
    capacity: 140, // สุ่ม
    lat: 13.7316,
    lng: 100.5188,
  },
];