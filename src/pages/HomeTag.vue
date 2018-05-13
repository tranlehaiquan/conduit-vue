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
import {FETCH_ARTICLES} from '@/store/actions.type'
import { mapState } from 'vuex'
export default {
  components: {
    ArticlePreview
  },
  created () {
    this.$store.dispatch(FETCH_ARTICLES, {
      tag: this.$route.params.tag
    })
  },
  watch: {
    '$route' (to, from) {
      this.$store.dispatch(FETCH_ARTICLES, {
        tag: to.params.tag
      })
    }
  },
  computed: {
    ...mapState({
      articles: state => state.home.articles
    })
  }
}
</script>
