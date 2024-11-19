<script setup lang="ts">
import FormTaskComponent from '@/components/FormTaskComponent.vue'
import TaskListComponent from '@/components/TaskListComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useSesionStore } from '@/stores/AuthSesionStore'
import { useThemeStore } from '@/stores/ThemeStore'
import { reactive } from 'vue'

const themestore = useThemeStore()
const theme = reactive(themestore)
const sesionStore = useSesionStore()
const sesion = reactive(sesionStore)
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 p-7 rounded-lg shadow-lg w-screen">
      <div class="flex items-center justify-between w-full">
        <p class="text-2xl lg:text-3xl text-gray-800 dark:text-white font-bold tracking-wider">
          Administre sus Tareas
        </p>
        <button
          @click="sesion.logout"
          :class="
            theme.isDark
              ? 'text-white bg-gray-700 hover:bg-gray-600 focus-visible:ring-gray-500'
              : 'text-red-700 bg-white hover:bg-red-100 focus-visible:ring-red-300'
          "
          class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-10 px-4"
        >
          Cerrar Sesión
        </button>
      </div>

      <div
        class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4"
      >
        <div class="w-full flex flex-col items-center w-screen">
          <FormTaskComponent class="w-full max-w-full" />
        </div>
        <div class="w-full flex flex-col items-center w-screen">
          <TaskListComponent class="w-full max-w-full" />
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>
