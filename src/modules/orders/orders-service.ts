import { OrdersRepository } from "./orders-repository";
import type { CreateOrderRequest } from "./orders-interfaces";
import { AppError } from "../../utils/app-error";

export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async addOrder({ userId, items }: CreateOrderRequest) {
    if (items.length === 0) {
      throw new AppError("Bad request: Order must have at least one item.", 400);
    }

    const order = await this.ordersRepository.createOrder({ userId, items });
    
    return { order };
  }
}