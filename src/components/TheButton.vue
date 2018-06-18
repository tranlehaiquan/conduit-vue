<template>
  <button
    class="btn"
    @click="handleClick"
    :disabled="disable || loading"
    :type="nativeType"
  >
    <template v-if="loading">
      <i v-if="loading" class="ion-refresh icon-loading"></i>
    </template>
    <template v-if="icon && !loading">
      <i :class="icon"></i>
    </template>
    <slot></slot>
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
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: ''
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
