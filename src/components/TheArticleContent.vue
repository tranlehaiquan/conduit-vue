<template>
  <div class="row article-content">
    <div v-if="!isLoading" class="col-md-12" v-html="content">
    </div>
    <div v-else class="col-md-12">
      <the-place-holder></the-place-holder>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import ThePlaceHolder from '@/components/ThePlaceHolder'
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    ThePlaceHolder
  },
  computed: {
    contentHTML () {
      return marked(this.content)
    }
  }
}
</script>
