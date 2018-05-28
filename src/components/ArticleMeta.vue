<template>
  <div class="article-meta" v-if="article">
    <a href="">
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt}}</span>
    </div>
    <template>
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow {{article.author.username}} <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button :class="article.favorited && 'active'" class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">{{article.favoritesCount}}</span>
      </button>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
