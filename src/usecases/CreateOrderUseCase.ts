import { Order, OrderStatus } from '../domain/entities/Order';
import { MenuItem } from '../domain/entities/MenuItem';
import { IOrderRepository } from '../domain/repositories/interfaces/IOrderRepository';
import { ICustomerRepository } from '../domain/repositories/interfaces/ICustomerRepository';
import { IMenuRepository } from '../domain/repositories/interfaces/IMenuRepository';
import { KitchenOrderService } from '../domain/services/KitchenOrderService';
import { BarOrderService } from '../domain/services/BarOrderService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Use Case: Criar Pedido
 * Responsável por criar um novo pedido e separá-lo entre cozinha e bar
 * Seguindo o princípio de Responsabilidade Única (SOLID)
 */
export class CreateOrderUseCase {
  private kitchenService: KitchenOrderService;
  private barService: BarOrderService;

  constructor(
    private orderRepository: IOrderRepository,
    private customerRepository: ICustomerRepository,
    private menuRepository: IMenuRepository
  ) {
    this.kitchenService = new KitchenOrderService();
    this.barService = new BarOrderService();
  }

  /**
   * Cria um pedido e o separa automaticamente entre cozinha e bar
   */
  async execute(
    tableNumber: number,
    itemIds: string[]
  ): Promise<{ kitchenOrder: Order | null; barOrder: Order | null }> {
    // Valida se a mesa existe e está ocupada
    // (validação pode ser adicionada aqui)

    // Busca o cliente da mesa para obter alergias
    const customer = await this.customerRepository.findByTableNumber(
      tableNumber
    );

    if (!customer) {
      throw new Error('Cliente não encontrado para esta mesa');
    }

    // Busca os itens do menu
    const items: MenuItem[] = [];
    for (const itemId of itemIds) {
      const item = await this.menuRepository.findById(itemId);
      if (!item) {
        throw new Error(`Item do menu não encontrado: ${itemId}`);
      }
      if (!item.isAvailable) {
        throw new Error(`Item não disponível: ${item.name}`);
      }
      items.push(item);
    }

    if (items.length === 0) {
      throw new Error('Nenhum item válido foi selecionado');
    }

    // Cria o pedido base
    const baseOrder = new Order(
      uuidv4(),
      tableNumber,
      items,
      customer.allergies,
      OrderStatus.PENDING,
      new Date(),
      'KITCHEN' // Tipo temporário, será ajustado
    );

    // Separa o pedido entre cozinha e bar
    let kitchenOrder: Order | null = null;
    let barOrder: Order | null = null;

    if (this.kitchenService.hasKitchenItems(baseOrder)) {
      kitchenOrder = this.kitchenService.processOrder(baseOrder);
      await this.orderRepository.create(kitchenOrder);
    }

    if (this.barService.hasBarItems(baseOrder)) {
      barOrder = this.barService.processOrder(baseOrder);
      await this.orderRepository.create(barOrder);
    }

    if (!kitchenOrder && !barOrder) {
      throw new Error('Nenhum item válido foi encontrado no pedido');
    }

    return { kitchenOrder, barOrder };
  }
}

