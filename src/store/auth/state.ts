import Auth from "@/models/store/Auth"
import { getUser } from "@/helpers/auth-handler"
const states: Auth = {
  isLoggedIn: localStorage.getItem("access_token") ? true : false,
  user: getUser()
}

export default states
