<template>
  <div class="mx-width">
    <div class="row">
      <div class="col-md-6">
        <div class="artwork-image">
          <embed
            v-if="artwork.image_path"
            :src="`${artwork.image_path}#toolbar=0&navpanes=0&scrollbar=0`"
            type="application/pdf"
            class="w-100"
            height="500px"
          />
          <!-- <img :src="artwork.image_path" class="img-fluid br-10 w-100" /> -->
        </div>
      </div>
      <div class="col-md-6 pt-4">
        <div class="mb-4">
          <h1 class="mb-0 cs1-heading f-g font-weight-bold">
            {{ artwork.name }}
          </h1>
          <h3 class="mb-0 heading4 f-g font-weight-normal">
            By:<span class="text-underline">
              <router-link
                class="text-black"
                :to="{
                  name: 'profile',
                  params: { userId: artwork.artist.id }
                }"
              >
                {{ artwork.artist.username }}
              </router-link>
            </span>
          </h3>
        </div>
        <div class=" mb-4">
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            Created Date
          </h1>
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            {{ artwork.created_date }}
          </h1>
        </div>
        <div class="mb-4">
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            Dimensions:
          </h1>
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            {{ `${artwork.width}x${artwork.height} In` }}
          </h1>
        </div>
        <div class="mb-4">
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            Material Used:
          </h1>
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            {{ artwork.material }}
          </h1>
        </div>
        <div class="mb-4">
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            Description:
          </h1>
          <h1 class="mb-0 cs2-heading f-g font-weight-normal text-color3">
            {{ artwork.description }}
          </h1>
        </div>
        <div class="mb-4">
          <div class="d-flex">
            <div class="mb-0 cs2-heading f-g font-weight-normal text-color3">
              Fixed Price:
            </div>
            <div class="mb-0 cs2-heading f-g font-weight-bold ml-3">
              {{ `$${artwork.price}` }}
            </div>
          </div>
        </div>
        <div class="mb-4">
          <div class="d-flex flex-column" v-if="!isSameUser">
            <button
              class="btn btn-login btn-follow  heading3  mb-4"
              @click="follow(artwork.is_following, artwork.artist.id)"
            >
              {{ artwork.is_following ? "Following" : "Follow" }}
            </button>

            <button
              v-if="artwork.is_sold"
              class="btn btn-login btn-follow  heading3  mb-4 btn-danger"
            >
              SOLD
            </button>
            <button
              v-else
              class="btn btn-cart btn-follow heading3 mb-4"
              @click="addToCart(artwork)"
            >
              Add to cart
            </button>
          </div>
          <div class="d-flex flex-column" v-else>
            <button
              class="btn btn-login btn-follow  heading3  mb-4"
              @click="editItem(artwork)"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="heading1 f-g fw-sb mb-3">More from Username</h1>
      <div class="row">
        <ArtworkItem
          v-for="item in artwork.more_work ? artwork.more_work.data : []"
          :key="item.id"
          :artwork="item"
        />
      </div>
      <div class="mt-3 text-center">
        <router-link
          class="btn btn-vmore"
          :to="{
            name: 'profile',
            params: { userId: artwork.artist.id }
          }"
        >
          View More
        </router-link>
      </div>
    </div>
    <div class="mt-4">
      <h1 class="heading1 f-g fw-sb mb-4">
        <span class="bb1 d-inline-block pb-2">Featured Artwo</span>rks
      </h1>
      <div class="row justify-content-between">
        <ArtworkItem3 v-for="item in 3" :key="item" />
      </div>
      <div class="mt-3 text-center">
        <button class="btn btn-vmore">View More</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import ArtworkItem from "@/components/artwork/items/Item2.vue"
import ArtworkItem3 from "@/components/artwork/items/Item3.vue"
import Artwork from "@/models/Artwork"
import user from "@/services/user"
import { addItem } from "@/helpers/cart"
import { mapGetters } from "vuex"
export default Vue.extend({
  components: { ArtworkItem, ArtworkItem3 },
  data() {
    return {
      artwork: new Artwork()
    }
  },
  methods: {
    getData(slug: string) {
      this.$api.get(`/art-works/${slug}`).then(response => {
        this.artwork = response.data.data
      })
    },
    follow(isFollowing: boolean, userId: string) {
      this.artwork.is_following = !isFollowing
      if (isFollowing) {
        user.unfollow(userId)
      } else {
        user.follow(userId)
      }
    },
    addToCart(item: Artwork) {
      addItem(item)
    },
    editItem(item: Artwork) {
      this.$router.push({
        name: "sell",
        query: { id: item.slug, isEdit: "true" }
      })
    }
  },
  watch: {
    "$route.params.slug": {
      handler: function(slug) {
        this.getData(slug)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters({ authUser: "auth/user" }),
    isSameUser(): boolean {
      return this.authUser.id === this.artwork.artist.id
    }
  },
  mounted() {
    // const slug = this.$route.params.slug
    // this.getData(slug)
  }
})
</script>
