import { ORDER_KEY } from "../data/constant"
import { INITIAL_ORDERS } from "../data/orders"
import { Order } from "../types/order"

export const getOrders = (): Order[] => {
  const res = localStorage.getItem(ORDER_KEY)
  let result = INITIAL_ORDERS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(ORDER_KEY, JSON.stringify(INITIAL_ORDERS))
  }

  return result
}

export const getOrderById = (id: string): Order | undefined => {
  const res = localStorage.getItem(ORDER_KEY)
  let result = INITIAL_ORDERS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(ORDER_KEY, JSON.stringify(INITIAL_ORDERS))
  }

  const targetData = result.find((element) => element.orderId === id)
  return targetData
}