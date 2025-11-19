import { CreateOrderUseCase } from '../CreateOrderUseCase';
import { IOrderRepository } from '../../domain/repositories/interfaces/IOrderRepository';
import { ICustomerRepository } from '../../domain/repositories/interfaces/ICustomerRepository';
import { IMenuRepository } from '../../domain/repositories/interfaces/IMenuRepository';
import { Customer } from '../../domain/entities/Customer';
import { MenuItem, MenuItemType, MenuCategory } from '../../domain/entities/MenuItem';
import { OrderStatus } from '../../domain/entities/Order';

describe('CreateOrderUseCase', () => {
  let orderRepository: jest.Mocked<IOrderRepository>;
  let customerRepository: jest.Mocked<ICustomerRepository>;
  let menuRepository: jest.Mocked<IMenuRepository>;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(() => {
    orderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByTableNumber: jest.fn(),
      findByStatus: jest.fn(),
      findByType: jest.fn(),
      updateStatus: jest.fn()
    };

    customerRepository = {
      create: jest.fn(),
      findByTableNumber: jest.fn(),
      findById: jest.fn()
    };

    menuRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategory: jest.fn(),
      findAvailable: jest.fn()
    };

    createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      customerRepository,
      menuRepository
    );
  });

  describe('execute', () => {
    it('deve criar pedido apenas para cozinha quando contém apenas comida', async () => {
      const tableNumber = 5;
      const customer = new Customer('customer-1', tableNumber, [], new Date());
      const foodItem = new MenuItem(
        'item-1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );

      customerRepository.findByTableNumber.mockResolvedValue(customer);
      menuRepository.findById.mockResolvedValue(foodItem);
      orderRepository.create.mockImplementation(async (order) => order);

      const result = await createOrderUseCase.execute(tableNumber, ['item-1']);

      expect(result.kitchenOrder).not.toBeNull();
      expect(result.barOrder).toBeNull();
      expect(result.kitchenOrder?.type).toBe('KITCHEN');
      expect(orderRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve criar pedido apenas para bar quando contém apenas bebida', async () => {
      const tableNumber = 5;
      const customer = new Customer('customer-1', tableNumber, [], new Date());
      const drinkItem = new MenuItem(
        'item-2',
        'Bebida',
        'Descrição',
        5.0,
        MenuCategory.DRINK,
        MenuItemType.DRINK,
        [],
        true
      );

      customerRepository.findByTableNumber.mockResolvedValue(customer);
      menuRepository.findById.mockResolvedValue(drinkItem);
      orderRepository.create.mockImplementation(async (order) => order);

      const result = await createOrderUseCase.execute(tableNumber, ['item-2']);

      expect(result.kitchenOrder).toBeNull();
      expect(result.barOrder).not.toBeNull();
      expect(result.barOrder?.type).toBe('BAR');
      expect(orderRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve criar pedidos separados para cozinha e bar quando contém ambos', async () => {
      const tableNumber = 5;
      const customer = new Customer('customer-1', tableNumber, [], new Date());
      const foodItem = new MenuItem(
        'item-1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );
      const drinkItem = new MenuItem(
        'item-2',
        'Bebida',
        'Descrição',
        5.0,
        MenuCategory.DRINK,
        MenuItemType.DRINK,
        [],
        true
      );

      customerRepository.findByTableNumber.mockResolvedValue(customer);
      menuRepository.findById
        .mockResolvedValueOnce(foodItem)
        .mockResolvedValueOnce(drinkItem);
      orderRepository.create.mockImplementation(async (order) => order);

      const result = await createOrderUseCase.execute(tableNumber, ['item-1', 'item-2']);

      expect(result.kitchenOrder).not.toBeNull();
      expect(result.barOrder).not.toBeNull();
      expect(orderRepository.create).toHaveBeenCalledTimes(2);
    });

    it('deve lançar erro quando cliente não existe', async () => {
      const tableNumber = 5;

      customerRepository.findByTableNumber.mockResolvedValue(null);

      await expect(
        createOrderUseCase.execute(tableNumber, ['item-1'])
      ).rejects.toThrow('Cliente não encontrado para esta mesa');
    });

    it('deve lançar erro quando item não existe', async () => {
      const tableNumber = 5;
      const customer = new Customer('customer-1', tableNumber, [], new Date());

      customerRepository.findByTableNumber.mockResolvedValue(customer);
      menuRepository.findById.mockResolvedValue(null);

      await expect(
        createOrderUseCase.execute(tableNumber, ['item-invalid'])
      ).rejects.toThrow('Item do menu não encontrado');
    });

    it('deve incluir alergias do cliente no pedido', async () => {
      const tableNumber = 5;
      const allergies = ['GLUTEN', 'LACTOSE'];
      const customer = new Customer('customer-1', tableNumber, allergies, new Date());
      const foodItem = new MenuItem(
        'item-1',
        'Prato',
        'Descrição',
        25.0,
        MenuCategory.MAIN_COURSE,
        MenuItemType.FOOD,
        [],
        true
      );

      customerRepository.findByTableNumber.mockResolvedValue(customer);
      menuRepository.findById.mockResolvedValue(foodItem);
      orderRepository.create.mockImplementation(async (order) => order);

      const result = await createOrderUseCase.execute(tableNumber, ['item-1']);

      expect(result.kitchenOrder?.customerAllergies).toEqual(allergies);
    });
  });
});

