<template>
  <div class="article-meta" v-if="article">
    <a href="">
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt}}</span>
    </div>

    <template v-if="!isAuthor">
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
    <template v-else>
      <span>
        <router-link :to="{name: 'EditorArticle', params: {slug: article.slug}}"
          class="btn btn-sm btn-outline-secondary"
          style="margin-right: 10px">
          <i class="ion-edit"></i> Edit Article
        </router-link>
        <button @click="deleteArticle" class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
  </div>
</template>
<script>
import {DELETE_ARTICLE} from '@/store/actions.type'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAuthor () {
      return this.$store.state.authentication.user.username === this.article.author.username
    }
  },
  methods: {
    deleteArticle () {
      this.$store.dispatch(DELETE_ARTICLE, this.article.slug)
        .then(() => {
          this.$router.push({name: 'Home'})
        })
    }
  }
}
</script>
