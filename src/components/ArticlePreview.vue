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
        <the-button
          @click="toggleFavorite"
          :class="isFavoritedClass"
          :loading="favoriteLoading"
          class="btn-outline-primary btn-sm pull-xs-right"
          :icon="'ion-heart'"
        >
          {{article.favoritesCount}}
        </the-button>
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
      <the-place-holder :isArticlePreview="true"></the-place-holder>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { FAVORITE_ARTICLE, UNFAVORITE_ARTICLE } from '@/store/actions.type'
import ThePlaceHolder from '@/components/ThePlaceHolder'
import TheButton from '@/components/TheButton'
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
  data () {
    return {
      favoriteLoading: false
    }
  },
  components: {
    ThePlaceHolder,
    TheButton
  },
  computed: {
    isFavoritedClass () {
      return this.article.favorited ? 'active' : ''
    }
  },
  methods: {
    async toggleFavorite () {
      if (!this.$store.state.authentication.isLogin) {
        this.$router.push({ name: 'SignIn' })
        return
      }
      this.favoriteLoading = true

      if (!this.article.favorited) await this.favorite(this.article.slug)
      else {
        await this.unfavorite(this.article.slug)
      }

      this.favoriteLoading = false
    },
    ...mapActions({
      favorite: FAVORITE_ARTICLE,
      unfavorite: UNFAVORITE_ARTICLE
    })
  }
}
</script>
