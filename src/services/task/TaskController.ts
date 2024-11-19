import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CreateTask } from '@/models/TaskRequestModels'
import type { TaskApiResponse } from '@/models/TaskApiResponseModel'

//funcion para crear una tarea
export async function createTask(task: CreateTask) {
  return await apiInstance.post<TaskApiResponse>('/todo', task)
}

//funcion para obtener todas las tareas
export async function getTasks() {
  return await apiInstance.get<TaskApiResponse[]>('/todo')
}

//funcion para recibir una sola tarea
export async function getTask(id: number) {
  return await apiInstance.get<TaskApiResponse>(`/todo/${id}`)
}

//funcion para actualizar una tarea
export async function updateTask(id: number, task: CreateTask) {
  return await apiInstance.patch<TaskApiResponse>(`/todo/${id}`, task)
}

//funcion para borrar una tarea
export function deleteTask(id: number) {
  return apiInstance.delete(`/todo/${id}`)
}
