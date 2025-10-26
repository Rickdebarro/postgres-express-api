import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  console.log(`[Register] Recebida tentativa de registro para: ${req.body.email}`);
  try {
    const { name, email, password } = req.body;
    const newUser = await userService.registerUser({ name, email, password });

    console.log(`[Register] Usuário criado com sucesso. ID: ${newUser.id}`);
    return res.status(201).json(newUser);
  } catch (error: any) {
    console.warn(`[Register] Falha no registro para ${req.body.email}: ${error.message}`);

    if (error.message === 'EMAIL_IN_USE') {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    if (error.name === 'PrismaClientValidationError') {
      console.warn(`[Register] Erro de validação do Prisma: ${error.message}`);
      return res.status(422).json({ message: 'Dados de entrada inválidos ou em falta.' });
    }
    
    console.error(`[Register] Erro inesperado:`, error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};