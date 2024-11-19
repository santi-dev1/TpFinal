import { Login, CreateUser, Logout } from './auth/AuthController'

import { createTask, getTask, getTasks, updateTask, deleteTask } from './task/TaskController'

export const API = {
  //actions de auth
  Login,
  CreateUser,
  Logout,

  //actions de tasks
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
}
