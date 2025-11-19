import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/repositories/interfaces/IOrderRepository';
import { OrderWebSocket } from '../../presentation/websocket/OrderWebSocket';

/**
 * Wrapper do OrderRepository que notifica via WebSocket
 * Seguindo o padrão Decorator
 */
export class OrderRepositoryWithWebSocket implements IOrderRepository {
  constructor(
    private orderRepository: IOrderRepository,
    private orderWebSocket: OrderWebSocket
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = await this.orderRepository.create(order);
    
    // Notificar via WebSocket
    if (createdOrder.type === 'KITCHEN') {
      this.orderWebSocket.notifyKitchen(createdOrder);
    } else if (createdOrder.type === 'BAR') {
      this.orderWebSocket.notifyBar(createdOrder);
    }
    
    return createdOrder;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async findByTableNumber(tableNumber: number): Promise<Order[]> {
    return this.orderRepository.findByTableNumber(tableNumber);
  }

  async findByStatus(status: import('../../domain/entities/Order').OrderStatus): Promise<Order[]> {
    return this.orderRepository.findByStatus(status);
  }

  async findByType(type: 'KITCHEN' | 'BAR'): Promise<Order[]> {
    return this.orderRepository.findByType(type);
  }

  async updateStatus(orderId: string, status: import('../../domain/entities/Order').OrderStatus): Promise<Order> {
    return this.orderRepository.updateStatus(orderId, status);
  }
}

