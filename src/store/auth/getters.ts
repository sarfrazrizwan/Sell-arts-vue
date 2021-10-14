import AuthState from "@/models/store/Auth"

export default {
  isLoggedIn: (state: AuthState) => state.isLoggedIn,
  user: (state: AuthState) => state.user
}
