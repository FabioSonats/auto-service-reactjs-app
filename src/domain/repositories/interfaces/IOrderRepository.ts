import { Order, OrderStatus } from '../../entities/Order';

/**
 * Interface do repositório de Order
 * Seguindo o princípio de Inversão de Dependência (SOLID)
 */
export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByTableNumber(tableNumber: number): Promise<Order[]>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
  findByType(type: 'KITCHEN' | 'BAR'): Promise<Order[]>;
  updateStatus(orderId: string, status: OrderStatus): Promise<Order>;
}

