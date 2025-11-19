import { KitchenOrderService } from '../KitchenOrderService';
import { MenuItem, MenuItemType, MenuCategory } from '../../entities/MenuItem';
import { Order, OrderStatus } from '../../entities/Order';

describe('KitchenOrderService', () => {
  let service: KitchenOrderService;

  beforeEach(() => {
    service = new KitchenOrderService();
  });

  describe('isKitchenItem', () => {
    it('deve retornar true para itens de comida', () => {
      const item = new MenuItem(
        '1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );

      expect(service.isKitchenItem(item)).toBe(true);
    });

    it('deve retornar false para itens de bebida', () => {
      const item = new MenuItem(
        '1',
        'Bebida',
        'Descrição',
        5.0,
        MenuCategory.DRINK,
        MenuItemType.DRINK,
        [],
        true
      );

      expect(service.isKitchenItem(item)).toBe(false);
    });
  });

  describe('hasKitchenItems', () => {
    it('deve retornar true quando pedido contém itens de comida', () => {
      const foodItem = new MenuItem(
        '1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );
      const order = new Order(
        'order-1',
        5,
        [foodItem],
        [],
        OrderStatus.PENDING,
        new Date(),
        'KITCHEN'
      );

      expect(service.hasKitchenItems(order)).toBe(true);
    });

    it('deve retornar false quando pedido não contém itens de comida', () => {
      const drinkItem = new MenuItem(
        '1',
        'Bebida',
        'Descrição',
        5.0,
        MenuCategory.DRINK,
        MenuItemType.DRINK,
        [],
        true
      );
      const order = new Order(
        'order-1',
        5,
        [drinkItem],
        [],
        OrderStatus.PENDING,
        new Date(),
        'BAR'
      );

      expect(service.hasKitchenItems(order)).toBe(false);
    });
  });

  describe('processOrder', () => {
    it('deve processar pedido com itens de comida', () => {
      const foodItem = new MenuItem(
        '1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );
      const order = new Order(
        'order-1',
        5,
        [foodItem],
        ['GLUTEN'],
        OrderStatus.PENDING,
        new Date(),
        'KITCHEN'
      );

      const result = service.processOrder(order);

      expect(result.type).toBe('KITCHEN');
      expect(result.items).toHaveLength(1);
      expect(result.items[0].type).toBe(MenuItemType.FOOD);
    });

    it('deve lançar erro quando pedido não contém itens de comida', () => {
      const drinkItem = new MenuItem(
        '1',
        'Bebida',
        'Descrição',
        5.0,
        MenuCategory.DRINK,
        MenuItemType.DRINK,
        [],
        true
      );
      const order = new Order(
        'order-1',
        5,
        [drinkItem],
        [],
        OrderStatus.PENDING,
        new Date(),
        'BAR'
      );

      expect(() => service.processOrder(order)).toThrow(
        'Pedido não contém itens para a cozinha'
      );
    });
  });
});

