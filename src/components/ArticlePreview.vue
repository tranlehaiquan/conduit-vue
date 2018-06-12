<template>
  <div class="article-preview">
    <template v-if="!showPlaceholder">
      <div class="article-meta">
        <router-link :to="{name: 'ProfileArticles', params: {username: article.author.username}}">
          <img :src="article.author.image" />
        </router-link>
        <div class="info">
          <router-link :to="{name: 'ProfileArticles', params: {username: article.author.username}}" class="author">{{article.author.username}}</router-link>
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
    </template>
    <template v-else>
      <div class="loading">
        <div class="loading__avatar"></div>
        <div class="loading__metas">
          <div class="loading__meta"></div>
          <div class="loading__meta"></div>
        </div>
        <div class='loading__text'></div>
        <div class='loading__text'></div>
        <div class='loading__text'></div>
        <div class='loading__text'></div>
      </div>
    </template>
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
    },
    showPlaceholder: {
      type: Boolean,
      default: true
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

<style>
.loading {
  position: relative;
}
.loading__text {
  height: 10px;
  margin: 10px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
}
.loading__text:nth-of-type(1) {
  width: 85%;
}
.loading__text:nth-of-type(5) {
  width: 85%;
}
.loading__text:nth-of-type(9) {
  width: 85%;
}
.loading__text:nth-of-type(2) {
  width: 80%;
}
.loading__text:nth-of-type(6) {
  width: 80%;
}
.loading__text:nth-of-type(10) {
  width: 80%;
}
.loading__text:nth-of-type(3) {
  width: 75%;
}
.loading__text:nth-of-type(7) {
  width: 75%;
}
.loading__text:nth-of-type(4) {
  width: 65%;
}
.loading__text:nth-of-type(8) {
  width: 65%;
}
.loading__avatar {
  height: 50px;
  width: 50px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
  margin: 10px;
}
.loading__meta {
  height: 10px;
  margin: 10px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
}
.loading__meta:nth-of-type(1) {
  width: 50px;
}
.loading__meta:nth-of-type(2) {
  width: 70px;
}
.loading__metas {
  position: absolute;
  top: 0;
  left: 60px;
}
</style>
