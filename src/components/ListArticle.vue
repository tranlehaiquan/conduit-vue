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
export default {
  props: {
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
  }
}
</script>
