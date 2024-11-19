<script setup lang="ts">
import { RouterView } from 'vue-router'
import { reactive } from 'vue'
import { MoonIcon, SunIcon, LinkIcon } from '@heroicons/vue/24/solid'
import { useThemeStore } from '@/stores/ThemeStore'

const useStore = useThemeStore()
const theme = reactive(useStore)
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'dark' : ''"
    class="transition ease-linear flex flex-col w-screen h-screen"
  >
    <div class="btn-wrapper z-10 absolute right-4 top-4">
      <div class="toggle-btn flex items-center justify-center w-full my-4">
        <label for="toggle" class="flex items-center justify-center cursor-pointer">
          <div class="relative">
            <input type="checkbox" id="toggle" class="sr-only" @click="theme.toggleTheme" />
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div
              class="absolute left-1 top-1 bg-black w-6 h-6 flex items-center justify-center rounded-full transition"
            >
              <MoonIcon v-if="!theme.isDark" class="w-4 h-4 text-white" />
              <SunIcon v-if="theme.isDark" class="w-full h-full text-yellow-500 p-1" />
            </div>
          </div>

          <div
            v-bind:class="theme.isDark ? 'dark text-red-700' : 'text-white'"
            class="label-text ml-2 font-medium"
          >
            {{ theme.mode }}
          </div>
        </label>
      </div>
    </div>

    <div
      v-bind:class="theme.isDark ? 'dark' : ''"
      class="img flex-grow bg-cover bg-center transition"
      :style="{
        backgroundImage: theme.isDark
          ? 'url(https://wallpapers.com/images/hd/3440-x-1440-4k-e74fuqplz54vakcb.jpg?raw=true)'
          : 'url(https://4kwallpapers.com/images/wallpapers/asus-rog-futuristic-3440x1440-11603.jpg?raw=true)',
      }"
    ></div>

    <div
      class="lg:w-2/3 xl:w-2/5 w-full px-7 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
