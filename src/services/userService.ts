import bcrypt from 'bcrypt';
import * as UserModel from '../models/userModel'; 
import { User } from '@prisma/client';
import { userInterface } from '../interfaces/userInterface';

export const registerUser = async (userData: userInterface): Promise<Omit<User, 'password'>> => {
  const { name, email, password } = userData;

  console.log(`[UserService] Verificando e-mail: ${email}`);
  const existingUser = await UserModel.findByEmail(email);

  if (existingUser) {
    console.warn(`[UserService] Tentativa de registo com e-mail duplicado: ${email}`);
    throw new Error('EMAIL_IN_USE');
  }

  console.log('[UserService] Encriptando senha...');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log('[UserService] Criando utilizador na base de dados...');
  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};