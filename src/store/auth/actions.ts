import { api } from "@/services/instance"
export default {
  logout: ({ commit }: any) => {
    api.post("/logout").then(() => {
      commit("logout")
    })
  }
}
