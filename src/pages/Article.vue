<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="loadingArticle">
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
      <the-article-content
        :isLoading="loadingArticle"
        :content="article.data.body"
      />

      <hr />

      <div class="article-actions">
        <template v-if="!loadingArticle">
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

          <template v-if="loadingComments">
            <p>Loading Comments</p>
          </template>
          <template v-else>
            <list-comment :comments="comments" :slug="article.data.slug"></list-comment>
          </template>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {FETCH_ARTICLE, FETCH_COMMENT} from '@/store/actions.type'
import ArticleMeta from '@/components/ArticleMeta'
import CommentEditor from '@/components/CommentEditor'
import ListComment from '@/components/ListComment'
import TheArticleContent from '@/components/TheArticleContent'
export default {
  props: ['slug'],
  components: {
    ArticleMeta,
    ListComment,
    CommentEditor,
    TheArticleContent
  },
  data () {
    return {
      loadingArticle: true,
      loadingComments: true
    }
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      comments: state => state.article.comments
    }),
    isLogin () {
      return this.$store.state.authentication.isLogin
    }
  },
  created () {
    this.loadingArticle = true
    this.loadingComments = true
    this.fetchArticle(this.slug)
      .then(() => { this.loadingArticle = false })
    this.fetchComment(this.slug)
      .then(() => { this.loadingComments = false })
  },
  methods: {
    ...mapActions({
      fetchArticle: FETCH_ARTICLE,
      fetchComment: FETCH_COMMENT
    })
  }
}
</script>
