<template>
  <div class="article-page">

  <div class="banner">
    <div class="container" v-if="article">

      <h1>{{article.title}}</h1>

      <article-meta
        :author="article.author"
        :favorited="article.favorited"
        :favoritesCount="article.favoritesCount"
        :createdAt="article.createdAt"
      >
      </article-meta>
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12">
        {{article.body}}
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta
        :author="article.author"
        :favorited="article.favorited"
        :favoritesCount="article.favoritesCount"
        :createdAt="article.createdAt"
      >
      </article-meta>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>

        <list-article-comment :comments="comments"></list-article-comment>
      </div>

    </div>

  </div>

</div>
</template>
<script>
import ArticleMeta from '@/components/ArticleMeta'
import ListArticleComment from '@/components/ListArticleComment'
import ApiService from '@/api'
export default {
  components: {
    ArticleMeta,
    ListArticleComment
  },
  data () {
    return {
      article: {},
      comments: []
    }
  },
  mounted () {
    ApiService.get(this.$route.path)
      .then(({data}) => {
        this.article = data.article
      })

    ApiService.get(this.$route.path + '/comments')
      .then(({data}) => {
        this.comments = data.comments
      })
  }
}
</script>
