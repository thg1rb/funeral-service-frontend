"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { Pagination } from "antd"
import {
  Camera,
  Car,
  Utensils,
  Users,
  Music,
  Video,
  Shield,
  Gift,
  Sparkles,
  Check,
  Plus,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { useOrder } from "@/src/hooks/order-context"
import type { ExtraService } from "@/src/features/extra-service/types/extra-service"
import { extraService } from "@/src/features/extra-service/data/services/extra-service"
import { packageService } from "@/src/features/package/data/services/package"
import { cn } from "@/src/utils/utils"
import { Button } from "antd"
import { formatPrice } from "@/src/utils/format"

const iconMap: Record<string, React.ElementType> = {
  camera: Camera,
  car: Car,
  utensils: Utensils,
  users: Users,
  music: Music,
  video: Video,
  shield: Shield,
  gift: Gift,
  sparkles: Sparkles,
}

const ITEMS_PER_PAGE = 6

export function ExtraServicesSelector() {
  // 1. เพิ่ม state เพื่อเช็คว่าโหลดที่ฝั่ง Client หรือยัง
  const [isClient, setIsClient] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const searchParams = useSearchParams()
  const packageId = searchParams.get("package")
  const custom = searchParams.get("custom")

  const { order, toggleExtraService, setItems, setPackageName } = useOrder()
  const { funeralType, extraServices: selectedServices, items } = order

  // Initialize extra service
  useEffect(() => {
    // 2. ตั้งค่าเป็น true เมื่อ Component ทำงานที่ Browser
    setIsClient(true)
    extraService.init()
  }, [])

  // Load package items
  useEffect(() => {
    if (isClient && packageId && items.length === 0) {
      const pkg = packageService.getById(packageId)
      if (pkg) {
        const packageItems = pkg.items.map((item) => ({ item, quantity: 1 }))
        setItems(packageItems)
        setPackageName(pkg.name)
      }
    }
  }, [packageId, items.length, setItems, setPackageName, isClient])

  // Handle page change - must be called before early return
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // 3. ถ้ายังไม่เป็น Client ให้ Return null หรือ Loading (เพื่อความสมบูรณ์ของ Hydration)
  if (!isClient) {
    return <div className="mt-10 min-h-[400px] flex items-center justify-center text-muted-foreground">กำลังโหลดบริการ...</div>
  }

  // --- Logic ทั้งหมดจะทำงานหลังจากเป็น Client แล้วเท่านั้น ---
  const filtered = extraService.getByFuneralType(funeralType)

  // Pagination logic
  const totalServices = filtered.length
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedServices = filtered.slice(startIndex, endIndex)

  const validSelectedServices = selectedServices.filter(
    (s) => s.funeralType === funeralType || s.funeralType === "both"
  )

  const isSelected = (service: ExtraService) =>
    !!validSelectedServices.find((s) => s.id === service.id)

  const extrasTotal = validSelectedServices.reduce((sum, s) => sum + s.price, 0)

  const nextHref = packageId
    ? `/locations?package=${packageId}`
    : custom
      ? "/locations?custom=true"
      : "/locations"

  const backHref = packageId ? "/packages" : "/customize"
  const typeLabel = funeralType === "pet" ? "งานอำลาสัตว์เลี้ยง" : "งานศพ"

  return (
    <div className="mt-10 flex flex-col gap-2">
      <div className="mb-6 w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
        บริการเสริมสำหรับ{typeLabel}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedServices.map((service) => {
          const selected = isSelected(service)
          const Icon = iconMap[service.icon] ?? Gift

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => toggleExtraService(service)}
              className={cn(
                "group relative flex flex-col rounded-lg border-2 bg-card p-5 text-left transition-all",
                selected
                  ? "border-primary shadow-md shadow-primary/10"
                  : "border-border hover:border-primary/40 hover:shadow-sm"
              )}
            >
              {selected && (
                <div className="absolute -top-px -right-px rounded-bl-lg rounded-tr-lg btn-gold px-2 py-0.5 text-xs font-medium">
                  เลือกแล้ว
                </div>
              )}

              <div className={cn(
                  "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                  selected ? "bg-primary/15" : "bg-muted group-hover:bg-primary/10"
                )}>
                <Icon className={cn(
                    "h-6 w-6 transition-colors",
                    selected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )}
                />
              </div>

              <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
              <p className="mt-1 flex-1 text-xs text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  {formatPrice(service.price)}
                </span>
                <div className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                    selected ? "btn-gold" : "bg-muted text-muted-foreground group-hover:bg-accent"
                  )}>
                  {selected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Pagination */}
      {totalServices > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={totalServices}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}

      <div className="mt-10 flex flex-col gap-4 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {validSelectedServices.length > 0 ? (
            <>
              <p className="text-sm font-medium text-foreground">
                เลือก {validSelectedServices.length} บริการเสริม
              </p>
              <p className="text-xs text-muted-foreground">
                {"บวกเพิ่ม "}
                <span className="font-semibold text-primary">{formatPrice(extrasTotal)}</span>
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">ข้ามขั้นตอนนี้ได้หากไม่ต้องการบริการเสริม</p>
          )}
        </div>
        <div className="flex gap-3">
          <Link href={backHref}>
            <Button className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              ย้อนกลับ
            </Button>
          </Link>
          <Link href={nextHref}>
            <Button className="gap-2">
              {validSelectedServices.length > 0 ? "ยืนยันบริการเสริม" : "ข้ามขั้นตอนนี้"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
