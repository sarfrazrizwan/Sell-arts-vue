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
          <h2>Reset Password</h2>
        </div>

        <div class="form-wrap mt-5 pt-4">
          <validation-observer ref="myForm" v-slot="{ invalid }">
            <form>
              <div class="form-group position-relative">
                <VeeInput
                  id="password"
                  name="password"
                  rules="required|min:8"
                  type="password"
                  placeholder="Password"
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
              <div class="form-group position-relative">
                <VeeInput
                  id="password_confirmation"
                  name="password_confirmation"
                  rules="required|min:8"
                  type="password"
                  v-model="user.password_confirmation"
                  placeholder="Confirm Password"
                >
                  <template #label>
                    <label for="password_confirmation" class="form-icon"
                      ><img src="@/assets/images/password.svg"
                    /></label>
                    <span class="form-picon"
                      ><img src="@/assets/images/eye.svg"
                    /></span>
                  </template>
                </VeeInput>
              </div>
              <div class="form-group mb-0">
                <button
                  :disabled="invalid"
                  type="button"
                  class="btn btn-login w-100 text-center"
                  @click="doLogin()"
                >
                  Submit
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

import { ValidationObserver } from "vee-validate"
// import User from "@/models/User"
export default Vue.extend({
  components: { ValidationObserver },
  data: () => ({
    user: {
      password_confirmation: "",
      password: ""
    }
  }),
  methods: {
    doLogin() {
      this.$api
        .post("/password/reset", {
          ...this.user,
          email: this.$route.query.email,
          token: this.$route.query.token
        })
        .then(() => {
          this.$router.push({ name: "login" })
        })
        .catch(error =>
          this.validationErrors(this.$refs.myForm, error.response.data.errors)
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
