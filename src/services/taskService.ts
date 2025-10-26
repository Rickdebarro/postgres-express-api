import * as TaskModel from '../models/taskModel';
import { Task } from '@prisma/client';
import { createTaskInterface } from '../interfaces/taskInterface';
import { updateTaskInterface } from '../interfaces/taskInterface';
import { filterTaskInterface } from '../interfaces/taskInterface';



const checkTaskOwner = async (taskId: string, userId: string): Promise<Task> => {

  const task = await TaskModel.findById(taskId);

  if (!task) {
    console.warn(`[TaskService] Tarefa não encontrada. TaskID: ${taskId}, UserID: ${userId}`);
    throw new Error('NOT_FOUND');
  }

  if (task.userId !== userId) {
    console.warn(`[TaskService] ACESSO NEGADO. UserID ${userId} tentou aceder à TaskID ${taskId}`);
    throw new Error('FORBIDDEN');
  }
  
  return task;
};


export const createTask = async (taskData: createTaskInterface, userId: string): Promise<Task> => {
  console.log(`[TaskService] Criando nova tarefa para o UserID: ${userId}`);
  
  return await TaskModel.create(taskData, userId);
};

export const findAllByUser = async (userId: string, filters: filterTaskInterface): Promise<Task[]> => {
  console.log(`[TaskService] Buscando tarefas para o UserID: ${userId} com filtros:`, filters);

  const queryFilters: { isDone?: boolean } = {};
  if (filters.isDone !== undefined) {
    queryFilters.isDone = filters.isDone;
  }

  return await TaskModel.findAllByUserId(userId, queryFilters);
};

export const findTaskById = async (taskId: string, userId: string): Promise<Task> => {
  console.log(`[TaskService] Buscando tarefa por ID. TaskID: ${taskId}, UserID: ${userId}`);
  
  return await checkTaskOwner(taskId, userId);
};

export const updateTask = async (
  taskId: string,
  taskData: updateTaskInterface,
  userId: string,
  isPartial: boolean 

): Promise<Task> => {
  console.log(`[TaskService] Atualizando tarefa. TaskID: ${taskId}, UserID: ${userId}`);
  
  await checkTaskOwner(taskId, userId);

  const updatedTask = await TaskModel.update(taskId, taskData);

  return updatedTask;
};

export const removeTask = async (taskId: string, userId: string): Promise<void> => {
  console.log(`[TaskService] Removendo tarefa. TaskID: ${taskId}, UserID: ${userId}`);

  await checkTaskOwner(taskId, userId);

  await TaskModel.remove(taskId);
};