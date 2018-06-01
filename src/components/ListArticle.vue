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
    <TheNavArticle></TheNavArticle>
  </div>
</template>
<script>
import TheNavArticle from '@/components/TheNavArticle'
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
    offset: {
      type: Number,
      default: 0
    },
    articles: {
      type: Object,
      default: () => {
        return {
          isLoading: false,
          data: [],
          error: ''
        }
      }
    }
  },
  components: {
    ArticlePreview,
    TheNavArticle
  }
}
</script>
