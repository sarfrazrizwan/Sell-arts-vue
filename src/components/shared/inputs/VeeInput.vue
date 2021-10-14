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
    <input
      :id="name"
      :class="className"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-model="modelValue"
      :disabled="disabled"
    />
    <span class="vee_error_label">{{ errors.join(". ") }}</span>
  </ValidationProvider>
</template>
<script lang="ts">
import { ValidationProvider } from "vee-validate/dist/vee-validate.full"
import Vue from "vue"
export default Vue.extend({
  components: { ValidationProvider },
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
    modelValue: "" as any
  }),
  watch: {
    value(val) {
      this.modelValue = val
      this.$emit("input", val)
    },
    modelValue(val) {
      this.$emit("input", val)
    }
  },
  mounted() {
    if (this.value) {
      this.modelValue = this.value
    }
  }
})
</script>
