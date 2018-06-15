<template>
  <button
    class="btn"
    @click="handleClick"
    :disabled="disable || loading"
  >
    <template v-if="loading">
      <i class="ion-refresh icon-loading"></i>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>
  .icon-loading {
    animation: 1.2s 0s spinAround ease-out both infinite;
    display: inline-block
  }
</style>
