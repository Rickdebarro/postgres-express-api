import { PrismaClient } from '@prisma/client';

/**
 * Instância global única do PrismaClient (Padrão Singleton).
 * Isso evita criar uma nova conexão com o banco a cada requisição.
 */
const prisma = new PrismaClient({
  // Descomente para ver todas as queries SQL no seu log
  // log: ['query'],
});

export default prisma;