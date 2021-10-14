import state from "./state"
import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const auth = {
  namespaced: true,
  state: () => ({ ...state }),
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default auth
