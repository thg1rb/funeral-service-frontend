"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type {
  FuneralType,
  OrderSummary,
} from "@/src/types/types"
import type { DecorationItem, SelectedItem } from "@/src/features/customize/types/customize"
import type { ExtraService } from "@/src/features/extra-service/types/extra-service"
import type { CustomerDetails } from "@/src/features/customer-details/types/customer-details"
import type { PaymentMethod } from "@/src/features/payment/types/payment"
import type { FuneralVenue } from "@/src/features/location/types/location"

interface OrderContextType {
  order: OrderSummary
  setFuneralType: (type: FuneralType) => void
  setPackageName: (name: string | null) => void
  addItem: (item: DecorationItem) => void
  removeItem: (itemId: string) => void
  updateItemQuantity: (itemId: string, quantity: number) => void
  setItems: (items: SelectedItem[]) => void
  toggleExtraService: (service: ExtraService) => void
  setVenue: (venue: FuneralVenue | null) => void
  setDateRange: (startDate: string | null, endDate: string | null) => void
  setCustomerDetails: (details: CustomerDetails) => void
  setPaymentMethod: (method: PaymentMethod) => void
  resetOrder: () => void
}

const defaultOrder: OrderSummary = {
  funeralType: "human",
  packageName: null,
  items: [],
  extraServices: [],
  totalPrice: 0,
  venue: null,
  startDate: null,
  endDate: null,
  customerDetails: null,
  paymentMethod: null,
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

function calcTotal(items: SelectedItem[], extraServices: ExtraService[]): number {
  const itemsTotal = items.reduce((sum, si) => sum + si.item.price * si.quantity, 0)
  const extrasTotal = extraServices.reduce((sum, s) => sum + s.price, 0)
  return itemsTotal + extrasTotal
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderSummary>(defaultOrder)

  const setFuneralType = useCallback((type: FuneralType) => {
    setOrder((prev) => ({ ...prev, funeralType: type }))
  }, [])

  const setPackageName = useCallback((name: string | null) => {
    setOrder((prev) => ({ ...prev, packageName: name }))
  }, [])

  const addItem = useCallback((item: DecorationItem) => {
    setOrder((prev) => {
      const exists = prev.items.find((si) => si.item.id === item.id)
      if (exists) return prev
      const newItems = [...prev.items, { item, quantity: 1 }]
      return {
        ...prev,
        items: newItems,
        totalPrice: calcTotal(newItems, prev.extraServices),
      }
    })
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setOrder((prev) => {
      const newItems = prev.items.filter((si) => si.item.id !== itemId)
      return {
        ...prev,
        items: newItems,
        totalPrice: calcTotal(newItems, prev.extraServices),
      }
    })
  }, [])

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    setOrder((prev) => {
      const newItems = prev.items.map((si) =>
        si.item.id === itemId ? { ...si, quantity: Math.max(1, quantity) } : si
      )
      return {
        ...prev,
        items: newItems,
        totalPrice: calcTotal(newItems, prev.extraServices),
      }
    })
  }, [])

  const setItems = useCallback((items: SelectedItem[]) => {
    setOrder((prev) => ({
      ...prev,
      items,
      totalPrice: calcTotal(items, prev.extraServices),
    }))
  }, [])

  const toggleExtraService = useCallback((service: ExtraService) => {
    setOrder((prev) => {
      const exists = prev.extraServices.find((s) => s.id === service.id)
      const newExtras = exists
        ? prev.extraServices.filter((s) => s.id !== service.id)
        : [...prev.extraServices, service]
      return {
        ...prev,
        extraServices: newExtras,
        totalPrice: calcTotal(prev.items, newExtras),
      }
    })
  }, [])

  const setVenue = useCallback((venue: FuneralVenue | null) => {
    setOrder((prev) => ({ ...prev, venue }))
  }, [])

  const setDateRange = useCallback((startDate: string | null, endDate: string | null) => {
    setOrder((prev) => ({ ...prev, startDate, endDate }))
  }, [])

  const setCustomerDetails = useCallback((details: CustomerDetails) => {
    setOrder((prev) => ({ ...prev, customerDetails: details }))
  }, [])

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setOrder((prev) => ({ ...prev, paymentMethod: method }))
  }, [])

  const resetOrder = useCallback(() => {
    setOrder(defaultOrder)
  }, [])

  return (
    <OrderContext.Provider
      value={{
        order,
        setFuneralType,
        setPackageName,
        addItem,
        removeItem,
        updateItemQuantity,
        setItems,
        toggleExtraService,
        setVenue,
        setDateRange,
        setCustomerDetails,
        setPaymentMethod,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
