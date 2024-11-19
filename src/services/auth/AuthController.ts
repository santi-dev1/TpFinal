import { apiInstance } from '../api'
import type { APIResponse } from '@/models/ApiResponseModel'
import type { CredentialsModel } from '@/models/CredentialsModel'
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel'

//esta funcion creará el usuario
export async function CreateUser(userData: CredentialsModel) {
  console.log('creando usuario')
  return await apiInstance.post<APIResponse<AuthApiResponseModel>>('auth/signup', userData)
}

//esta funcion nos logueará
export async function Login(credentials: CredentialsModel) {
  const response = await apiInstance.post<APIResponse<AuthApiResponseModel>>(
    '/auth/login',
    credentials,
    {
      withCredentials: true,
    },
  )

  const setCookieHeader = response.headers['set-cookie']
  return response
}

//con esta funcion cerraremos sesion
export async function Logout() {
  return await apiInstance.post<APIResponse<null>>('/auth/logout')
}
