<template>
  <modal :isOpen="isOpen" @close="$emit('close')">
    <template #header>
      <span class="title">{{ title }}</span>
    </template>
    <template #body>
      <div class="item" v-for="(user, i) in users" :key="i">
        <span class="user">
          <router-link
            class="text-black"
            :to="{
              name: 'profile',
              params: { userId: user.id }
            }"
          >
            {{ user.name }}
          </router-link>
        </span>
      </div>
    </template>
  </modal>
</template>
<script lang="ts">
import Vue from "vue"
export default Vue.extend({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    users: {
      type: Array
    }
  },
  watch: {
    "$route.params.userId": {
      handler: function() {
        this.$emit("close")
      },
      deep: true,
      immediate: true
    }
  }
})
</script>
<style scoped>
.user {
  font-size: 17px;
  font-weight: 600;
}
.item {
  border-bottom: 1px solid grey;
  padding: 10px;
}
.title {
  text-transform: capitalize;
}
</style>
