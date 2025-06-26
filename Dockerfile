# Base stage with pnpm setup
FROM node:23.11.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Компилируем TypeScript
RUN npm run build

# Порт, если нужен
EXPOSE 8080

# Запуск
CMD ["node", "dist/index.js"]