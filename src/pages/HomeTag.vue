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
