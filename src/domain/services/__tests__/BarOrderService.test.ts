import { BarOrderService } from '../BarOrderService';
import { MenuItem, MenuItemType, MenuCategory } from '../../entities/MenuItem';
import { Order, OrderStatus } from '../../entities/Order';

describe('BarOrderService', () => {
  let service: BarOrderService;

  beforeEach(() => {
    service = new BarOrderService();
  });

  describe('isBarItem', () => {
    it('deve retornar true para itens de bebida', () => {
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

      expect(service.isBarItem(item)).toBe(true);
    });

    it('deve retornar false para itens de comida', () => {
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

      expect(service.isBarItem(item)).toBe(false);
    });
  });

  describe('hasBarItems', () => {
    it('deve retornar true quando pedido contém itens de bebida', () => {
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

      expect(service.hasBarItems(order)).toBe(true);
    });

    it('deve retornar false quando pedido não contém itens de bebida', () => {
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

      expect(service.hasBarItems(order)).toBe(false);
    });
  });

  describe('processOrder', () => {
    it('deve processar pedido com itens de bebida', () => {
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

      const result = service.processOrder(order);

      expect(result.type).toBe('BAR');
      expect(result.items).toHaveLength(1);
      expect(result.items[0].type).toBe(MenuItemType.DRINK);
    });

    it('deve lançar erro quando pedido não contém itens de bebida', () => {
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

      expect(() => service.processOrder(order)).toThrow(
        'Pedido não contém itens para o bar'
      );
    });
  });
});

