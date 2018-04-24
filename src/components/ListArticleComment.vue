<template>
  <div class="cards" v-if="comments.length">
    <div v-for="comment in comments" :key="comment.id" class="card">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{comment.createdAt}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comments: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
