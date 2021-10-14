import Vue from "vue"
import axios, { AxiosStatic, Method } from "axios"
import { APP_URL } from "@/configs/app"
import store from "@/store"

const notifySuccess = (message: string) => {
  Vue.notify({
    title: "Success",
    text: message,
    type: "success"
  })
}
const notifyError = (message: string) => {
  Vue.notify({
    title: "Error",
    text: message,
    type: "error"
  })
}

const api = axios.create({
  baseURL: APP_URL,
  responseType: "json"
})
// api.defaults.withCredentials = true
const isGetRequest = (method?: Method) => {
  return method === "GET" || method === "get"
}

api.interceptors.request.use(config => {
  config.headers["Accept"] = "application/json"
  if (!isGetRequest(config.method)) {
    // store.commit("app/setLoading", true)
  }
  const accessToken = localStorage.getItem("access_token")
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  response => {
    const message = response.data.message
    if (message) notifySuccess(message)
    // store.commit("app/setLoading", false)
    return response
  },
  error => {
    if (error.response.status === 401) {
      store.commit("auth/logout")
    }
    const message = error.response.data.message
    if (message) notifyError(message)

    // store.commit("app/setLoading", false)
    return Promise.reject(error)
  }
)

Vue.prototype.$api = api

declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosStatic
    $api: AxiosStatic
  }
}
export { api }
export default api
