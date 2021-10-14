<template>
  <ValidationProvider
    :vid="name"
    :name="label"
    :rules="rules"
    v-slot="{ errors }"
  >
    <slot name="label">
      <label class="form-label1" :for="name">{{ label }}</label>
    </slot>
    <div>
      <DatePicker
        v-model="modelValue"
        type="date"
        @change="onChange"
        value-type="format"
      />
    </div>
    <span class="vee_error_label">{{ errors.join(". ") }}</span>
  </ValidationProvider>
</template>
<script lang="ts">
// @ts-ignore

import DatePicker from "vue2-datepicker"
import "vue2-datepicker/index.css"
import { ValidationProvider } from "vee-validate/dist/vee-validate.full"
import Vue from "vue"
const moment = require("moment")
export default Vue.extend({
  components: { ValidationProvider, DatePicker },
  props: {
    value: {
      required: true
    },
    name: {
      required: false
    },
    rules: {
      type: [String, Object]
    },
    label: String,
    prependIcon: String,
    appendIcon: String,
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    className: {
      type: String,
      default: "form-control form-input1"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    modelValue: "" as any,
    momentFormat: {
      stringify: (value: any) => {
        return value ? moment(value, "LL").format("YYYY-MM-DD") : null
      }
    }
  }),
  watch: {
    value(val) {
      this.modelValue = val
      // this.$emit("input", val)
    },
    modelValue(val) {
      this.$emit("input", val)
    }
  },
  methods: {
    onChange(data: any) {
      this.modelValue = data
    },
    formatDate(date: any) {
      return moment(date, "LL").format("YYYY-MM-DD")
    }
  },
  mounted() {
    if (this.value) {
      this.modelValue = this.value
    }
  }
})
</script>
<style>
.mx-datepicker {
  width: 100%;
}
.mx-input {
  border: 1px solid #ababab;
  border-radius: 10px;
  opacity: 1;
  height: 45px;
  color: #707070;
  opacity: 0.8;
}
</style>
