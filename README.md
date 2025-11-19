# 🍽️ Auto Service - Sistema de Autoatendimento com QR Code

Sistema completo de autoatendimento para restaurante utilizando princípios SOLID, Clean Architecture e boas práticas de organização de código.

## 📋 Índice

- [Características](#características)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
- [Docker](#docker)

## ✨ Características

- ✅ **Leitura de QR Code**: Cada mesa possui um QR Code único
- ✅ **Menu Digital**: Interface moderna e responsiva
- ✅ **Registro de Alergias**: Sistema obrigatório de registro de alergias antes do pedido
- ✅ **Separação Automática**: Pedidos são automaticamente separados entre cozinha e bar
- ✅ **Tempo Real**: Painel para cozinha e bar com atualizações em tempo real via WebSocket
- ✅ **Clean Architecture**: Código organizado em camadas bem definidas
- ✅ **SOLID**: Princípios SOLID aplicados em todo o código
- ✅ **Testes**: Cobertura de testes unitários acima de 85%

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com as seguintes camadas:

```
src/
├── domain/              # Camada de domínio (regras de negócio)
│   ├── entities/        # Entidades do domínio
│   ├── repositories/    # Interfaces de repositórios
│   └── services/        # Serviços de domínio
├── usecases/            # Casos de uso (lógica de aplicação)
├── infrastructure/      # Implementações concretas
│   ├── database/        # Banco de dados in-memory
│   └── repositories/    # Implementações dos repositórios
└── presentation/        # Camada de apresentação
    ├── controllers/     # Controllers da API
    ├── routes/          # Rotas da API
    └── websocket/       # Servidor WebSocket
```

### Princípios SOLID Aplicados

- **S - Single Responsibility**: Cada classe tem uma única responsabilidade
- **O - Open/Closed**: Extensível sem modificar código existente
- **L - Liskov Substitution**: Interfaces podem ser substituídas por implementações
- **I - Interface Segregation**: Interfaces específicas e coesas
- **D - Dependency Inversion**: Dependências de abstrações, não de implementações

## 🛠️ Tecnologias

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **WebSocket (ws)** - Comunicação em tempo real
- **Jest** - Framework de testes

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passo a Passo

1. **Clone o repositório** (ou navegue até a pasta do projeto)

2. **Instale as dependências do backend:**
```bash
npm install
```

3. **Instale as dependências do frontend:**
```bash
cd frontend
npm install
cd ..
```

## 🚀 Como Executar

### Desenvolvimento

#### Backend (API)
```bash
npm run dev
```
A API estará disponível em `http://localhost:3000`

#### Frontend (Cliente)
```bash
cd frontend
npm run dev
```
O frontend estará disponível em `http://localhost:3001`

### Produção

#### Backend
```bash
npm run build
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
auto-service/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── Customer.ts
│   │   │   ├── MenuItem.ts
│   │   │   ├── Order.ts
│   │   │   └── Table.ts
│   │   ├── repositories/
│   │   │   └── interfaces/
│   │   │       ├── ICustomerRepository.ts
│   │   │       ├── IMenuRepository.ts
│   │   │       ├── IOrderRepository.ts
│   │   │       └── ITableRepository.ts
│   │   └── services/
│   │       ├── KitchenOrderService.ts
│   │       └── BarOrderService.ts
│   ├── usecases/
│   │   ├── AskAllergyUseCase.ts
│   │   ├── CreateOrderUseCase.ts
│   │   ├── GetMenuUseCase.ts
│   │   └── __tests__/
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── InMemoryDatabase.ts
│   │   │   └── seed.ts
│   │   └── repositories/
│   │       ├── CustomerRepository.ts
│   │       ├── MenuRepository.ts
│   │       ├── OrderRepository.ts
│   │       └── TableRepository.ts
│   ├── presentation/
│   │   ├── app.ts
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── websocket/
│   └── index.ts
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── public/
│       └── panel/
├── package.json
├── tsconfig.json
├── jest.config.js
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

### Menu
- `GET /api/menu` - Lista todos os itens disponíveis
- `GET /api/menu?category=APPETIZER` - Lista itens por categoria

### Cliente
- `POST /api/customer/allergies` - Registra alergias do cliente
  ```json
  {
    "tableNumber": 5,
    "allergies": ["GLUTEN", "LACTOSE"]
  }
  ```

### Pedidos
- `POST /api/orders` - Cria um novo pedido
  ```json
  {
    "tableNumber": 5,
    "itemIds": ["item-id-1", "item-id-2"]
  }
  ```
- `PATCH /api/orders/:id/status` - Atualiza status do pedido
  ```json
  {
    "status": "PREPARING"
  }
  ```

### Menu via QR Code
- `GET /menu?mesa=12` - Acessa o menu digital da mesa

## 🧪 Testes

Execute os testes unitários:
```bash
npm test
```

Execute com cobertura:
```bash
npm run test:coverage
```

A cobertura mínima esperada é de **85%**.

## 🐳 Docker

### Executar com Docker Compose

```bash
docker-compose up -d
```

Isso irá iniciar:
- API na porta `3000`
- Frontend na porta `3001`

### Build manual

```bash
# Backend
docker build -t auto-service-api .

# Frontend
cd frontend
docker build -t auto-service-frontend .
```

## 📱 Fluxo do Sistema

1. **Cliente escaneia QR Code** na mesa
   - URL: `domain.com/menu?mesa=12`

2. **Sistema pergunta sobre alergias**
   - Cliente informa alergias ou restrições alimentares

3. **Cliente visualiza o menu**
   - Menu organizado por categorias
   - Itens com informações de alergênicos

4. **Cliente seleciona itens e confirma pedido**
   - Sistema separa automaticamente:
     - Itens de **comida** → Cozinha
     - Itens de **bebida** → Bar

5. **Pedidos aparecem em tempo real**
   - Cozinha e bar recebem notificações via WebSocket
   - Painel atualiza automaticamente

## 🎯 Painel de Controle

Acesse o painel para cozinha e bar em:
```
http://localhost:3001/panel/index.html
```

O painel permite:
- Visualizar pedidos em tempo real
- Atualizar status dos pedidos
- Ver informações de alergias
- Separar visualização entre cozinha e bar

## 🔮 Extensões Futuras

O sistema foi projetado para facilitar integrações futuras:

- ✅ **Impressoras**: Interface de repositório permite adicionar serviço de impressão
- ✅ **Dashboard**: Estrutura pronta para dashboard de controle
- ✅ **Pagamento**: Endpoints podem ser estendidos para integração de pagamento
- ✅ **API Externa**: Arquitetura modular permite integrações externas

## 📝 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ seguindo Clean Architecture e SOLID**

