<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useTaskStore } from '@/stores/TaskStore'
import type { Task } from '@/models/TaskModel'

const themeStore = useThemeStore()
const theme = reactive(themeStore)

const taskStore = useTaskStore()

const newTask: Task = {
  id: 0,
  tarea: '',
  completada: false,
}

function saveTask() {
  if (newTask.tarea.trim() !== '') {
    taskStore.addTask({ ...newTask })
    newTask.tarea = ''
    newTask.completada = false
  } else {
    alert('Complete el campo de la tarea')
  }
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex flex-col items-center space-y-5 max-w-md w-full"
  >
    <form @submit.prevent="saveTask" class="space-y-4">
      <div class="px-6 py-4">
        <div class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">
          <span class="flex flex-row justify-start items-center"> Agregue una tarea </span>
        </div>
      </div>
      <input
        v-bind:class="theme.isDark ? 'bg-gray-800 text-white' : 'bg-gray-200'"
        v-model="newTask.tarea"
        type="text"
        placeholder="Add Task"
        class="w-full p-2 rounded border"
      />
      <div class="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completeToggle"
          v-model="newTask.completada"
          class="cursor-pointer"
        />
        <label
          for="completeToggle"
          class="cursor-pointer text-white text-2xl font-bold mb-4 text-center"
        >
          Cambiar estado
        </label>
      </div>
      <div>
        <button
          type="submit"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
        >
          Add Task
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
