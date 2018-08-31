<template>
  <form @submit.prevent="addComment">
    <div class="card comment-form">
      <div class="card-block">
        <textarea v-model="comment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img" />
        <span>{{user.username}}</span>
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { ADD_COMMENT } from '@/store/actions.type'
export default {
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    addComment () {
      const { slug, comment } = this
      this.$store.dispatch(ADD_COMMENT, {
        slug,
        comment
      })
      this.comment = ''
    }
  },
  computed: {
    user () {
      return this.$store.state.authentication.user
    }
  }
}
</script>
