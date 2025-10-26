import prisma from '../database';
import { Task } from '@prisma/client';
import { createTaskInterface } from '../interfaces/taskInterface';
import { updateTaskInterface } from '../interfaces/taskInterface';

export const create = async (taskData: createTaskInterface, userId: string): Promise<Task> => {
  console.log('[TaskModel] Criando tarefa...');
  return await prisma.task.create({
    data: {
      ...taskData,
      userId: userId,
    },
  });
};

export const findAllByUserId = async (userId: string, filters: { isDone?: boolean }): Promise<Task[]> => {
  console.log('[TaskModel] Buscando todas as tarefas por userId:', userId);
  return await prisma.task.findMany({
    where: {
      userId: userId,
      ...filters,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const findById = async (taskId: string): Promise<Task | null> => {
  console.log('[TaskModel] Buscando tarefa por ID:', taskId);
  return await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });
};

export const update = async (taskId: string, taskData: updateTaskInterface): Promise<Task> => {
  console.log('[TaskModel] Atualizando tarefa:', taskId);
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: taskData,
  });
};

export const remove = async (taskId: string): Promise<Task> => {
  console.log('[TaskModel] Removendo tarefa:', taskId);
  return await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};