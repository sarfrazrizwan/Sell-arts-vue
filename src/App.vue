<template>
  <div id="app" class="bg1">
    <Header v-if="!isAuthRoute" />
    <section>
      <div class="main-content">
        <div class="custom-pt custom-pb">
          <router-view />
        </div>
      </div>
    </section>
    <notifications position="bottom right" class="mt-5" :closeOnClick="true" />
    <vue-confirm-dialog />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import "@/assets/css/bootstrap.min.css"
import "@/assets/css/style.css"
import "@/assets/css/custom.css"
import Header from "@/components/shared/Header.vue"
export default Vue.extend({
  components: {
    Header
  },
  computed: {
    isAuthRoute(): boolean {
      return [
        "login",
        "register",
        "password.forget",
        "password.reset"
      ].includes(this.$route.name || "")
    }
  }
})
</script>
