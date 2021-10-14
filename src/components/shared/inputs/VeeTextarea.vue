<template>
  <ValidationProvider
    :vid="name"
    :name="name"
    :rules="rules"
    v-slot="{ errors }"
  >
    <slot name="label">
      <label class="form-label1" :for="name">{{ label }}</label>
    </slot>

    <textarea
      :name="name"
      :placeholder="placeholder"
      :id="name"
      cols="30"
      :rows="rows"
      :class="className"
      v-model="modelValue"
      :disabled="disabled"
    ></textarea>
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
    rows: {
      type: Number,
      default: 3
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
