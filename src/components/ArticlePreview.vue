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
        @click="toggleFavorite"
        :class="isFavoritedClass"
        class="btn btn-outline-primary btn-sm pull-xs-right"
      >
        <i class="ion-heart"></i> {{article.favoritesCount}}
      </button>
    </div>
    <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link clearfix">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">
          {{tag}}
        </li>
      </ul>
    </router-link>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import {FAVORITE_ARTICLE, UNFAVORITE_ARTICLE} from '@/store/actions.type'
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isFavoritedClass () {
      return this.article.favorited ? 'active' : ''
    }
  },
  methods: {
    toggleFavorite () {
      if (!this.$store.state.authentication.isLogin) {
        this.$router.push({name: 'SignIn'})
        return
      }
      if (!this.article.favorited) this.favorite(this.article.slug)
      else this.unfavorite(this.article.slug)
    },
    ...mapActions({
      favorite: FAVORITE_ARTICLE,
      unfavorite: UNFAVORITE_ARTICLE
    })
  }
}
</script>
