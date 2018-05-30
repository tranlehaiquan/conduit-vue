<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="comment-author-img" />
      </a>
      &nbsp;
      <router-link :to="{name: 'ProfileArticles', params: {username: comment.author.username}}">{{comment.author.username}}</router-link>
      <span class="date-posted">{{comment.createdAt}}</span>
      <span v-if="isCurrentUser" class="mod-options" @click="removeComment">
        <i class="ion-trash-a"></i>
      </span>
    </div>
  </div>
</template>

<script>
import {REMOVE_COMMENT} from '@/store/actions.type'
export default {
  props: {
    slug: {
      type: String,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.authentication.user
    },
    isCurrentUser () {
      return this.comment.author.username === this.currentUser.username
    }
  },
  methods: {
    removeComment () {
      const {slug, comment} = this
      this.$store.dispatch(REMOVE_COMMENT, {
        slug,
        id: comment.id
      })
    }
  }
}
</script>
