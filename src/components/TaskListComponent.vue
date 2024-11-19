<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useTaskStore } from '@/stores/TaskStore'

import SpinnerComponent from '@/components/SpinnerComponent.vue'

const themeStore = useThemeStore()
const theme = reactive(themeStore)

const taskStore = useTaskStore()
const tareas = reactive(taskStore)

tareas.getAllTasks()
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'dark' : ''"
    class="list-wrapper max-w-7xl rounded-lg overflow-y-auto shadow-lg mt-10 p-6 transition ease-linear bg-gray-100 dark:bg-gray-900"
  >
    <div class="px-6 py-4">
      <div class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">
        <span class="flex flex-row justify-start items-center">
          Tasks Added
          <div class="px-6 py-2 mt-6 flex justify-start">
            <span
              @click="tareas.showAll"
              class="filter-btn hover:bg-gray-500 cursor-pointer shadow-lg"
              >Todas</span
            >
            <span
              @click="tareas.showCompleted"
              class="filter-btn hover:bg-green-600 cursor-pointer shadow-lg"
              >Completas</span
            >
            <span
              @click="tareas.showPending"
              class="filter-btn hover:bg-red-700 cursor-pointer shadow-lg"
              >Pendientes</span
            >
          </div>
          <SpinnerComponent v-show="tareas.loading" />
        </span>
      </div>
    </div>

    <div
      v-for="task in tareas.data"
      :key="task.id"
      class="task-wrapper relative group border-b border-gray-300 dark:border-gray-700 mt-6 pb-4 transition ease-linear"
    >
      <form v-on:submit.prevent>
        <div class="absolute top-3 sm:top-4 left-5">
          <div @click="tareas.changeStatus(task)" class="relative">
            <input
              type="checkbox"
              v-model="task.completada"
              class="form-checkbox border rounded-full focus:outline-none h-6 w-6 cursor-pointer transition ease-linear"
            />
            <span v-if="task.completada" class="absolute left-0 top-0 text-green-500"> ✓ </span>
          </div>
        </div>

        <input
          disabled
          v-model="task.tarea"
          v-bind:class="theme.isDark ? 'dark' : ''"
          type="text"
          class="task-input sm:text-base overflow-ellipsis w-full disabled:bg-gray-200 focus:outline-none py-3 sm:py-4 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-2 dark:focus:ring-green-500 dark:focus:border-transparent"
        />

        <div
          class="task-buttons absolute right-0 top-0 py-2 sm:py-3 px-3 w-auto flex justify-end items-center space-x-2"
        >
          <span
            v-if="task.completada"
            class="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide"
            >Completo</span
          >
          <span
            v-if="!task.completada"
            class="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide"
            >Pendiente</span
          >
          <button
            @click="tareas.removeTask(task)"
            class="filter-btn hover:bg-red-700 cursor-pointer shadow-lg"
          >
            Borrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  background: rgb(190, 190, 190);
}

.list-wrapper.dark {
  background: rgb(32, 32, 32);
}

.task-input {
  border-radius: 8px;
}

.task-input.dark {
  background: #434343;
}

.task-badge {
  top: -8px;
}

.filter-btn {
  background: rgb(34, 34, 34);
  color: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  margin-right: 0.5rem;
  transition: background-color 0.3s ease;
}

.filter-btn:hover {
  background-color: #f03e3e;
}

.task-wrapper {
  background: rgb(240, 240, 240);
  border-radius: 8px;
}

.task-wrapper.dark {
  background: rgb(50, 50, 50);
}
</style>
