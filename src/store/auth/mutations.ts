import AuthState from "@/models/store/Auth"
import User from "@/models/User"
import { setUser, updateUser } from "@/helpers/auth-handler"
import router from "@/router"

export default {
  login: (state: AuthState, payload: User) => {
    state.isLoggedIn = true
    state.user = payload
    setUser(payload)
  },
  logout: (state: AuthState) => {
    state.isLoggedIn = false
    state.user = undefined
    localStorage.clear()
    router.push("/login")
  },
  updateUser: (state: AuthState, payload: User) => {
    state.user = payload
    updateUser(payload)
  }
}
