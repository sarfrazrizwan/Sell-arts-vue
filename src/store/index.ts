import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import auth from "./auth"
import app from "./app"
export default new Vuex.Store({
  modules: {
    auth,
    app
  }
})
