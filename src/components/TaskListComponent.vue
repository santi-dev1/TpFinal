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
    class="max-w-7xl rounded-lg overflow-y-auto shadow-lg mt-10 p-6 transition ease-linear bg-gray-100 dark:bg-gray-900 max-h-[60vh]"
  >
    <div class="px-6 py-4">
      <div class="font-bold text-2xl mb-4 text-gray-800 dark:text-white">
        <span class="flex flex-row justify-between items-center">
          Tasks Added
          <div class="flex space-x-4">
            <button
              @click="tareas.showAll"
              class="bg-gray-800 text-white rounded-lg px-4 py-2 font-bold transition hover:bg-gray-500 shadow-lg"
            >
              Todas
            </button>
            <span
              @click="tareas.showCompleted"
              class="bg-gray-800 text-white rounded-lg px-4 py-2 font-bold mr-2 transition ease-in-out hover:bg-green-600 cursor-pointer shadow-lg"
              >Completas</span
            >
            <span
              @click="tareas.showPending"
              class="bg-gray-800 text-white rounded-lg px-4 py-2 font-bold mr-2 transition ease-in-out hover:bg-red-700 cursor-pointer shadow-lg"
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
      class="relative group border-b border-gray-300 dark:border-gray-700 mt-6 pb-4 transition ease-linear bg-gray-200 rounded-lg dark:bg-gray-800"
    >
      <form v-on:submit.prevent>
        <div class="absolute top-3 sm:top-4 left-5">
          <div @click="tareas.changeStatus(task)" class="relative">
            <input
              type="checkbox"
              v-model="task.completada"
              class="form-checkbox border rounded-full focus:outline-none h-6 w-6 cursor-pointer transition ease-linear"
            />
            <span v-if="task.completada" class="absolute left-0 top-0 text-green-500">✓</span>
          </div>
        </div>

        <input
          disabled
          v-model="task.tarea"
          v-bind:class="theme.isDark ? 'dark' : ''"
          type="text"
          class="w-full sm:text-base overflow-ellipsis disabled:bg-gray-200 focus:outline-none py-3 sm:py-4 pr-8 pl-14 sm:pl-16 cursor-pointer transition ease-linear text-gray-800 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-2 dark:focus:ring-green-500 dark:focus:border-transparent"
        />

        <div
          class="absolute right-0 top-0 py-2 sm:py-3 px-3 w-auto flex justify-end items-center space-x-2"
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
            class="bg-gray-800 text-white rounded-lg px-4 py-2 font-bold transition ease-in-out hover:bg-red-700 cursor-pointer shadow-lg"
          >
            Borrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
