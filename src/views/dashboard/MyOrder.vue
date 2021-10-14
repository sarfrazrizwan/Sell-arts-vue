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
          <li><span>Bought by</span></li>
          <li><span>Status</span></li>
          <li><span>Shipment Id</span></li>
          <li class="last-col"><span> Received</span></li>
        </ul>
      </div>
      <div class="invo-tablel-body">
        <ul class="list-unstyled">
          <li v-for="(item, i) in orders" :key="item.id">
            <div class="first-col">
              <span class="heading d-lg-none d-inline-block">#</span>
              <span class="text">{{ i + 1 }}</span>
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
              <div class="heading d-lg-none d-block">Brought By</div>
              <span class="text">{{ item.order_by.username }}</span>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Status</div>
              <span class="text">{{ item.shipping_status_value }}</span>
            </div>
            <div>
              <div class="heading d-lg-none d-block">Shipment Id</div>
              <span class="text">{{ item.shipment_id }}</span>
            </div>
            <div class="last-col">
              <div class="heading d-lg-none d-block">Received</div>
              <span class="text">
                <input
                  type="checkbox"
                  :checked="item.is_received"
                  :disabled="item.is_received"
                  @input="markAsReceived(item)"
                />
              </span>
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
import Artwork from "../../models/Artwork"
export default Vue.extend({
  name: "MyOrders",
  components: { Navbar },

  data() {
    return {
      orders: [] as any
    }
  },
  methods: {
    getData() {
      this.$api.get(`/my/order-items`).then(response => {
        this.orders = response.data.data
      })
    },
    viewItem(item: Artwork) {
      this.$router.push({
        name: "artwork",
        params: { slug: item.slug }
      })
    },
    markAsReceived(item: any) {
      this.$api.patch(`/order-items/${item.id}/received`).then(() => {
        this.orders = this.orders.map((orderItem: any) => {
          if (item.id === orderItem.id) {
            orderItem.is_received = true
          }
          return orderItem
        })
      })
    }
  },
  mounted() {
    this.getData()
  }
})
</script>
