import { defineStore } from 'pinia'
import type { Task, TaskState } from '@/models/TaskModel'
import type { CreateTask } from '@/models/TaskRequestModels'
import { API } from '@/services'

interface TaskFilterState extends TaskState {
  completed: Task[]
  pending: Task[]
  all: Task[]
}

export const useTaskStore = defineStore({
  id: 'tasks',
  state: (): TaskFilterState => ({
    loading: false,
    data: [],
    all: [],
    completed: [],
    pending: [],
  }),
  actions: {
    async addTask(task: Task) {
      this.loading = true
      console.info('[Task Store 💾] Intentando crear una nueva tarea')
      try {
        const apiTask: CreateTask = {
          title: task.tarea,
          description: task.completada ? 'Completada' : 'Incompleta',
        }
        const response = await API.createTask(apiTask)
        if (response.status === 201) {
          const tId: number = response.data.id!
          const newTask: Task = { ...task, id: tId }
          this.data.push(newTask)
          console.info('[API 🌐] Nueva tarea agregada')
          this.all.push(newTask)
          await this.getAllTasks()
        }
      } catch (e) {
        console.error('[API 🌐] Error creando la tarea', e)
        this.loading = false
      }
    },

    async getAllTasks() {
      if (this.loading === false) {
        this.loading = true
      }
      console.info('[Task Store 💾] Intentando obtener todas las tareas')
      try {
        const response = await API.getTasks()
        if (response.status === 200) {
          response.data.forEach((task) => {
            const retrievedTask: Task = {
              id: task.id!,
              tarea: task.title!,
              completada: task.description === 'Completada' ? true : false,
            }
            this.data.push(retrievedTask)
            this.all.push(retrievedTask)
          })
          const uniqueTasks = this.all.filter(
            (task, index, self) => self.findIndex((t) => t.id === task.id) === index,
          )
          this.data = uniqueTasks
          this.all = uniqueTasks
          this.completed = uniqueTasks.filter((task) => task.completada)
          this.pending = uniqueTasks.filter((task) => !task.completada)
          console.info('[API 🌐] Se obtuvieron y organizaron todas las tareas')
          this.loading = false
        }
      } catch (e) {
        console.error('[API 🌐] Error obteniendo las tareas', e)
        this.loading = false
      }
    },

    async removeTask(task: Task) {
      this.loading = true
      console.info('[Task Store 💾] Intentando eliminar la tarea', task)
      try {
        const response = await API.deleteTask(task.id!)
        if (response.status === 200) {
          console.info('[API 🌐] Tarea eliminada con éxito')
        }
      } catch (e) {
        console.error('[API 🌐] Error eliminando la tarea', e)
        this.loading = false
      }
      this.data = this.data.filter((t) => t.id !== task.id)
      this.all = this.all.filter((t) => t.id !== task.id)
      this.completed = this.completed.filter((t) => t.id !== task.id)
      this.pending = this.pending.filter((t) => t.id !== task.id)
      await this.getAllTasks()
    },

    async changeStatus(task: Task) {
      this.loading = true
      const index = this.data.findIndex((item) => item.id === task.id)
      const updatedTask = { ...this.data[index], completada: !this.data[index].completada }

      this.data[index] = updatedTask

      const apiToBeUpdateTask: CreateTask = {
        title: updatedTask.tarea,
        description: updatedTask.completada ? 'Completada' : 'Incompleta',
      }

      console.info('[Task Store 💾] Intentando actualizar la tarea')
      try {
        const response = await API.updateTask(updatedTask.id!, apiToBeUpdateTask)
        console.info('[API 🌐] Tarea con id: ', response.data.id, ' actualizada')
        this.loading = false
      } catch (e) {
        console.error('[API 🌐] Error actualizando la tarea', e)
        this.loading = false
      }


      if (updatedTask.completada) {
        this.completed.push(updatedTask)
        this.pending = this.pending.filter((item) => item.id !== updatedTask.id)
      } else {
        this.pending.push(updatedTask)
        this.completed = this.completed.filter((item) => item.id !== updatedTask.id)
      }
    },

    showCompleted() {
      this.data = this.completed
    },

    showPending() {
      this.data = this.pending
    },

    showAll() {
      this.data = this.all
    },
  },
})
