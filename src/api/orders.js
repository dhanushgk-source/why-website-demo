import client from "./client";

export function getOrdersByCustomer(customerId) {
  return client.get(`/orders/customer/${customerId}`).then((res) => res.data.orders || []);
}

export function getOrderById(id) {
  return client.get(`/orders/${id}`).then((res) => res.data.order);
}
