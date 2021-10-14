<template>
  <div>
    <div class="d-flex align-items-center">
      <div class="img-sm">
        <embed
          :src="`${artwork.image_path}#toolbar=0&navpanes=0&scrollbar=0`"
          type="application/pdf"
          class="w-100"
        />
        <!-- <img :src="artwork.image_path" /> -->
      </div>
      <div class="pl-3">
        <div class="mb-1">
          <h1 class="mb-0 cs2-heading f-g font-weight-bold">
            {{ artwork.name }}
          </h1>
        </div>
        <div class="mb-1">
          <div class="d-flex flex-wrap">
            <div class="mb-0 cs2-heading f-g font-weight-normal text-color3">
              Created Date:
            </div>
            <div
              class="mb-0 cs2-heading f-g font-weight-normal text-color3 ml-1"
            >
              {{ artwork.created_date }}
            </div>
          </div>
        </div>
        <div class="mb-1">
          <h3 class="mb-0 heading4 f-g font-weight-normal">
            From:<span class="text-underline">
              {{ artwork.artist.username }}</span
            >
          </h3>
        </div>
        <div class="mb-1">
          <h3 class="mb-0 heading4 f-g font-weight-normal">
            Price: {{ `$${artwork.price}` }}
          </h3>
        </div>
      </div>
    </div>
    <button class="btn btn-close" @click="removeFromCart(artwork)">
      <img src="@/assets/images/close.svg" />
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Artwork from "@/models/Artwork"
import { removeItem } from "@/helpers/cart"
export default Vue.extend({
  name: "CartItem",
  props: {
    artwork: {
      type: Object as () => Artwork,
      required: true
    }
  },
  methods: {
    removeFromCart(item: Artwork) {
      removeItem(item.id)
    }
  }
})
</script>
