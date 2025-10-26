FROM node:18-alpine AS builder
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm install
COPY . .
COPY prisma ./prisma/
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine
WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/
RUN npx prisma generate

EXPOSE 3000
CMD ["node", "dist/server.js"]