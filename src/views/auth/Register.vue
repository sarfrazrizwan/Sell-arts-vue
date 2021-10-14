<template>
  <section class="auth-section">
    <div class="bg1 fh">
      <div class="auth-signup">
        <div class="auth-container">
          <div class="row">
            <div class="col-md-7">
              <div>
                <h1><img src="@/assets/logo.jpg" width="150" /></h1>
              </div>
              <p class="caption row col-md-8">
                If you plan on selling here on Llovas make sure your email is
                associated with your PayPal account
              </p>
            </div>

            <div class="col-md-5">
              <div class="mt-5 pt-4 mt-md-0 pt-md-0">
                <h2>Sign up</h2>
              </div>
              <div class="have-account mt-3">
                <span class="text">Already have an account?</span>
                <router-link class="link" :to="{ name: 'login' }">
                  Sign in
                </router-link>
              </div>
              <div class="text-bold text-green mt-3" v-if="responseMessage">
                <span>{{ responseMessage }}</span>
              </div>
              <div class="mt-5 pt-2">
                <validation-observer ref="form" v-slot="{ invalid }">
                  <form @submit.prevent="register">
                    <div class="form-group position-relative">
                      <VeeInput
                        id="first_name"
                        name="first_name"
                        rules="required"
                        v-model="user.first_name"
                        placeholder="First Name"
                      >
                        <template #label>
                          <label for="first_name" class="form-icon"
                            ><img src="@/assets/images/users.svg"
                          /></label>
                        </template>
                      </VeeInput>
                    </div>
                    <div class="form-group position-relative">
                      <VeeInput
                        id="last_name"
                        name="last_name"
                        rules="required"
                        v-model="user.last_name"
                        placeholder="Last Name"
                      >
                        <template #label>
                          <label for="last_name" class="form-icon"
                            ><img src="@/assets/images/users.svg"
                          /></label>
                        </template>
                      </VeeInput>
                    </div>
                    <div class="form-group position-relative">
                      <VeeInput
                        id="username"
                        name="username"
                        :rules="`required`"
                        v-model="user.username"
                        placeholder="Username"
                      >
                        <template #label>
                          <label for="username" class="form-icon"
                            ><img src="@/assets/images/users.svg"
                          /></label>
                        </template>
                      </VeeInput>
                    </div>
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

                    <div class="d-flex py-3">
                      <label class="checkbox-data">
                        <input type="checkbox" class="checkbox-input" id="" />
                        <span class="checkmark1"></span>
                      </label>
                      <span class="checkbox_text"
                        >I have read and understood
                        <a href="#" class="text-dark text-underline"
                          >Terms &amp; Conditions</a
                        >, and
                        <a href="#" class="text-dark text-underline"
                          >Privacy Policy
                        </a></span
                      >
                    </div>
                    <div class="form-group mb-0">
                      <button
                        :disabled="invalid"
                        class="btn btn-login w-100 text-center"
                        type="submit"
                      >
                        {{ sending ? "Sending..." : "Register" }}
                      </button>
                    </div>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
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
    },
    sending: false,
    responseMessage: ""
  }),
  methods: {
    ...mapMutations("auth", ["login"]),
    register() {
      this.sending = true
      this.$api
        .post("/register", this.user)
        .then(response => {
          this.responseMessage = response.data.message
        })
        .catch(error =>
          this.validationErrors(this.$refs.form, error.response.data.errors)
        )
        .finally(() => {
          this.sending = false
        })
    },
    validationErrors(form: any, errors: any) {
      form.setErrors(errors)
    }
  }
})
</script>
<style scoped>
.text-green {
  color: green;
}
.auth-signup .caption {
  position: absolute;
  left: 0;
  top: 62%;
  transform: translateY(-50%);
  font-size: 12px;
}
</style>
