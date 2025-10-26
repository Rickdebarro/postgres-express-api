import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as UserModel from '../models/userModel';
import { User } from '@prisma/client';
import { loginInterface } from '../interfaces/loginInterface';


interface loginResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export const loginUser = async (loginData: loginInterface): Promise<loginResponse> => {
  const { email, password } = loginData;

  const user = await UserModel.findByEmail(email);

  if (!user) {
    console.warn(`[AuthService] Tentativa de login falhada. Utilizador não encontrado: ${email}`);
    throw new Error('NOT_FOUND');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    console.warn(`[AuthService] Tentativa de login falhada. Senha incorreta para: ${email}`);
    throw new Error('UNAUTHORIZED');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('[AuthService] JWT_SECRET não está definido.');
    throw new Error('JWT_SECRET_NOT_FOUND');
  }

  const token = jwt.sign(
    { id: user.id },
    jwtSecret,
    { expiresIn: '1h' }
  );

  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};