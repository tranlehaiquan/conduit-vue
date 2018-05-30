<template>
  <ul class="error-messages" v-if="errors">
    <li v-for="(val, key) in errors" :key="key">{{key + val}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      return: function () {
        return {}
      }
    }
  }
}
</script>
