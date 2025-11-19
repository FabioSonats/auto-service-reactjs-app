import { Order, OrderStatus } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/repositories/interfaces/IOrderRepository';
import { InMemoryDatabase } from '../database/InMemoryDatabase';

/**
 * Implementação do repositório de Order
 * Usa banco de dados in-memory
 */
export class OrderRepository implements IOrderRepository {
  constructor(private db: InMemoryDatabase) {}

  async create(order: Order): Promise<Order> {
    this.db.saveOrder(order);
    return order;
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.db.findOrderById(id);
    return order || null;
  }

  async findByTableNumber(tableNumber: number): Promise<Order[]> {
    const allOrders = this.db.findAllOrders();
    return allOrders.filter(order => order.tableNumber === tableNumber);
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    const allOrders = this.db.findAllOrders();
    return allOrders.filter(order => order.status === status);
  }

  async findByType(type: 'KITCHEN' | 'BAR'): Promise<Order[]> {
    const allOrders = this.db.findAllOrders();
    return allOrders.filter(order => order.type === type);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new Error(`Pedido não encontrado: ${orderId}`);
    }

    const updatedOrder = new Order(
      order.id,
      order.tableNumber,
      order.items,
      order.customerAllergies,
      status,
      order.createdAt,
      order.type
    );

    this.db.saveOrder(updatedOrder);
    return updatedOrder;
  }
}

