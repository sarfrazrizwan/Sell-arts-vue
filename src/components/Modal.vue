<template>
  <div class="modal" :class="{ active: isOpen }" @click.stop="$emit('close')">
    <div class="modal__content" @click.stop>
      <div class="modal__header">
        <slot name="header" />
        <div class="close__icon" @click.stop="$emit('close')">X</div>
      </div>
      <div class="modal__body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "modal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  padding: 15px;
  z-index: 102;
  overflow-y: auto;

  &.active {
    display: flex;
  }

  .modal__content {
    max-width: 600px;
    width: 100%;
    background-color: #fff;
  }

  &__header {
    background-color: #ebebeb;

    color: #000000;
    padding: 20px 0;
    text-align: center;
    position: relative;

    .close__icon {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      font-weight: 600;
    }
  }

  &__body {
    background-color: #fff;
    max-width: 510px;
    margin: 0 auto 20px;
    padding: 15px;
  }
}
</style>
