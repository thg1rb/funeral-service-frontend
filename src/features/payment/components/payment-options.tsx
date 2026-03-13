"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import {
  CreditCard,
  Building2,
  QrCode,
  Check,
  ArrowLeft,
  Lock,
  Loader2,
  ChevronRight,
} from "lucide-react";
import type { PaymentMethod } from "@/src/features/payment/types/payment";
import { formatPrice } from "@/src/utils/format";
import { cn } from "@/src/utils/utils";
import { Button } from "antd";
import { useOrder } from "@/src/hooks/order-context";
import { OrderCreate } from "../../admin-order/types/order";
import { createOrder } from "../../admin-order/services/create-order";
import { OrderStatus } from "../../admin-order/types/enums";


interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  Icon: React.ElementType;
}

const paymentOptions: PaymentOption[] = [
  {
    id: "bank_transfer",
    label: "โอนเงินผ่านธนาคาร",
    description: "โอนเงินผ่าน Internet Banking หรือ Mobile Banking",
    Icon: Building2,
  },
  {
    id: "qr_code",
    label: "QR Code พร้อมเพย์",
    description: "สแกน QR Code เพื่อชำระผ่าน PromptPay",
    Icon: QrCode,
  },
  {
    id: "credit_card",
    label: "บัตรเครดิต / เดบิต",
    description: "รองรับ Visa, Mastercard และ JCB",
    Icon: CreditCard,
  },
];

const bankDetails = {
  bankName: "ธนาคารกสิกรไทย",
  accountName: "บริษัท สุขสันต์ พิธีกรรม จำกัด",
  accountNumber: "123-4-56789-0",
};

export function PaymentOptions() {
  const router = useRouter();
  const { order, setPaymentMethod, setOrderId } = useOrder();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateOrder = () => {
    if (selectedMethod === null) {
      return
    }
    if (!order.customerDetails || !order.startDate || !order.endDate || !order.venue) {
      console.error("Missing required order details");
      return
    }
    const orderId = uuidv4()
    setOrderId(orderId)
    const newOrder: OrderCreate = {
      orderId,
      customerDetails: order.customerDetails,
      endDate: order.endDate,
      extraServices: order.extraServices,
      funeralType: order.funeralType,
      items: order.items,
      paymentMethod: selectedMethod,
      startDate: order.startDate,
      totalPrice: order.totalPrice,
      vanue: order.venue,
      status: OrderStatus.PENDING,
    }
    createOrder(newOrder)
  }

  const handlePay = () => {
    if (!selectedMethod) return;
    // Save payment method to order context
    setPaymentMethod(selectedMethod);
    setIsProcessing(true);
    setTimeout(() => {
      // Log the complete order when payment is completed
      // Include payment method directly since state update is async
      console.log("=== ORDER COMPLETED ===");
      handleCreateOrder()
      console.log("Order:", { ...order, paymentMethod: selectedMethod });
      console.log("=====================");
      router.push("/completed");
    }, 2000);
  };

  return (
    <div className="mt-10 mx-auto max-w-2xl">
      {/* Order total pill */}
      <div className="mb-8 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-5 py-4">
        <div>
          <p className="text-xs text-muted-foreground">ยอดชำระทั้งสิ้น</p>
          <p className="text-2xl font-bold text-primary">
            {formatPrice(order.totalPrice)}
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground border border-border">
          <Lock className="h-3 w-3 text-primary" />
          ปลอดภัย
        </div>
      </div>

      {/* Payment method selection */}
      <div className="flex flex-col gap-3">
        {paymentOptions.map(({ id, label, description, Icon }) => {
          const isSelected = selectedMethod === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedMethod(id)}
              className={cn(
                "flex items-center gap-4 rounded-lg border-2 bg-card p-4 text-left transition-all",
                isSelected
                  ? "border-primary shadow-md shadow-primary/10"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                  isSelected ? "bg-primary/15" : "bg-muted",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isSelected ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border bg-transparent",
                )}
              >
                {isSelected && (
                  <Check className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bank transfer details */}
      {selectedMethod === "bank_transfer" && (
        <div className="mt-6 rounded-lg border border-border bg-card p-5">
          <p className="mb-3 text-sm font-semibold text-foreground">
            รายละเอียดบัญชีโอนเงิน
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ธนาคาร</span>
              <span className="font-medium text-foreground">
                {bankDetails.bankName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ชื่อบัญชี</span>
              <span className="font-medium text-foreground">
                {bankDetails.accountName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">เลขที่บัญชี</span>
              <span className="font-mono font-semibold text-primary">
                {bankDetails.accountNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">จำนวนเงิน</span>
              <span className="font-bold text-primary">
                {formatPrice(order.totalPrice)}
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            หลังโอนเงิน กรุณาส่งหลักฐานการโอนมาที่ LINE: @suksan-ritual
          </p>
        </div>
      )}

      {/* QR Code mock */}
      {selectedMethod === "qr_code" && (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6">
          <p className="text-sm font-semibold text-foreground">
            สแกน QR Code เพื่อชำระเงิน
          </p>
          <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-muted">
            <QrCode className="h-20 w-20 text-muted-foreground/40" />
          </div>
          <p className="text-center text-xs text-muted-foreground">
            รองรับ PromptPay ทุกธนาคาร
            <br />
            ยอด{" "}
            <span className="font-semibold text-primary">
              {formatPrice(order.totalPrice)}
            </span>
          </p>
        </div>
      )}

      {/* Credit card mock */}
      {selectedMethod === "credit_card" && (
        <div className="mt-6 rounded-lg border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">
            ข้อมูลบัตร
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                หมายเลขบัตร
              </label>
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2.5">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm text-muted-foreground">
                  •••• •••• •••• ••••
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  วันหมดอายุ
                </label>
                <div className="rounded-md border border-border bg-muted/50 px-3 py-2.5 font-mono text-sm text-muted-foreground">
                  MM / YY
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  CVV
                </label>
                <div className="rounded-md border border-border bg-muted/50 px-3 py-2.5 font-mono text-sm text-muted-foreground">
                  •••
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" /> ข้อมูลถูกเข้ารหัสด้วย SSL 256-bit
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          className="gap-2 bg-transparent"
          onClick={() => router.push("/summary")}
        >
          <ArrowLeft className="h-4 w-4" />
          ย้อนกลับ
        </Button>
        <Button
          className="gap-2"
          disabled={!selectedMethod || isProcessing}
          onClick={handlePay}
        >
          {isProcessing ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              กำลังดำเนินการ...
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center">
              ยืนยันการชำระเงิน
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
