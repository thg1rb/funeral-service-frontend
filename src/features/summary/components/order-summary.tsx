"use client"

import { useMemo } from "react"
import Link from "next/link"

import {
  Check,
  Package,
  ArrowLeft,
  MapPin,
  CalendarDays,
  Sparkles,
  CreditCard,
  Star,
  User,
} from "lucide-react"
import { Button } from "antd"
import { useOrder } from "@/src/hooks/order-context"
import { CATEGORY_LABELS, type ItemCategory } from "@/src/types/types"
import { diffDays, formatDate, formatPrice } from "@/src/utils/format"

export function OrderSummary() {
  const { order } = useOrder()
  const {
    packageName,
    items,
    extraServices,
    venue,
    startDate,
    endDate,
    customerDetails,
    totalPrice,
  } = order

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof items> = {}
    for (const si of items) {
      if (!groups[si.item.category]) groups[si.item.category] = []
      groups[si.item.category].push(si)
    }
    return groups
  }, [items])

  const nights =
    startDate && endDate ? diffDays(startDate, endDate) - 1 : 0

  return (
    <div className="mt-10">
      {/* Package badge */}
      {packageName && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <Package className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm font-semibold text-foreground">{packageName}</p>
        </div>
      )}

      {/* Items by category */}
      {Object.keys(groupedItems).length > 0 && (
        <div className="mb-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            รายการสินค้า
          </h3>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-foreground">
                  {CATEGORY_LABELS[category as ItemCategory]}
                </h4>
              </div>
              <ul className="divide-y divide-border">
                {categoryItems.map((si) => (
                  <li key={si.item.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{si.item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {si.item.vendor}
                          {si.quantity > 1 && (
                            <span className="ml-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                              x{si.quantity}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {formatPrice(si.item.price * si.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Extra Services */}
      {extraServices.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            บริการเสริม
          </h3>
          <div className="rounded-lg border border-border bg-card">
            <ul className="divide-y divide-border">
              {extraServices.map((service) => (
                <li key={service.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                      <Star className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {formatPrice(service.price)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Booking info */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              สถานที่จัดงาน
            </p>
            {venue ? (
              <>
                <p className="mt-1 text-sm font-medium text-foreground">{venue.name}</p>
                <p className="text-xs text-muted-foreground">{venue.address}</p>
              </>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">ยังไม่ได้เลือก</p>
            )}
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ช่วงเวลาจัดงาน
            </p>
            {startDate && endDate ? (
              <>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {nights === 0
                    ? "1 วัน"
                    : `${nights + 1} วัน ${nights} คืน`}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">ยังไม่ได้เลือก</p>
            )}
          </div>
        </div>
      </div>

      {/* Customer details */}
      {customerDetails && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
          <User className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ข้อมูลผู้ติดต่อ
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{customerDetails.name}</p>
            <p className="text-xs text-muted-foreground">{customerDetails.phone}</p>
            {customerDetails.email && (
              <p className="text-xs text-muted-foreground">{customerDetails.email}</p>
            )}
            {customerDetails.address && (
              <p className="text-xs text-muted-foreground">{customerDetails.address}</p>
            )}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="mb-6 rounded-lg border-2 border-primary/30 bg-card p-6">
        <div className="mb-3 flex flex-col gap-1.5">
          {items.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>รายการสินค้า ({items.reduce((s, si) => s + si.quantity, 0)} รายการ)</span>
              <span>{formatPrice(items.reduce((s, si) => s + si.item.price * si.quantity, 0))}</span>
            </div>
          )}
          {extraServices.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>บริการเสริม ({extraServices.length} รายการ)</span>
              <span>{formatPrice(extraServices.reduce((s, e) => s + e.price, 0))}</span>
            </div>
          )}
          <div className="mt-1 h-px bg-border" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            ยอดรวมทั้งสิ้น
          </div>
          <span className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Link href="/customer-details">
          <Button className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            แก้ไขข้อมูล
          </Button>
        </Link>
        <Link href="/payment">
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            ดำเนินการชำระเงิน
          </Button>
        </Link>
      </div>
    </div>
  )
}
