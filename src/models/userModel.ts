import prisma from '../database'; // Importa o nosso cliente Prisma
import { User } from '@prisma/client'; // Importa o TIPO 'User' gerado pelo Prisma
import { userInterface } from '../interfaces/userInterface';

/**
 * Cria um novo utilizador no banco de dados.
 */
export const create = async (userData: userInterface): Promise<User> => {
  console.log('[UserModel] Criando utilizador...');
  return await prisma.user.create({
    data: userData,
  });
};

/**
 * Encontra um utilizador pelo seu endereço de e-mail.
 * Usado para o login e para verificar se o e-mail já existe.
 */
export const findByEmail = async (email: string): Promise<User | null> => {
  console.log('[UserModel] Buscando utilizador por email:', email);
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

/**
 * Encontra um utilizador pelo seu ID.
 * (Pode ser útil para a rota /protected ou futuras funcionalidades)
 */
export const findById = async (userId: string): Promise<User | null> => {
  console.log('[UserModel] Buscando utilizador por ID:', userId);
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};