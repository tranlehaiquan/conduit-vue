<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <!-- <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li> -->
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>

          <article-preview
            v-for="(article, index) in articles"
            :key="article.slug + index"
            :article="article"
          >
          </article-preview>

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <a
              v-for='tag in tags'
              :key="tag"
              href="#"
              class="tag-pill tag-default"
            >
              {{tag}}
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import ArticlePreview from '@/components/ArticlePreview.vue'
import {FETCH_TAGS, FETCH_ARTICLES} from '@/store/actions.type'
export default {
  components: {
    ArticlePreview
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch(FETCH_TAGS)
    this.$store.dispatch(FETCH_ARTICLES)
  },
  computed: {
    articles () {
      return this.$store.state.articles
    },
    tags () {
      return this.$store.state.tags
    }
  }
}
</script>
