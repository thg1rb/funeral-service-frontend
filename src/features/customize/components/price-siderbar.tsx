"use client";

import Link from "next/link";
import { X, ShoppingCart, Minus, Plus } from "lucide-react";
import type { SelectedItem } from "@/src/features/customize/types/customize";
import { CATEGORY_LABELS } from "@/src/features/customize/types/customize";
import { formatPrice } from "@/src/utils/format";
import { Button } from "antd";

interface PriceSidebarProps {
  selectedItems: SelectedItem[];
  totalPrice: number;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  packageId?: string | null;
}

export function PriceSidebar({
  selectedItems,
  totalPrice,
  onRemove,
  onUpdateQuantity,
  packageId,
}: PriceSidebarProps) {
  const totalItemCount = selectedItems.reduce(
    (sum, si) => sum + si.quantity,
    0,
  );

  return (
    <div className="w-full shrink-0 lg:w-80">
      <div className="sticky top-20 rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h3 className="text-base font-semibold text-foreground">
            สรุปรายการ
          </h3>
          <span className="ml-auto text-sm text-muted-foreground">
            {totalItemCount}
            {" รายการ"}
          </span>
        </div>

        {selectedItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            ยังไม่มีรายการที่เลือก
          </p>
        ) : (
          <ul className="mt-3 flex max-h-[400px] flex-col gap-2 overflow-y-auto">
            {selectedItems.map((si) => {
              const maxQty = si.item.maxQuantity ?? 1;
              const canHaveMultiple = maxQty > 1;

              return (
                <li
                  key={si.item.id}
                  className="rounded-md bg-muted/50 px-3 py-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {si.item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {CATEGORY_LABELS[si.item.category]}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(si.item.id)}
                      className="mt-0.5 shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`ลบ ${si.item.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between">
                    {canHaveMultiple ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(si.item.id, si.quantity - 1)
                          }
                          disabled={si.quantity <= 1}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-card text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                          aria-label="ลดจำนวน"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-foreground">
                          {si.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(si.item.id, si.quantity + 1)
                          }
                          disabled={si.quantity >= maxQty}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-card text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                          aria-label="เพิ่มจำนวน"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {"x1"}
                      </span>
                    )}
                    <p className="text-xs font-medium text-primary">
                      {formatPrice(si.item.price * si.quantity)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              ราคารวม
            </span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link href={packageId ? `/extra-services?package=${packageId}` : "/extra-services"}>
            <Button className="w-full" disabled={selectedItems.length === 0}>
              ไปบริการเสริม
            </Button>
          </Link>
          <Link href="/packages">
            <Button className="w-full">กลับไปเลือกแพ็คเกจ</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
