<template>
  <div>
    <template v-if="articles.isLoading">
      <div class="article-preview">
        Loading...
      </div>
    </template>
    <template v-else-if="articles.data.length">
      <ListArticle :articles="articles"></ListArticle>
    </template>
    <template v-else>
      <div class="article-preview">
      No articles are here... yet.
    </div>
    </template>
  </div>
</template>
<script>
import ListArticle from '@/components/ListArticle'
import {FETCH_ARTICLES} from '@/store/actions.type'
export default {
  components: {
    ListArticle
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
