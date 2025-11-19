/**
 * Entidade Customer
 * Representa um cliente que está fazendo um pedido na mesa
 */
export class Customer {
  constructor(
    public readonly id: string,
    public readonly tableNumber: number,
    public readonly allergies: string[],
    public readonly createdAt: Date
  ) {}

  /**
   * Verifica se o cliente possui alguma alergia
   */
  hasAllergies(): boolean {
    return this.allergies.length > 0;
  }
}

