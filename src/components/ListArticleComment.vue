<template>
  <div class="cards" v-if="comments.data.length">
    <the-comment v-for="comment in comments.data" :key="comment.id" :slug="slug" class="card" :comment="comment">
    </the-comment>
  </div>
</template>
<script>
import TheComment from '@/components/TheComment'
export default {
  components: {
    TheComment
  },
  props: {
    comments: {
      type: Object,
      default: function () {
        return {}
      }
    },
    slug: {
      type: String,
      default: ''
    }
  }
}
</script>
