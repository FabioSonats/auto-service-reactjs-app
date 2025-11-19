FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY src ./src
COPY public ./public

# Build da aplicação
RUN npm run build

# Produção
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copiar apenas arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]

