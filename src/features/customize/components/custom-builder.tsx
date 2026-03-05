"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CATEGORY_LABELS,
  DecorationItem,
  ItemCategory,
  SelectedItem,
} from "@/src/types/types";
import { decorationItems } from "@/src/data/mock-data";
import { packageService } from "@/src/features/package/data/services/package";
import { cn } from "@/src/utils/utils";
import { CategoryPanel } from "./category-panel";
import { PriceSidebar } from "./price-siderbar";
import { useOrder } from "@/src/hooks/order-context";

const categories: ItemCategory[] = [
  "coffin",
  "flowers",
  "backdrop",
  "table",
  "equipment",
];

export function CustomBuilder() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package");

  const { setItems, setPackageName, items: orderItems } = useOrder();

  const initialItems: SelectedItem[] = useMemo(() => {
    if (packageId) {
      const pkg = packageService.getById(packageId);
      return (pkg?.items ?? []).map((item) => ({ item, quantity: 1 }));
    }
    return [];
  }, [packageId]);

  const [selectedItems, setSelectedItems] =
    useState<SelectedItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("coffin");

  // Sync package items to order context
  useEffect(() => {
    if (packageId) {
      const pkg = packageService.getById(packageId);
      if (pkg) {
        setItems(selectedItems);
        setPackageName(pkg.name);
      }
    }
  }, [packageId, selectedItems, setItems, setPackageName]);

  const totalPrice = selectedItems.reduce(
    (sum, si) => sum + si.item.price * si.quantity,
    0,
  );

  const toggleItem = useCallback((item: DecorationItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((si) => si.item.id === item.id);
      if (exists) {
        return prev.filter((si) => si.item.id !== item.id);
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((si) =>
        si.item.id === itemId ? { ...si, quantity: Math.max(1, quantity) } : si,
      ),
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setSelectedItems((prev) => prev.filter((si) => si.item.id !== itemId));
  }, []);

  const categoryItems = decorationItems.filter(
    (item) => item.category === activeCategory,
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat] = selectedItems.filter(
        (si) => si.item.category === cat,
      ).length;
    }
    return counts;
  }, [selectedItems]);

  return (
    <div className="mt-10 flex flex-col gap-6 lg:flex-row">
      {/* Left: category tabs + items */}
      <div className="flex-1">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "btn-gold shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {CATEGORY_LABELS[cat]}
              {categoryCounts[cat] > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground ring-2 ring-card">
                  {categoryCounts[cat]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <CategoryPanel
          items={categoryItems}
          selectedItems={selectedItems}
          onToggle={toggleItem}
          onUpdateQuantity={updateQuantity}
        />
      </div>

      {/* Right: price sidebar */}
      <PriceSidebar
        selectedItems={selectedItems}
        totalPrice={totalPrice}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
        packageId={packageId}
      />
    </div>
  );
}
