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
    <router-link :to="{path: '/articles/'+ article.slug}" class="preview-link">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {FAVORITE_ARTICLE, UNFAVORITE_ARTICLE} from '@/store/actions.type'
export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({

    }),
    isLogin () {
      return this.$store.getters.isLogin
    },
    isFavoritedClass () {
      return this.article.favorited ? 'active' : ''
    }
  },
  methods: {
    toggleFavorite () {
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
