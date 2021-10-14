<template>
  <section class="auth-section">
    <div class="bg1 fh">
      <div class="auth-sigin">
        <div class="text-center">
          <img src="@/assets/logo.jpg" width="150" />
        </div>
        <div class="mt-1 caption text-center">
          Be your own curator
        </div>
        <div class="text-center mt-5 pt-4">
          <h2>Log In</h2>
        </div>
        <div class="text-center newUser">
          <span class="text">New user?</span>
          <router-link class="link" :to="{ name: 'register' }">
            Create an account
          </router-link>
        </div>
        <div class="form-wrap mt-5 pt-4">
          <validation-observer ref="loginForm" v-slot="{ invalid }">
            <form action="" method="get">
              <div class="form-group position-relative">
                <VeeInput
                  id="email"
                  name="email"
                  rules="required"
                  type="email"
                  v-model="user.email"
                >
                  <template #label>
                    <label for="email" class="form-icon"
                      ><img src="@/assets/images/mail.svg"
                    /></label>
                  </template>
                </VeeInput>
              </div>

              <div class="form-group position-relative">
                <VeeInput
                  id="password"
                  name="password"
                  rules="required|min:8"
                  type="password"
                  v-model="user.password"
                >
                  <template #label>
                    <label for="password" class="form-icon"
                      ><img src="@/assets/images/password.svg"
                    /></label>
                    <span class="form-picon"
                      ><img src="@/assets/images/eye.svg"
                    /></span>
                  </template>
                </VeeInput>
              </div>
              <div class="text-right mb-2">
                <router-link class="fp-link" :to="{ name: 'password.forget' }">
                  Forgot Password?
                </router-link>
              </div>
              <div class="form-group mb-0">
                <button
                  :disabled="invalid"
                  type="button"
                  class="btn btn-login w-100 text-center"
                  @click="doLogin()"
                >
                  Login
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue"
import { mapMutations } from "vuex"
import { ValidationObserver } from "vee-validate"
// import User from "@/models/User"
export default Vue.extend({
  components: { ValidationObserver },
  data: () => ({
    user: {
      email: "",
      password: ""
    }
  }),
  methods: {
    ...mapMutations("auth", ["login"]),
    doLogin() {
      this.$api
        .post("login", this.user)
        .then(response => {
          this.login(response.data.data)
          location.reload()
        })
        .catch(error =>
          this.validationErrors(
            this.$refs.loginForm,
            error.response.data.errors
          )
        )
    },
    validationErrors(form: any, errors: any) {
      form.setErrors(errors)
    }
  }
})
</script>
<style scoped>
.caption {
  font-style: italic;
}
</style>
