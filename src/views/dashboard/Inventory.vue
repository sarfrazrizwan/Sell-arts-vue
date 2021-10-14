<template>
  <div class="mx-width">
    <div>
      <h3 class="heading3 f-g fw-sb mb-3">Dashboard</h3>
    </div>
    <Navbar />
    <div class="invorder-table">
      <div class="invo-tablel-head">
        <ul class="list-unstyled">
          <li class="first-col"><span>#</span></li>
          <li><span>Artwork</span></li>
          <li><span>Artist Name</span></li>
          <li><span>Price</span></li>
          <li><span>Created date</span></li>
          <li><span>Dimensions</span></li>
          <li><span></span></li>
        </ul>
      </div>
      <div class="invo-tablel-body">
        <ul class="list-unstyled">
          <li v-for="(item, i) in artworks" :key="item.id">
            <div class="first-col">
              <span class="heading d-lg-none d-inline-block">#</span>
              <span class="text">{{ ++i }}</span>
            </div>
            <div>
              <div class="d-flex">
                <button class="btn btn-edit p-0" @click="viewItem(item)">
                  <span>{{ item.name.substr(0, 10) }}</span>
                </button>
              </div>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Artist Name</div>
              <span class="text">{{ item.artist.name }}</span>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Price</div>
              <span class="text">${{ item.price }}</span>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Created Date</div>
              <span class="text">{{ item.created_date }}</span>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Dimensions</div>
              <span class="text">{{ item.dimensions }}</span>
            </div>
            <div>
              <div class="d-flex">
                <button class="btn btn-edit p-0" @click="editItem(item)">
                  <img class="ml-1" src="@/assets/images/pencil_edit.svg" />
                  <span>edit</span>
                </button>
                <button
                  class="btn btn-delete p-0 ml-1"
                  @click="deleteConfirm(item.id)"
                >
                  <img class="mr-1" src="@/assets/images/trash.svg" />
                  <span>delete</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
import Navbar from "./Navbar.vue"
import { mapGetters } from "vuex"
import Artwork from "../../models/Artwork"
export default Vue.extend({
  name: "Home",
  components: { Navbar },

  data() {
    return {
      artworks: []
    }
  },
  computed: {
    ...mapGetters({ authuser: "auth/user" })
  },
  methods: {
    getData() {
      this.$api.get(`/inventory`).then(response => {
        this.artworks = response.data.data
      })
    },
    deleteItem(id: string) {
      this.$api.delete(`/art-works/${id}`).then(() => {
        this.artworks = this.artworks.filter((item: Artwork) => item.id != id)
      })
    },
    deleteConfirm(id: string) {
      Vue.prototype.$confirm({
        message: `Are you sure to delete this artwork?`,
        button: {
          no: "No",
          yes: "Yes"
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm: boolean) => {
          if (confirm) {
            this.deleteItem(id)
          }
        }
      })
    },
    editItem(item: Artwork) {
      this.$router.push({
        name: "sell",
        query: { id: item.id, isEdit: "true" }
      })
    },
    viewItem(item: Artwork) {
      this.$router.push({
        name: "artwork",
        params: { slug: item.slug }
      })
    }
  },

  mounted() {
    this.getData()
  }
})
</script>
