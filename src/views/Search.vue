<template>
  <div class="mx-width">
    <div class="search-data">
      <div class="search-art-list pt-4">
        <div class="serach-bar serach-input mb-4">
          <input
            type="text"
            class="form-control form-search-input"
            placeholder="Search Artwork or User"
            v-model="searchQuery"
            @input="getData"
          />
        </div>
        <h1 class="heading1 f-g fw-sb mb-3">
          {{ searchQuery ? `${artworks.length} results found` : " " }}
        </h1>
        <div class="row">
          <ArtworkItem
            v-for="item in artworks"
            :key="item.id"
            :artwork="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import ArtworkItem from "@/components/artwork/items/Item2.vue"
import Artwork from "@/models/Artwork"
export default Vue.extend({
  name: "Home",
  components: {
    ArtworkItem
  },

  data() {
    return {
      searchQuery: "" as string,
      artworks: [] as Artwork[]
    }
  },
  methods: {
    getData() {
      this.$api
        .get(`/art-works`, {
          params: {
            query: this.searchQuery
          }
        })
        .then(response => {
          this.artworks = response.data.data
        })
    }
  },
  mounted() {
    this.getData()
  }
})
</script>
