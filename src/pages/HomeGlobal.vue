<template>
  <div>
    <article-preview
      v-for="(article, index) in articles"
      :key="article.slug + index"
      :article="article"
    >
    </article-preview>
  </div>
</template>
<script>
import ArticlePreview from '@/components/ArticlePreview.vue'
import {FETCH_ARTICLES} from '@/store/actions.type'
export default {
  components: {
    ArticlePreview
  },
  created () {
    this.$store.dispatch(FETCH_ARTICLES)
  },
  computed: {
    articles () {
      return this.$store.state.home.articles
    }
  }
}
</script>
