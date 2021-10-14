<template>
  <div
    class="d-flex flex-md-row flex-column  justify-content-md-between align-items-md-center mb-3"
  >
    <ul class="list-unstyled inventory-tabs mb-0">
      <li>
        <router-link active-class="active" :to="{ name: 'orders' }">
          Orders
        </router-link>
      </li>
      <li>
        <router-link active-class="active" :to="{ name: 'inventory' }">
          Inventory
        </router-link>
      </li>
      <li>
        <router-link active-class="active" :to="{ name: 'my-orders' }">
          My Orders
        </router-link>
      </li>
    </ul>
    <div class="filter-lists d-flex">
      <div class="mr-1 sortby-text">Sort by:</div>
      <ul class="list-unstyled mb-0 sort-list">
        <li>
          <span>Recent</span>
          <img src="@/assets/images/menus.svg" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  name: "DasboardNavbar"
})
</script>
