"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  CalendarDays,
  MapPin,
  Home,
  Star,
} from "lucide-react";
import { Button } from "antd";
import { useOrder } from "@/src/hooks/order-context";
import { diffDays, formatDate, formatPrice } from "@/src/utils/format";

export function Completed() {
  const { order, resetOrder } = useOrder();
  const { orderId, venue, startDate, endDate, totalPrice, extraServices } = order;

  const nights = startDate && endDate ? diffDays(startDate, endDate) - 1 : 0;

  return (
    <div className="mt-10 mx-auto max-w-2xl">
      {/* Success header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <div className="absolute inset-0 scale-125 rounded-full bg-primary/10 blur-lg" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          ดำเนินการเรียบร้อยแล้ว
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          ขอบคุณที่ไว้วางใจบริการของเรา
          <br />
          ทีมงานจะติดต่อกลับภายใน 2 ชั่วโมงเพื่อยืนยันรายละเอียด
        </p>
      </div>

      {/* Booking reference */}
      {orderId && (
        <div className="mb-6 rounded-lg border-2 border-primary/30 bg-card p-6">
          <p className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            หมายเลขการจอง
          </p>
          <p className="font-mono text-2xl font-bold text-primary">
            {orderId}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            กรุณาเก็บหมายเลขนี้ไว้เพื่ออ้างอิงในการติดต่อ
          </p>
        </div>
      )}

      {/* Order summary card */}
      <div className="mb-6 rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          สรุปการจอง
        </h3>
        <div className="flex flex-col gap-4">
          {startDate && endDate && (
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">ช่วงเวลาจัดงาน</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {nights === 0 ? "1 วัน" : `${nights + 1} วัน ${nights} คืน`}
                </p>
              </div>
            </div>
          )}

          {venue && (
            <>
              <div className="h-px bg-border" />
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">สถานที่จัดงาน</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {venue.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {venue.address}
                  </p>
                </div>
              </div>
            </>
          )}

          {extraServices.length > 0 && (
            <>
              <div className="h-px bg-border" />
              <div className="flex items-start gap-3">
                <Star className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">บริการเสริม</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {extraServices.map((s) => s.name).join(", ")}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">ยอดชำระทั้งสิ้น</p>
            <p className="text-lg font-bold text-primary">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Contact box */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border border-border bg-card p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Phone className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            ต้องการความช่วยเหลือ?
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            ติดต่อทีมงานได้ตลอด 24 ชั่วโมง
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href="tel:020000000"
              className="text-sm font-semibold text-primary hover:underline"
            >
              02-000-0000
            </a>
            <span className="text-muted-foreground">·</span>
            <a
              href="https://line.me"
              className="text-sm font-semibold text-primary hover:underline"
            >
              LINE: @suksan-ritual
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/">
          <Button type="primary" className="gap-2" onClick={resetOrder}>
            <Home className="h-4 w-4" />
            กลับหน้าแรก
          </Button>
        </Link>
      </div>
    </div>
  );
}
