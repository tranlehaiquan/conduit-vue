<template>
  <div class="article-meta">
    <a href="">
      <img :src="author.image" />
    </a>
    <div class="info">
      <a href="" class="author">{{author.username}}</a>
      <span class="date">{{createdAt}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{author.username}} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button :class="favorited && 'active'" class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">{{favoritesCount}}</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    author: {
      type: Object,
      default: function () {
        return {
          username: '',
          image: ''
        }
      }
    },
    favorited: {
      type: Boolean,
      default: false
    },
    favoritesCount: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: String,
      default: ''
    }
  }
}
</script>
