import { AskAllergyUseCase } from '../AskAllergyUseCase';
import { ICustomerRepository } from '../../domain/repositories/interfaces/ICustomerRepository';
import { Customer } from '../../domain/entities/Customer';

describe('AskAllergyUseCase', () => {
  let customerRepository: jest.Mocked<ICustomerRepository>;
  let askAllergyUseCase: AskAllergyUseCase;

  beforeEach(() => {
    customerRepository = {
      create: jest.fn(),
      findByTableNumber: jest.fn(),
      findById: jest.fn()
    };

    askAllergyUseCase = new AskAllergyUseCase(customerRepository);
  });

  describe('execute', () => {
    it('deve criar um novo cliente quando não existe na mesa', async () => {
      const tableNumber = 5;
      const allergies = ['GLUTEN', 'LACTOSE'];

      customerRepository.findByTableNumber.mockResolvedValue(null);
      customerRepository.create.mockImplementation(async (customer) => customer);

      const result = await askAllergyUseCase.execute(tableNumber, allergies);

      expect(result.tableNumber).toBe(tableNumber);
      expect(result.allergies).toEqual(allergies);
      expect(customerRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve atualizar alergias de um cliente existente', async () => {
      const tableNumber = 5;
      const existingCustomer = new Customer(
        'customer-1',
        tableNumber,
        ['GLUTEN'],
        new Date()
      );
      const newAllergies = ['GLUTEN', 'LACTOSE', 'NUTS'];

      customerRepository.findByTableNumber.mockResolvedValue(existingCustomer);
      customerRepository.create.mockImplementation(async (customer) => customer);

      const result = await askAllergyUseCase.execute(tableNumber, newAllergies);

      expect(result.id).toBe(existingCustomer.id);
      expect(result.allergies).toEqual(newAllergies);
      expect(customerRepository.create).toHaveBeenCalledTimes(1);
    });

    it('deve permitir cliente sem alergias', async () => {
      const tableNumber = 3;
      const allergies: string[] = [];

      customerRepository.findByTableNumber.mockResolvedValue(null);
      customerRepository.create.mockImplementation(async (customer) => customer);

      const result = await askAllergyUseCase.execute(tableNumber, allergies);

      expect(result.allergies).toEqual([]);
      expect(result.hasAllergies()).toBe(false);
    });
  });
});

