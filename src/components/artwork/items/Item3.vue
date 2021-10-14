<template>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="img-sm-card img-card-hover position-relative">
      <div class="content">
        <div class="card_body">
          <router-link
            :to="{ name: 'artwork', params: { slug: 'monaliza-portrait' } }"
          >
            <div class="card_image">
              <img
                src="@/assets/images/rainy-day-painting-poster.png"
                class="img-fluid"
              />
              <div class="img-card-overlay"></div>
            </div>
          </router-link>

          <button class="btn btn-view">
            <img src="@/assets/images/add (1).svg" /> Following
          </button>
          <div class="img-cardtext">
            <h4 class="heading4 font-weight-normal text-white f-g">
              Art Posted By:
            </h4>
            <h4 class="heading4 font-weight-bold text-white f-g">
              UserName Q1
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "ArtworkItem3",
  props: {
    type: {
      type: Number,
      default: 1
    }
  }
})
</script>
