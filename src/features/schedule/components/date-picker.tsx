"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CalendarDays, Check, AlertCircle, ArrowRight } from "lucide-react"
import { DatePicker as AntDatePicker, Button } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useOrder } from "@/src/hooks/order-context"
import { formatDate, diffDays } from "@/src/utils/format"
import { locationService } from "@/src/features/location/data/services/location"
import { scheduleService } from "@/src/features/schedule/data/services/schedule"

const { RangePicker } = AntDatePicker

export function DatePicker() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const venueId = searchParams.get("venue")
  const { setDateRange, setVenue, order } = useOrder()
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null)

  // Initialize services
  useEffect(() => {
    scheduleService.init()
    locationService.init()
  }, [])

  // Load venue from URL parameter if not already set
  useEffect(() => {
    if (venueId && !order.venue) {
      const foundVenue = locationService.getById(venueId)
      if (foundVenue) {
        setVenue(foundVenue)
      }
    }
  }, [venueId, order.venue, setVenue])

  // Convert unavailable dates to dayjs format for disabled dates
  const disabledDates = scheduleService.getAll().map((d) => dayjs(d).format("YYYY-MM-DD"))
  const today = dayjs().format("YYYY-MM-DD")

  const disabledDate = (current: Dayjs) => {
    if (!current) return false
    const formatted = current.format("YYYY-MM-DD")
    return (
      formatted < today ||
      disabledDates.includes(formatted)
    )
  }

  const startDate = dates?.[0]
  const endDate = dates?.[1]
  const isComplete = !!startDate && !!endDate

  const nights = isComplete
    ? diffDays(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD")) - 1
    : 0

  const hasUnavailableInRange = (start: Dayjs, end: Dayjs): boolean => {
    let current = start
    while (current.isBefore(end) || current.isSame(end, "day")) {
      if (disabledDates.includes(current.format("YYYY-MM-DD"))) {
        return true
      }
      current = current.add(1, "day")
    }
    return false
  }

  const handleConfirm = () => {
    if (isComplete && startDate && endDate) {
      const startDateStr = startDate.format("YYYY-MM-DD")
      const endDateStr = endDate.format("YYYY-MM-DD")

      // Save to order context
      setDateRange(startDateStr, endDateStr)

      // Add to booked dates (simulate other users' bookings)
      scheduleService.addBookedDates(startDateStr, endDateStr)

      router.push("/customer-details")
    }
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
      {/* Calendar */}
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          เลือกวันเริ่มต้นแล้วลากเพื่อเลือกช่วงเวลา
        </p>
        <RangePicker
          value={dates}
          onChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              // Check if any date in the range is unavailable
              if (hasUnavailableInRange(dates[0], dates[1])) {
                // Clear the selection if the range contains unavailable dates
                setDates(null)
              } else {
                setDates([dates[0], dates[1]])
              }
            } else {
              setDates(null)
            }
          }}
          disabledDate={disabledDate}
          inputReadOnly
          format="DD MMM YYYY"
          placeholder={["วันเริ่มต้น", "วันสิ้นสุด"]}
          className="w-full"
          classNames={{ popup: "responsive-range-picker" }}
          size="large"
        />
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm btn-gold" />
            <span>วันที่เลือก</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-primary/20" />
            <span>ช่วงที่เลือก</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-muted border border-border" />
            <span>ไม่ว่าง</span>
          </div>
        </div>
      </div>

      {/* Summary panel */}
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <CalendarDays className="h-5 w-5 text-primary" />
            ช่วงเวลาจัดงาน
          </h3>

          {startDate ? (
            <div className="mt-4 flex flex-col gap-3">
              {/* Start date */}
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">วันเริ่มต้น</p>
                <div className="mt-1 flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <p className="text-sm font-bold text-foreground">
                    {formatDate(startDate.format("YYYY-MM-DD"))}
                  </p>
                </div>
              </div>

              {/* End date */}
              <div className={`rounded-lg p-4 ${endDate ? "bg-muted/50" : "border border-dashed border-border bg-muted/20"}`}>
                <p className="text-xs font-medium text-muted-foreground">วันสิ้นสุด</p>
                {endDate ? (
                  <div className="mt-1 flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <p className="text-sm font-bold text-foreground">
                      {formatDate(endDate.format("YYYY-MM-DD"))}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    กรุณาเลือกวันสิ้นสุด
                  </p>
                )}
              </div>

              {/* Duration */}
              {isComplete && nights >= 0 && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-medium text-muted-foreground">ระยะเวลา</p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {nights === 0
                      ? "1 วัน (วันเดียว)"
                      : `${nights + 1} วัน ${nights} คืน`}
                  </p>
                </div>
              )}

              {isComplete && (
                <Button className="mt-2 w-full gap-2" onClick={handleConfirm}>
                  ยืนยันช่วงเวลา
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                กรุณาเลือกวันเริ่มต้นจากปฏิทิน
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
