"use client";

import { DecorationItem, SelectedItem } from "@/src/types/types";
import { formatPrice } from "@/src/utils/format";
import { cn } from "@/src/utils/utils";
import { Check, Plus, Minus } from "lucide-react";

interface CategoryPanelProps {
  items: DecorationItem[];
  selectedItems: SelectedItem[];
  onToggle: (item: DecorationItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export function CategoryPanel({
  items,
  selectedItems,
  onToggle,
  onUpdateQuantity,
}: CategoryPanelProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const selectedEntry = selectedItems.find(
          (si) => si.item.id === item.id,
        );
        const isSelected = !!selectedEntry;
        const quantity = selectedEntry?.quantity ?? 1;
        const maxQty = item.maxQuantity ?? 1;
        const canHaveMultiple = maxQty > 1;

        return (
          <div
            key={item.id}
            className={cn(
              "group relative flex flex-col rounded-lg border-2 bg-card p-4 text-left transition-all",
              isSelected
                ? "border-primary shadow-md shadow-primary/10"
                : "border-border hover:border-primary/40 hover:shadow-sm",
            )}
          >
            {/* Clickable area for toggle */}
            <button
              type="button"
              onClick={() => onToggle(item)}
              className="text-left"
            >
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
            </button>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-primary">
                  {formatPrice(item.price)}
                </span>
                {canHaveMultiple && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    {"/ ชิ้น (สูงสุด "}
                    {maxQty}
                    {")"}
                  </span>
                )}
              </div>

              {isSelected && canHaveMultiple ? (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                    disabled={quantity <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                    aria-label="ลดจำนวน"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-foreground">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                    disabled={quantity >= maxQty}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-accent disabled:opacity-40"
                    aria-label="เพิ่มจำนวน"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onToggle(item)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-accent",
                  )}
                >
                  {isSelected ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {isSelected && (
              <div className="absolute -top-px -right-px rounded-bl-lg rounded-tr-lg btn-gold px-2 py-0.5 text-xs font-medium">
                {canHaveMultiple && quantity > 1
                  ? `${quantity} ชิ้น`
                  : "เลือกแล้ว"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
