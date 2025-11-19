import { InMemoryDatabase } from './InMemoryDatabase';
import { MenuItem, MenuItemType, MenuCategory, Allergen } from '../../domain/entities/MenuItem';
import { Table } from '../../domain/entities/Table';
import { v4 as uuidv4 } from 'uuid';

/**
 * Popula o banco de dados com dados iniciais
 */
export function seedDatabase(db: InMemoryDatabase): void {
  // Criar mesas
  for (let i = 1; i <= 20; i++) {
    const table = new Table(
      i,
      `QR-${i}`,
      false
    );
    db.saveTable(table);
  }

  // Criar itens do menu - Entradas
  const appetizers: MenuItem[] = [
    new MenuItem(
      uuidv4(),
      'Bruschetta Italiana',
      'Pão italiano tostado com tomate, manjericão e azeite',
      18.90,
      MenuCategory.APPETIZER,
      MenuItemType.FOOD,
      [Allergen.GLUTEN],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Salada Caesar',
      'Alface, croutons, parmesão e molho caesar',
      22.50,
      MenuCategory.APPETIZER,
      MenuItemType.FOOD,
      [Allergen.GLUTEN, Allergen.LACTOSE, Allergen.EGGS],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Carpaccio de Salmão',
      'Salmão cru fatiado com azeite e limão',
      35.00,
      MenuCategory.APPETIZER,
      MenuItemType.FOOD,
      [],
      true
    ),
  ];

  // Criar itens do menu - Pratos Principais
  const mainCourses: MenuItem[] = [
    new MenuItem(
      uuidv4(),
      'Risotto de Camarão',
      'Arroz arbóreo cremoso com camarões e ervas',
      58.90,
      MenuCategory.MAIN_COURSE,
      MenuItemType.FOOD,
      [Allergen.SHELLFISH, Allergen.LACTOSE],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Picanha Grelhada',
      'Picanha grelhada com batatas rústicas',
      65.00,
      MenuCategory.MAIN_COURSE,
      MenuItemType.FOOD,
      [],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Lasanha à Bolonhesa',
      'Massa com molho bolonhesa e queijo',
      42.50,
      MenuCategory.MAIN_COURSE,
      MenuItemType.FOOD,
      [Allergen.GLUTEN, Allergen.LACTOSE, Allergen.EGGS],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Salada Vegana',
      'Mix de folhas, legumes e molho vegano',
      28.00,
      MenuCategory.MAIN_COURSE,
      MenuItemType.FOOD,
      [],
      true
    ),
  ];

  // Criar itens do menu - Sobremesas
  const desserts: MenuItem[] = [
    new MenuItem(
      uuidv4(),
      'Tiramisu',
      'Sobremesa italiana com café e mascarpone',
      24.90,
      MenuCategory.DESSERT,
      MenuItemType.FOOD,
      [Allergen.GLUTEN, Allergen.LACTOSE, Allergen.EGGS],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Brownie com Sorvete',
      'Brownie quente com sorvete de baunilha',
      19.90,
      MenuCategory.DESSERT,
      MenuItemType.FOOD,
      [Allergen.GLUTEN, Allergen.LACTOSE, Allergen.EGGS],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Mousse de Chocolate',
      'Mousse cremosa de chocolate belga',
      16.50,
      MenuCategory.DESSERT,
      MenuItemType.FOOD,
      [Allergen.LACTOSE, Allergen.EGGS],
      true
    ),
  ];

  // Criar itens do menu - Bebidas
  const drinks: MenuItem[] = [
    new MenuItem(
      uuidv4(),
      'Água Mineral',
      'Água mineral sem gás 500ml',
      4.50,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Refrigerante',
      'Coca-Cola, Pepsi, Guaraná ou Fanta 350ml',
      6.00,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Suco Natural',
      'Suco de laranja, maracujá ou abacaxi 500ml',
      8.50,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Cerveja Artesanal',
      'Cerveja artesanal local 500ml',
      12.00,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [Allergen.GLUTEN],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Vinho Tinto',
      'Taça de vinho tinto da casa',
      18.00,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [],
      true
    ),
    new MenuItem(
      uuidv4(),
      'Café Expresso',
      'Café expresso italiano',
      5.00,
      MenuCategory.DRINK,
      MenuItemType.DRINK,
      [],
      true
    ),
  ];

  // Salvar todos os itens no banco
  [...appetizers, ...mainCourses, ...desserts, ...drinks].forEach(item => {
    db.saveMenuItem(item);
  });
}

