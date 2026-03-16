import { OrdersRepository } from "./orders-repository";
import type { AuthUserOrder, CreateOrderRequest, UpdateOrderStatusInput } from "./orders-interfaces";
import { AppError } from "../../utils/app-error";

export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async updateStatus(data: UpdateOrderStatusInput, user: AuthUserOrder) {
    const order = await this.ordersRepository.findById(data.orderId);
    console.log(order)
  
    if (!order) throw new AppError("Order not found", 404);

    if (order.status === "CANCELLED"){
      throw new AppError("Error: This order is cancelled.", 403);
    }

    if (user.role === "CUSTOMER" && data.status !== "CANCELLED"){
      throw new AppError("Unauthorized: Customers don't have permission to do this.", 403);
    }

    if (order.user_id !== user.userId) {
      throw new AppError("Unauthorized: You don't own this order", 403);
    }

    const updatedOrder = await this.ordersRepository.updateStatus(data);

    if (!updatedOrder) {
      throw new AppError("Order not found", 404);
    }

    return { updatedOrder };
  }
  
  async addOrder({ userId, items }: CreateOrderRequest) {
    const order = await this.ordersRepository.createOrder({ userId, items });
    
    return { order };
  }
}
