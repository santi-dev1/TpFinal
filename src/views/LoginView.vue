<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useSesionStore } from '@/stores/AuthSesionStore'
import router from '@/router'

import SpinnerComponent from '@/components/SpinnerComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const useTheme = useThemeStore()
const theme = reactive(useTheme)

const useSesion = useSesionStore()
const session = reactive(useSesion)

const reactiveCredentials = reactive({
  email: '',
  password: '',
})

session.changeCrsfToken()
async function loginWithCredentials() {
  const response = await session.login({
    email: reactiveCredentials.email,
    password: reactiveCredentials.password,
  })
}
</script>

<template>
  <div
    :class="
      theme.isDark
        ? 'flex items-center justify-center h-screen text-white font-roboto p-6'
        : 'flex items-center justify-center h-screen text-gray-800 font-roboto p-6'
    "
  >
    <form
      @submit.prevent="loginWithCredentials()"
      class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md flex flex-col items-center space-y-5 max-w-md w-full"
    >
      <a
        :class="
          theme.isDark
            ? 'text-white bg-gray-700 hover:bg-gray-600 focus-visible:ring-gray-500'
            : 'text-red-700 bg-gray-700 hover:bg-red-100 focus-visible:ring-red-300'
        "
        class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-10 px-4"
        href="/register"
        @click="router.push('register')"
        >Register</a
      >
      <h1
        :class="theme.isDark ? 'text-2xl font-bold mb-4' : 'text-2xl font-bold text-red-700 mb-4'"
      >
        Login
      </h1>

      <div class="w-full">
        <label
          for="email"
          class="block text-sm font-medium mb-2 text-center"
          :class="theme.isDark ? '' : 'text-red-700'"
        >
          Email
        </label>
        <input
          v-model="reactiveCredentials.email"
          type="email"
          name="email"
          id="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400"
          placeholder="nombre@correo.com"
          required
        />
      </div>
      <div class="w-full">
        <label
          for="password"
          class="block text-sm font-medium mb-2 text-center"
          :class="theme.isDark ? '' : 'text-red-700'"
        >
          Password
        </label>
        <input
          v-model="reactiveCredentials.password"
          type="password"
          name="password"
          id="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:placeholder-gray-400"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
      >
        <p v-show="!session.loading">Ingresar</p>
        <SpinnerComponent v-show="session.loading" class="my-auto" />
      </button>
      <FooterComponent></FooterComponent>
    </form>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

:root {
  font-family: 'Roboto', sans-serif;
}
</style>
