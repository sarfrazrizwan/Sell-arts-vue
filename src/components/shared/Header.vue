<template>
  <header class="header bg1">
    <div class="h_top">
      <div class="mx-width">
        <nav class="navbar navbar-expand-lg">
          <router-link class="navbar-brand" :to="{ name: 'home' }">
            <div class="d-flex flex-column">
              <img src="@/assets/logo-sm.png" width="50" height="50" />
            </div>
          </router-link>
          <button
            type="button"
            class="navbar-toggler navbarToggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            @click="isSidebarClose = false"
          >
            <div class="toggle-icon"></div>
            <div class="toggle-icon"></div>
            <div class="toggle-icon"></div>
          </button>
          <div
            class="navbar-collapse topData"
            :class="{ hclose: isSidebarClose }"
            id="navbarCollapse"
          >
            <div class="ml-auto">
              <router-link
                class="navbar-brand d-lg-none d-block"
                :to="{ name: 'home' }"
              >
                <div class="d-flex flex-column">
                  <img src="@/assets/logo-sm.png" width="50" height="50" />
                </div>
              </router-link>

              <ul class="navbar-nav top-navbar">
                <li>
                  <router-link
                    active-class="active-link"
                    tag="a"
                    class="search"
                    :to="{ name: 'search' }"
                  >
                    Explore
                  </router-link>
                </li>
                <li>
                  <router-link
                    exact
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'home' }"
                  >
                    Home
                  </router-link>
                </li>
                <li>
                  <router-link
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'profile' }"
                    v-if="isLoggedIn"
                  >
                    My Profile
                  </router-link>
                </li>
                <li>
                  <router-link
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'sell' }"
                  >
                    Post
                  </router-link>
                </li>
                <li v-if="!isLoggedIn">
                  <router-link
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'login' }"
                  >
                    Sign in
                  </router-link>
                  <router-link
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'register' }"
                  >
                    / Sign up
                  </router-link>
                </li>

                <li>
                  <router-link
                    active-class="active-link"
                    tag="a"
                    :to="{ name: 'orders' }"
                  >
                    Dashboard
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'cart' }">
                    <img src="@/assets/images/shopping-cart.svg" />
                  </router-link>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="closeIcon navbarToggler"
              @click="isSidebarClose = true"
            ></button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
export default Vue.extend({
  name: "Header",
  data: () => ({
    isSidebarClose: true
  }),
  computed: {
    ...mapGetters({ authUser: "auth/user", isLoggedIn: "auth/isLoggedIn" })
  },
  methods: {}
})
</script>
<style scoped>
.sub-logo-text {
  position: absolute;
  top: 49px;
  left: 10px;
  font-size: 10px;
  color: black;
}
</style>
