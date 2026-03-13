import { ORDER_KEY } from "../data/constant"
import { INITIAL_ORDERS } from "../data/orders"
import { OrderCreate } from "../types/order"

export const createOrder = (newOrder: OrderCreate) => {
  const res = localStorage.getItem(ORDER_KEY)
  let update = INITIAL_ORDERS
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newOrder]
  } else {
    update = [...INITIAL_ORDERS, newOrder]
  }
  localStorage.setItem(ORDER_KEY, JSON.stringify(update))
}