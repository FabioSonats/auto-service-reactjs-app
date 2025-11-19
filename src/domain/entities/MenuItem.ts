/**
 * Tipos de item do menu
 */
export enum MenuItemType {
  FOOD = 'FOOD',
  DRINK = 'DRINK'
}

/**
 * Categorias do menu
 */
export enum MenuCategory {
  APPETIZER = 'APPETIZER',
  MAIN_COURSE = 'MAIN_COURSE',
  DESSERT = 'DESSERT',
  DRINK = 'DRINK'
}

/**
 * Alergênicos possíveis
 */
export enum Allergen {
  GLUTEN = 'GLUTEN',
  LACTOSE = 'LACTOSE',
  NUTS = 'NUTS',
  SHELLFISH = 'SHELLFISH',
  EGGS = 'EGGS',
  SOY = 'SOY'
}

/**
 * Entidade MenuItem
 * Representa um item do cardápio
 */
export class MenuItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly category: MenuCategory,
    public readonly type: MenuItemType,
    public readonly allergens: Allergen[],
    public readonly isAvailable: boolean
  ) {}

  /**
   * Verifica se o item contém algum alergênico
   */
  hasAllergens(): boolean {
    return this.allergens.length > 0;
  }

  /**
   * Verifica se o item contém um alergênico específico
   */
  containsAllergen(allergen: Allergen): boolean {
    return this.allergens.includes(allergen);
  }
}

