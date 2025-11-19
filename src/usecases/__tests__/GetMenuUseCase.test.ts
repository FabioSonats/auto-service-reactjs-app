import { GetMenuUseCase } from '../GetMenuUseCase';
import { IMenuRepository } from '../../domain/repositories/interfaces/IMenuRepository';
import { MenuItem, MenuItemType, MenuCategory, Allergen } from '../../domain/entities/MenuItem';

describe('GetMenuUseCase', () => {
  let menuRepository: jest.Mocked<IMenuRepository>;
  let getMenuUseCase: GetMenuUseCase;

  beforeEach(() => {
    menuRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategory: jest.fn(),
      findAvailable: jest.fn()
    };

    getMenuUseCase = new GetMenuUseCase(menuRepository);
  });

  describe('execute', () => {
    it('deve retornar todos os itens disponíveis do menu', async () => {
      const mockItems: MenuItem[] = [
        new MenuItem(
          '1',
          'Item 1',
          'Descrição 1',
          10.0,
          MenuCategory.MAIN_COURSE,
          MenuItemType.FOOD,
          [],
          true
        ),
        new MenuItem(
          '2',
          'Item 2',
          'Descrição 2',
          15.0,
          MenuCategory.DRINK,
          MenuItemType.DRINK,
          [],
          true
        )
      ];

      menuRepository.findAvailable.mockResolvedValue(mockItems);

      const result = await getMenuUseCase.execute();

      expect(result).toEqual(mockItems);
      expect(menuRepository.findAvailable).toHaveBeenCalledTimes(1);
    });
  });

  describe('executeByCategory', () => {
    it('deve retornar itens filtrados por categoria', async () => {
      const allItems: MenuItem[] = [
        new MenuItem(
          '1',
          'Prato Principal',
          'Descrição',
          25.0,
          MenuCategory.MAIN_COURSE,
          MenuItemType.FOOD,
          [],
          true
        ),
        new MenuItem(
          '2',
          'Bebida',
          'Descrição',
          5.0,
          MenuCategory.DRINK,
          MenuItemType.DRINK,
          [],
          true
        )
      ];

      menuRepository.findAvailable.mockResolvedValue(allItems);

      const result = await getMenuUseCase.executeByCategory(MenuCategory.MAIN_COURSE);

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe(MenuCategory.MAIN_COURSE);
    });
  });
});

