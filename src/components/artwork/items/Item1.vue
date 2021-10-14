<template>
  <div class="mt-4">
    <div class="img_card_1">
      <div class="content">
        <router-link
          :to="{ name: 'artwork', params: { slug: artwork.slug } }"
          tag="a"
        >
          <div class="card_body img-sm-card img-card-hover position-relative ">
            <button class="btn btn-sold btn-danger" v-if="artwork.is_sold">
              Sold
            </button>
            <div class="img-card-overlay"></div>
            <div class="card_image">
              <embed
                :src="`${artwork.image_path}#toolbar=0&navpanes=0&scrollbar=0`"
                type="application/pdf"
                class="w-100"
                height="500px"
              />
            </div>
          </div>
        </router-link>
        <div class="username">
          <div class="f-g mb-0">
            <router-link
              class="text-black"
              :to="{
                name: 'profile',
                params: { userId: artwork.artist.id }
              }"
            >
              {{ artwork.artist.username }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Artwork from "@/models/Artwork"
import user from "@/services/user"
export default Vue.extend({
  name: "ArtworkItem",
  props: {
    artwork: {
      type: Object as () => Artwork,
      required: true
    }
  },
  methods: {
    follow(isFollowing: boolean, userId: string) {
      this.artwork.is_following = !isFollowing
      if (isFollowing) {
        user.unfollow(userId)
      } else {
        user.follow(userId)
      }
    }
  }
})
</script>
<style scoped>
.username {
  padding-left: 15px;
  padding-top: 6px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
}
.img_card_1 {
  background-color: #f4f3ef;
  border-radius: 20px;
  position: relative;
}
</style>
