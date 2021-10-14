<template>
  <div class="mx-width">
    <div class="artworks-wrap">
      <div class="row">
        <CartItems />
        <Checkout />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

import CartItems from "@/components/cart/CartItems.vue"
import Checkout from "@/components/cart/Checkout.vue"
export default Vue.extend({
  components: { CartItems, Checkout }
})
</script>
