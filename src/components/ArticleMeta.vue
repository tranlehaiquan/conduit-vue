<template>
  <div class="article-meta" v-if="article">
    <a href="">
      <img :src="article.author.image" />
    </a>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt}}</span>
    </div>

    <template v-if="!isAuthor">
      <button @click="isLogin ? toggleFollow() : pushToLoginScreen()" :class="buttonClass" class="btn btn-sm">
        <i :class="article.author.following ? 'ion-minus' : 'ion-plus'"></i>
        &nbsp;
        {{buttonFollowText}}
      </button>
      &nbsp;&nbsp;
      <button @click="isLogin ? toggleFavorite() : pushToLoginScreen()" :class="article.favorited && 'active'" class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">{{article.favoritesCount}}</span>
      </button>
    </template>
    <template v-else>
      <span>
        <router-link :to="{name: 'EditorArticle', params: {slug: article.slug}}"
          class="btn btn-sm btn-outline-secondary"
          style="margin-right: 10px">
          <i class="ion-edit"></i> Edit Article
        </router-link>
        <button @click="deleteArticle" class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    </template>
  </div>
</template>
<script>
import {
  DELETE_ARTICLE,
  FAVORITE_ARTICLE,
  UNFAVORITE_ARTICLE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_AUTHOR_ARTICLE } from '@/store/actions.type'
import {mapActions, mapState} from 'vuex'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.authentication.user
    }),
    isAuthor () {
      return this.user.username === this.article.author.username
    },
    buttonClass () {
      return this.article.author.following ? 'btn-danger' : 'btn-outline-secondary'
    },
    buttonFollowText () {
      return this.article.author.following ? 'Unfollow' : 'Follow'
    },
    isLogin () {
      return this.user.username
    }
  },
  methods: {
    ...mapActions({
      deleteArticle: DELETE_ARTICLE,
      favoriteArticle: FAVORITE_ARTICLE,
      unfavoriteArticle: UNFAVORITE_ARTICLE,
      followUser: FOLLOW_USER,
      unfollowUser: UNFOLLOW_USER,
      setAuthor: SET_AUTHOR_ARTICLE
    }),
    async deleteArticle () {
      await this.deleteArticle(this.article.slug)
      this.$router.push({name: 'Home'})
    },
    async toggleFollow () {
      if (!this.isLogin) {
        this.$router.push({name: 'SignIn'})
        return
      }

      const action = this.article.author.following ? this.unfollowUser : this.followUser

      const author = await action(this.article.author.username)
      this.setAuthor(author)
    },
    async toggleFavorite () {
      const action = this.article.favorited ? this.unfavoriteArticle : this.favoriteArticle

      await action(this.article.slug)
    },
    pushToLoginScreen () {
      this.$router.push({name: 'SignIn'})
    }
  }
}
</script>
