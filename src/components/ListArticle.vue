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
import {mapActions} from 'vuex'
import {FETCH_ARTICLES, FETCH_FEED_ARTICLES} from '@/store/actions.type'
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
    },
    feed: {
      type: Boolean,
      default: false
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
      this.fetchNewArticle()
    },
    query () {
      this.fetchNewArticle()
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
  },
  methods: {
    ...mapActions({
      fetchArticle: FETCH_ARTICLES,
      fetchFeedArticle: FETCH_FEED_ARTICLES
    }),
    fetchNewArticle () {
      const query = this.queryString
      if (!this.feed) {
        this.fetchArticle(query)
      } else {
        this.fetchFeedArticle(query)
      }
    }
  }
}
</script>
