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
    <div style="text-align: center">
      <the-pagination v-model="offset" :pageCount="pageCount"></the-pagination>
    </div>
  </div>
</template>
<script>
import {FETCH_ARTICLES} from '@/store/actions.type'
import ThePagination from '@/components/ThePagination'
import ArticlePreview from '@/components/ArticlePreview'
export default {
  props: {
    query: {
      type: Object,
      default: function () {
        return {}
      }
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      offset: 0
    }
  },
  components: {
    ArticlePreview,
    ThePagination
  },
  created () {
    const query = Object.assign({}, this.query, {limit: this.limit, offset: this.offset})
    this.$store.dispatch(FETCH_ARTICLES, query)
  },
  watch: {
    offset () {
      const query = this.queryString
      this.$store.dispatch(FETCH_ARTICLES, query)
    },
    query () {
      const query = this.queryString
      this.$store.dispatch(FETCH_ARTICLES, query)
    }
  },
  computed: {
    articles () {
      return this.$store.state.home.articles
    },
    pageCount () {
      return Math.round(this.articles.articlesCount / this.limit)
    },
    queryString () {
      return Object.assign({}, this.query, {limit: this.limit, offset: this.offset})
    }
  }
}
</script>
