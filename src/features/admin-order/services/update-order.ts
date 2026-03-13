import { ORDER_KEY } from "../data/constant"
import { INITIAL_ORDERS } from "../data/orders"
import { Order, OrderUpdate } from "../types/order"

export const updateOrder = (newOrder: OrderUpdate, id: string) => {
  const res = localStorage.getItem(ORDER_KEY)
  let data = INITIAL_ORDERS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: Order | undefined = data.find((element) => element.orderId === id)
  if (targetData !== undefined) {
    targetData.customerDetails = newOrder.customerDetails
    targetData.endDate = newOrder.endDate
    targetData.extraServices = newOrder.extraServices
    targetData.funeralType = newOrder.funeralType
    targetData.items = newOrder.items
    targetData.paymentMethod = newOrder.paymentMethod
    targetData.startDate = newOrder.startDate
    targetData.status = newOrder.status
    targetData.totalPrice = newOrder.totalPrice
    targetData.vanue = newOrder.vanue
    localStorage.setItem(ORDER_KEY, JSON.stringify(data))
  }
}