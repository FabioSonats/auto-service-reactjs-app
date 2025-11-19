import { Order } from '../entities/Order';
import { MenuItem, MenuItemType } from '../entities/MenuItem';

/**
 * Serviço de Pedidos do Bar
 * Responsável por processar pedidos de bebidas
 * Seguindo o princípio de Responsabilidade Única (SOLID)
 */
export class BarOrderService {
  /**
   * Verifica se um item é para o bar
   */
  isBarItem(item: MenuItem): boolean {
    return item.type === MenuItemType.DRINK;
  }

  /**
   * Filtra apenas os itens de bebida de um pedido
   */
  filterBarItems(order: Order): MenuItem[] {
    return order.items.filter(item => this.isBarItem(item));
  }

  /**
   * Verifica se um pedido contém itens para o bar
   */
  hasBarItems(order: Order): boolean {
    return order.items.some(item => this.isBarItem(item));
  }

  /**
   * Processa um pedido para o bar
   */
  processOrder(order: Order): Order {
    if (!this.hasBarItems(order)) {
      throw new Error('Pedido não contém itens para o bar');
    }

    const barItems = this.filterBarItems(order);
    
    // Cria um novo pedido apenas com itens de bebida
    return new Order(
      order.id,
      order.tableNumber,
      barItems,
      order.customerAllergies,
      order.status,
      order.createdAt,
      'BAR'
    );
  }
}

