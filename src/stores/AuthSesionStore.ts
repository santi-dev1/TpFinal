import { defineStore } from 'pinia'
import router from '@/router'

import type { SesionStateModel } from '@/models/SessionStateModel'
import type { CredentialsModel } from '@/models/CredentialsModel'

import { API } from '@/services'
import { apiInstance } from '@/services/api'

export const useSesionStore = defineStore({
  id: 'sesion',
  state: (): SesionStateModel => ({
    loading: false,
    data: {
      user: undefined,
      crsfToken: undefined,
      jwtExpires: undefined,
    },
    error: '',
  }),
  actions: {
    changeCrsfToken() {
      const headers = apiInstance.defaults.headers
      this.data!.crsfToken = headers['csrf-token']?.toString()
      console.info('[Sesion Store 🔑] CRSF Token Actualizado')
    },

    async registerUser(userData: CredentialsModel) {
      this.loading = true
      console.log('intentando registrar')
      try {
        const response = await API.CreateUser(userData)
        console.log('Respuesta de la API:', response)

        if (response.status === 201) {
          this.data!.user = userData
          console.info('[AUTH-API 🔑] Usuario Creado, codigo de respuesta: ' + response.status)
          this.login(userData)
          this.loading = false
        }
      } catch (e) {
        console.error('[AUTH-API 🔑] Error al registrar usuario', e)
        this.error = e!.toString()
      }
    },

    async login(userData: CredentialsModel) {
      this.loading = true
      try {
        const response = await API.Login(userData)
        if (response.status === 200) {
          this.data!.user = userData
          const currentEpochTime = Math.floor(Date.now() / 1000)
          this.data!.jwtExpires = currentEpochTime + 3 * 60
          console.info('[AUTH-API 🔑] Usuario Logeado, codigo de respuesta: ' + response.status)
          console.info('[Sesion Store 🔑] Ruteando a Tareas')
          this.renewToken()
          this.loading = false
          router.push('/tasks')
        }
      } catch (e) {
        this.loading = false
        console.error('[AUTH-API 🔑] Error al loggear al usuario', e)
        this.error = e!.toString()
      }
    },

    renewToken() {
      console.info('[Sesion Store 🔑] Renovando el token en 3 min')
      setTimeout(
        async () => {
          try {
            const response = await API.Login({
              email: this.data!.user!.email,
              password: this.data!.user!.password,
            })
            if (response.status === 200) {
              const currentEpochTime = Math.floor(Date.now() / 1000)
              this.data!.jwtExpires = currentEpochTime + 3 * 60
              console.info('[AUTH-API 🔑] Token Renovado')
            }
          } catch (e) {
            console.error('[AUTH-API 🔑] Error al obtener el token', e)
            this.error = e!.toString()
          }
        },
        3 * 60 * 1000,
      )

      setTimeout(() => this.renewToken(), 3 * 60 * 1000)
    },

    async logout() {
      this.loading = true
      this.data!.user = undefined
      this.data!.jwtExpires = undefined
      try {
        const response = await API.Logout()
        if (response.status === 200) {
          console.info(
            '[AUTH-API 🔑] Usuario Desconectado, codigo de respuesta: ' + response.status,
          )
          this.loading = false
          router.push('/')
        }
      } catch (e) {
        console.error('[AUTH-API 🔑] Error al desconectar el usuario', e)
        this.loading = false
        this.error = e!.toString()
      }
    },
  },
})
