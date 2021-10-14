import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import store from "@/store"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/Search.vue")
  },
  {
    path: "/profile/:userId?",
    name: "profile",
    component: () => import("@/views/Profile.vue")
  },
  {
    path: "/sell",
    name: "sell",
    component: () => import("@/views/Sell.vue")
  },
  {
    path: "/art/:slug",
    name: "artwork",
    component: () => import("@/views/Artwork.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue")
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/dashboard/Order.vue")
  },
  {
    path: "/my-orders",
    name: "my-orders",
    component: () => import("@/views/dashboard/MyOrder.vue")
  },
  {
    path: "/inventory",
    name: "inventory",
    component: () => import("@/views/dashboard/Inventory.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue")
  },
  {
    path: "/signup",
    name: "register",
    component: () => import("@/views/auth/Register.vue")
  },
  {
    path: "/password/forget",
    name: "password.forget",
    component: () => import("@/views/auth/ForgetPassword.vue")
  },
  {
    path: "/password/reset",
    name: "password.reset",
    component: () => import("@/views/auth/ResetPassword.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
const authRoutes = ["login", "register", "password.forget", "password.reset"]
const isLoggedIn = store.getters["auth/isLoggedIn"]

router.beforeEach((to, from, next) => {
  if (!authRoutes.includes(to.name || "") && !isLoggedIn) {
    next({ name: "login" })
  }
  if (authRoutes.includes(to.name || "") && isLoggedIn) {
    next({ name: "home" })
  } else next()
})
export default router
