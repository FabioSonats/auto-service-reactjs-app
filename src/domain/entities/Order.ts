import { MenuItem } from './MenuItem';

/**
 * Status do pedido
 */
export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

/**
 * Entidade Order
 * Representa um pedido realizado pelo cliente
 */
export class Order {
  constructor(
    public readonly id: string,
    public readonly tableNumber: number,
    public readonly items: MenuItem[],
    public readonly customerAllergies: string[],
    public readonly status: OrderStatus,
    public readonly createdAt: Date,
    public readonly type: 'KITCHEN' | 'BAR'
  ) {}

  /**
   * Calcula o valor total do pedido
   */
  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  /**
   * Verifica se o pedido é para a cozinha
   */
  isKitchenOrder(): boolean {
    return this.type === 'KITCHEN';
  }

  /**
   * Verifica se o pedido é para o bar
   */
  isBarOrder(): boolean {
    return this.type === 'BAR';
  }
}

