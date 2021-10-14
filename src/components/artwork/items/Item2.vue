<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <router-link :to="{ name: 'artwork', params: { slug: artwork.slug } }">
      <div class="img-sm-card img-card-hover position-relative">
        <div class="img-card-overlay"></div>
        <div class="content">
          <div class="card_body">
            <div class="card_image">
              <embed
                :src="`${artwork.image_path}#toolbar=0&navpanes=0&scrollbar=0`"
                type="application/pdf"
                class="w-100"
                height="500px"
              />
              <!-- <img :src="artwork.image_path" class="img-fluid" /> -->
            </div>
            <button class="btn btn-sold btn-danger " v-if="artwork.is_sold">
              Sold
            </button>
            <button class="btn btn-view">
              View
            </button>

            <div class="img-cardtext">
              <h4 class="heading4 font-weight-normal text-white f-g">
                Art Posted By:
              </h4>
              <h4 class="heading4 font-weight-bold text-white f-g">
                {{ artwork.artist.name }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Artwork from "@/models/Artwork"
export default Vue.extend({
  name: "ArtworkItem",
  props: {
    artwork: {
      type: Object as () => Artwork,
      required: true
    }
  }
})
</script>
<style>
#zoom-buttons {
  display: none;
}
</style>
