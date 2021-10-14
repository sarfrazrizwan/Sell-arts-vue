<template>
  <select
    :name="`status-${id}`"
    class="form-control form-input3"
    v-model="modelValue"
    @change="onStatusChange"
    :disabled="modelValue == 3"
  >
    <option :value="1" :selected="value == 1">Pending</option>
    <option :value="2" :selected="value == 2">In Progress</option>
    <option :value="3" :selected="value == 3">Shipped</option>
  </select>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      modelValue: 1
    }
  },
  methods: {
    onStatusChange() {
      let shppmentId: string | null = null
      if (this.modelValue == 3) {
        shppmentId = prompt("Please enter shipment number")
      }
      if (this.modelValue == 3 && !shppmentId) return
      const data = {
        shipping_status: this.modelValue,
        shipment_id: shppmentId
      }
      this.$api.patch(`/order-items/${this.id}/update-status`, data)
    }
  },
  watch: {
    value(val: number) {
      this.modelValue = val
    }
  },
  mounted() {
    if (this.value) this.modelValue = this.value
  }
})
</script>
