<template>
  <div>
    <div class="cs1-width">
      <h1 class="cs1-heading pb-3 text-center mt-5" v-if="!artworks.length">
        <span class="bb1 pb-2">No item to show </span>
      </h1>
      <ArtworkItem
        v-for="artwork in artworks"
        :key="artwork.id"
        :artwork="artwork"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import ArtworkItem from "@/components/artwork/items/Item1.vue"
import Artwork from "@/models/Artwork"
export default Vue.extend({
  name: "Home",
  components: {
    ArtworkItem
  },

  data() {
    return {
      artworks: [] as Artwork[]
    }
  },
  methods: {
    getData() {
      this.$api.get(`/home`).then(response => {
        this.artworks = response.data.data
      })
    }
  },
  mounted() {
    this.getData()
  }
})
</script>
