<template>
  <div class="col-lg-5 right">
    <div class="pt-5 px-4">
      <div class="checkout-wrap mb-3">
        <h1 class="heading4 f-g font-weight-bold pb-2 bb2">Checkout</h1>
      </div>
      <div class="pb-2 bb2 mb-3">
        <div class="d-flex justify-content-between">
          <div class="heading4 f-g font-weight-normal">Cost:</div>
          <div class="checkout-cost">
            <div
              class="heading4 f-g font-weight-bold "
              v-for="item in cartItems"
              :key="item.id"
            >
              {{ `$${item.price}` }}
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="heading4 f-g font-weight-normal">Shipping:</div>
          <div class="checkout-cost">
            <div class="heading4 f-g font-weight-bold ">$0</div>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="heading5 f-g font-weight-normal">Tax:</div>
          <div class="checkout-cost">
            <div class="heading5 f-g font-weight-bold ">$0</div>
          </div>
        </div>
      </div>
      <div class="pb-2 bb2 mb-4">
        <div class="d-flex justify-content-between">
          <div class="heading4 f-g font-weight-normal">Total:</div>
          <div class="checkout-cost">
            <div class="heading4 f-g font-weight-bold ">
              ${{ roundOffPrice }}
            </div>
          </div>
        </div>
      </div>
      <div class="pb-2 mb-4">
        <VeeInput
          name="address"
          rules="required"
          v-model="order.address"
          placeholder="Address"
          class-name="form-control form-input3"
        />
      </div>
      <paypal-button
        v-if="cartItems.length && order.address"
        :amount="totalAmount"
        currency="USD"
        @onApprove="paymentCompleted"
        disabled
      />
      <router-link
        class="btn btn-login btn-follow  heading3  mb-4 w-100"
        :to="{ name: 'login' }"
        v-if="!isLoggedIn"
      >
        Login
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Artwork from "@/models/Artwork"
import PaypalButton from "@/components/shared/PaypalButton.vue"
import { flush } from "@/helpers/cart"
import { mapGetters } from "vuex"
export default Vue.extend({
  name: "Checkout",
  components: { PaypalButton },
  data: () => ({
    order: {
      address: ""
    }
  }),
  computed: {
    ...mapGetters({
      cartItems: "app/cartItems",
      isLoggedIn: "auth/isLoggedIn"
    }),
    itemsIds() {
      return this.cartItems.map((item: Artwork) => item.id)
    },

    totalAmount(): number {
      if (this.cartItems.length) {
        return this.cartItems
          .map((item: Artwork) => item.price)
          .reduce((prev: number, curr: number) => +prev + +curr)
      } else {
        return 0
      }
    },
    roundOffPrice() {
      return Number(this.totalAmount).toFixed(2)
    }
  },
  methods: {
    paymentCompleted(payLoad: any) {
      const data = {
        payload: payLoad,
        reference_id: payLoad.purchase_units[0].payments.captures[0].id,
        items: this.itemsIds,
        details: this.order
      }
      this.$api.post(`/order`, data).then(() => {
        flush()
        this.$router.push({ name: "home" })
      })
    }
  }
})
</script>
<style scoped>
.heading1 {
  text-align: right;
}
</style>
