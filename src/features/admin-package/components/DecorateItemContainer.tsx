"use client"
import { formatPrice } from "@/src/utils/format";
import { DecorationItem } from "../../customize/types/customize";
import { cn } from "@/src/utils/utils";

// 1. รับ props ที่ส่งมาจาก Parent (PackageItemList)
interface DecorateItemContainerProps {
  item: DecorationItem
  packageId: string
  isSelected: boolean;    // สถานะว่าถูกเลือกอยู่ใน array หรือไม่
  onToggle: () => void;   // ฟังก์ชันสำหรับสลับสถานะ (Add/Remove)
}

export default function DecorateItemContainer({ 
  item, 
  isSelected, 
  onToggle 
}: DecorateItemContainerProps) {

  // ลบ useState และ useEffect เดิมออก เพราะเราจะใช้ค่าจาก props แทน
  // เพื่อให้ UI อัปเดตทันทีที่ Parent มีการเปลี่ยนแปลง state

  return (
    <div
      onClick={onToggle} // 2. เมื่อคลิกที่ตัว Card ให้เรียกฟังก์ชัน onToggle
      className={cn(
        "group relative flex flex-col rounded-lg border-2 bg-card p-4 text-left transition-all cursor-pointer", // เพิ่ม cursor-pointer
        isSelected
          ? "border-primary shadow-md shadow-primary/10 bg-primary/5" // ไฮไลท์สีพื้นเล็กน้อยเมื่อถูกเลือก
          : "border-border hover:border-primary/40 hover:shadow-sm",
      )}
    >
      <div className="text-left">
        <div className="mb-3 flex h-32 items-center justify-center rounded-md bg-muted">
          <span className="text-xs text-muted-foreground">
            {item.name}
          </span>
        </div>

        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">
            {item.name}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.description}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {"ผู้ให้บริการ: "}
            {item.vendor}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-start flex-1 pb-5">
        <div>
          <span className="text-sm font-bold text-primary">
            {formatPrice(item.price)}
          </span>
          <span className="ml-1 text-xs text-muted-foreground">
            {"/ ชิ้น (สูงสุด "}
            {item.maxQuantity}
            {")"}
          </span>
        </div>
      </div>

      {/* 3. แสดงป้ายกำกับเมื่อ isSelected เป็น true */}
      {isSelected && (
        <div className="absolute -top-px -right-px rounded-bl-lg rounded-tr-lg btn-gold px-2 py-0.5 text-xs font-medium">
          เลือกแล้ว
        </div>
      )}
    </div>
  )
}