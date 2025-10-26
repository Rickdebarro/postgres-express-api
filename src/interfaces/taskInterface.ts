export interface createTaskInterface {
  description: string;
  isDone?: boolean;
}

export interface updateTaskInterface {
  description?: string;
  isDone?: boolean;
}