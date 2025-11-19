import { Customer } from '../domain/entities/Customer';
import { ICustomerRepository } from '../domain/repositories/interfaces/ICustomerRepository';
import { v4 as uuidv4 } from 'uuid';

/**
 * Use Case: Registrar Alergias
 * Responsável por criar ou atualizar informações de alergias do cliente
 * Seguindo o princípio de Responsabilidade Única (SOLID)
 */
export class AskAllergyUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  /**
   * Registra ou atualiza as alergias de um cliente em uma mesa
   */
  async execute(
    tableNumber: number,
    allergies: string[]
  ): Promise<Customer> {
    // Verifica se já existe um cliente nesta mesa
    const existingCustomer = await this.customerRepository.findByTableNumber(
      tableNumber
    );

    if (existingCustomer) {
      // Atualiza as alergias do cliente existente
      const updatedCustomer = new Customer(
        existingCustomer.id,
        existingCustomer.tableNumber,
        allergies,
        existingCustomer.createdAt
      );
      return await this.customerRepository.create(updatedCustomer);
    }

    // Cria um novo cliente
    const newCustomer = new Customer(
      uuidv4(),
      tableNumber,
      allergies,
      new Date()
    );

    return await this.customerRepository.create(newCustomer);
  }
}

