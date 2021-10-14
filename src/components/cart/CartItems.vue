<template>
  <div class="col-lg-7 left">
    <div class="mb-4">
      <h1 class="f-g heading3 font-weight-bold">Shopping cart</h1>
    </div>
    <div class="artworks-list">
      <ul class="list-unstyled">
        <li v-for="item in cartItems" :key="item.id">
          <CartItem :artwork="item" />
        </li>
      </ul>
    </div>
    <h5 v-if="!cartItems.length">No Item in cart</h5>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import CartItem from "@/components/artwork/items/CartItem.vue"
export default Vue.extend({
  components: { CartItem },
  computed: {
    ...mapGetters({ cartItems: "app/cartItems" })
  }
})
</script>
