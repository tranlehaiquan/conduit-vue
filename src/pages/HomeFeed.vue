<template>
  <div>
    <template v-if="articles.isLoading">
      <div class="article-preview">
        Loading...
      </div>
    </template>
    <template v-else-if="articles.data.length">
      <article-preview
        v-for="(article, index) in articles.data"
        :key="article.slug + index"
        :article="article"
      >
      </article-preview>
    </template>
    <template v-else>
      <div class="article-preview">
      No articles are here... yet.
    </div>
    </template>
  </div>
</template>
<script>
import ArticlePreview from '@/components/ArticlePreview.vue'
import {FETCH_FEED_ARTICLES} from '@/store/actions.type'
export default {
  components: {
    ArticlePreview
  },
  created () {
    this.$store.dispatch(FETCH_FEED_ARTICLES)
  },
  computed: {
    articles () {
      return this.$store.state.home.articles
    }
  }
}
</script>
