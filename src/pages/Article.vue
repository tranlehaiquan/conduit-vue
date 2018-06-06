<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article.isLoading">
        Is loading...
      </div>
      <div v-else class="container">
        <h1>{{article.data.title}}</h1>

        <article-meta
          :article="article.data"
        >
        </article-meta>
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div v-if="!article.isLoading" class="col-md-12" v-html="content">
        </div>
        <div v-else>
          Is loading...
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <template v-if="!article.isLoading">
          <article-meta
            :article="article.data"
          >
          </article-meta>
        </template>
        <template v-else>
          Is Loading...
        </template>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <template v-if="isLogin">
            <comment-editor :slug="article.data.slug" :author="article.data.author"></comment-editor>
          </template>
          <template v-else>
            <p style="display: inherit;">
              <router-link :to="{name: 'SignIn'}">Sign in</router-link>
               or
              <router-link :to="{name: 'SignUp'}">sign up</router-link> to add comments on this article.
            </p>
          </template>
          <list-article-comment :comments="comments" :slug="article.data.slug"></list-article-comment>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import marked from 'marked'
import {mapState, mapActions} from 'vuex'
import {FETCH_ARTICLE, FETCH_COMMENT} from '@/store/actions.type'
import ArticleMeta from '@/components/ArticleMeta'
import CommentEditor from '@/components/CommentEditor'
import ListArticleComment from '@/components/ListArticleComment'
export default {
  props: ['slug'],
  components: {
    ArticleMeta,
    ListArticleComment,
    CommentEditor
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      comments: state => state.article.comments
    }),
    isLogin () {
      return this.$store.state.authentication.isLogin
    },
    content () {
      return marked(this.article.data.body)
    }
  },
  mounted () {
    if (this.slug !== this.article.data.slug) this.fetchArticle(this.slug)
    this.fetchComment(this.slug)
  },
  methods: {
    ...mapActions({
      fetchArticle: FETCH_ARTICLE,
      fetchComment: FETCH_COMMENT
    })
  }
}
</script>
