<template>
  <div class="article-preview">
    <div class="article-meta">
      <a href="profile.html">
        <img :src="article.author.image" />
      </a>
      <div class="info">
        <a href="" class="author">{{article.author.username}}</a>
        <span class="date">{{article.createdAt}}</span>
      </div>
      <button
        :class="isFavorited"
        class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> {{article.favoritesCount}}
      </button>
    </div>
    <a href="" class="preview-link">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isFavorited () {
      return this.article.favorited ? 'active' : ''
    }
  }
}
</script>
