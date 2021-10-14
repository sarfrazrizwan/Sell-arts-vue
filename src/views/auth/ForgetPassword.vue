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
          <h2>Forget Password</h2>
        </div>

        <div class="form-wrap mt-5 pt-4">
          <validation-observer ref="myForm" v-slot="{ invalid }">
            <form>
              <div class="form-group position-relative">
                <VeeInput
                  id="email"
                  name="email"
                  rules="required"
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                >
                  <template #label>
                    <label for="email" class="form-icon"
                      ><img src="@/assets/images/mail.svg"
                    /></label>
                  </template>
                </VeeInput>
              </div>

              <div class="form-group mb-0">
                <button
                  :disabled="invalid"
                  type="button"
                  class="btn btn-login w-100 text-center"
                  @click="doSubmit()"
                >
                  {{ sending ? "Sending..." : "Submit" }}
                </button>
              </div>
            </form>
          </validation-observer>
          <div class="text-center text-green mt-5 pt-4" v-if="responseMessage">
            <span>{{ responseMessage }}</span>
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
      email: ""
    },
    responseMessage: "",
    sending: false
  }),
  methods: {
    ...mapMutations("auth", ["login"]),
    doSubmit() {
      this.sending = true
      this.$api
        .post("/email/password-reset", this.user)
        .then(response => {
          this.responseMessage = response.data.message
        })
        .catch(error =>
          this.validationErrors(this.$refs.myForm, error.response.data.errors)
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
<style>
.text-green {
  color: green;
}
.caption {
  font-style: italic;
}
</style>
