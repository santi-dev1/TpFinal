type TaskCompl = 'Completada' | 'Incompleta'

export interface CreateTask {
  title: string
  description: TaskCompl //este es el tipo que creamos arriba
}
