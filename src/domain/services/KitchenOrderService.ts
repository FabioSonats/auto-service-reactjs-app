import { Order } from '../entities/Order';
import { MenuItem, MenuItemType } from '../entities/MenuItem';

/**
 * Serviço de Pedidos da Cozinha
 * Responsável por processar pedidos de comida
 * Seguindo o princípio de Responsabilidade Única (SOLID)
 */
export class KitchenOrderService {
  /**
   * Verifica se um item é para a cozinha
   */
  isKitchenItem(item: MenuItem): boolean {
    return item.type === MenuItemType.FOOD;
  }

  /**
   * Filtra apenas os itens de comida de um pedido
   */
  filterKitchenItems(order: Order): MenuItem[] {
    return order.items.filter(item => this.isKitchenItem(item));
  }

  /**
   * Verifica se um pedido contém itens para a cozinha
   */
  hasKitchenItems(order: Order): boolean {
    return order.items.some(item => this.isKitchenItem(item));
  }

  /**
   * Processa um pedido para a cozinha
   */
  processOrder(order: Order): Order {
    if (!this.hasKitchenItems(order)) {
      throw new Error('Pedido não contém itens para a cozinha');
    }

    const kitchenItems = this.filterKitchenItems(order);
    
    // Cria um novo pedido apenas com itens de comida
    return new Order(
      order.id,
      order.tableNumber,
      kitchenItems,
      order.customerAllergies,
      order.status,
      order.createdAt,
      'KITCHEN'
    );
  }
}

