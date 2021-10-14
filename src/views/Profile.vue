<template>
  <div class="mx-width">
    <div class="profile-form pt-3 mb-5">
      <UserInfo />
    </div>
    <div class="profile-data" v-if="artworks.length">
      <div class="profile-art-list">
        <h1 class="heading2 f-g fw-sb mb-3">Artworks</h1>
        <div class="row">
          <ArtworkItem
            v-for="item in artworks"
            :key="item.id"
            :artwork="item"
          />
        </div>
      </div>
    </div>
    <div class="mt-4" v-if="collection.length">
      <h1 class="heading1 f-g fw-sb mb-3">User's Collection</h1>
      <div class="row">
        <ArtworkItem
          v-for="item in collection"
          :key="item.id"
          :artwork="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ArtworkItem from "@/components/artwork/items/Item2.vue"
import UserInfo from "@/components/profile/UserInfo.vue"
import Artwork from "@/models/Artwork"

import Vue from "vue"
import { mapGetters } from "vuex"
export default Vue.extend({
  name: "Home",
  components: {
    ArtworkItem,
    UserInfo
  },

  data() {
    return {
      artworks: [] as Artwork[],
      collection: [] as Artwork[]
    }
  },
  computed: {
    ...mapGetters({ authUser: "auth/user" })
  },
  methods: {
    getArtworks() {
      const userId = this.$route.params.userId || this.authUser.id
      this.$api
        .get(`/art-works`, {
          params: {
            user_id: userId
          }
        })
        .then(response => {
          this.artworks = response.data.data
        })
    },
    getArtworksCollection() {
      const userId = this.$route.params.userId || this.authUser.id
      this.$api.get(`/user/${userId}/artworks`).then(response => {
        this.collection = response.data.data
      })
    }
  },
  mounted() {
    this.getArtworks()
    this.getArtworksCollection()
  }
})
</script>
<style lang="scss">
.overflow-hidden {
  overflow: hidden;
}
</style>
