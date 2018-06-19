<template>
  <div class="article-meta" v-if="article">
    <router-link
        :to="{name: 'ProfileArticles', params: {username: article.author.username}}"
      >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        :to="{name: 'ProfileArticles', params: {username: article.author.username}}"
        class="author"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">Create at {{article.createdAt}}</span>
    </div>

    <template v-if="!isAuthor">
      <the-button
        @click="handlerFollow"
        :class="buttonClass"
        class="btn-sm"
        :loading="loadingFollow"
        :icon="article.author.following ? 'ion-minus' : 'ion-plus'"
      >
        &nbsp;
        {{buttonFollowText}}
      </the-button>
      &nbsp;&nbsp;
      <the-button
        @click="handlerFavorite"
        :class="article.favorited && 'active'"
        class="btn-sm btn-outline-primary"
        :loading="loadingFavorite"
        :icon="'ion-heart'"
      >
        &nbsp;
        Favorite Post <span class="counter">{{article.favoritesCount}}</span>
      </the-button>
    </template>
    <template v-else>
      <span>
        <router-link
          :to="{name: 'EditorArticle', params: {slug: article.slug}}"
          class="btn btn-sm btn-outline-secondary"
          style="margin-right: 10px"
        >
          <i class="ion-edit"></i> Edit Article
        </router-link>
        <button
          @click="deleteArticle"
          class="btn btn-outline-danger btn-sm"
        >
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
import TheButton from '@/components/TheButton'
export default {
  components: {
    TheButton
  },
  data () {
    return {
      loadingFollow: false,
      loadingFavorite: false
    }
  },
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
    handlerFollow () {
      this.isLogin ? this.toggleFollow() : this.pushToLoginScreen()
    },
    handlerFavorite () {
      this.isLogin ? this.toggleFavorite() : this.pushToLoginScreen()
    },
    async deleteArticle () {
      await this.deleteArticle(this.article.slug)
      this.$router.push({name: 'Home'})
    },
    async toggleFollow () {
      const action = this.article.author.following ? this.unfollowUser : this.followUser

      this.loadingFollow = true
      const author = await action(this.article.author.username)
      this.setAuthor(author)
      this.loadingFollow = false
    },
    async toggleFavorite () {
      const action = this.article.favorited ? this.unfavoriteArticle : this.favoriteArticle

      this.loadingFavorite = true
      await action(this.article.slug)
      this.loadingFavorite = false
    },
    pushToLoginScreen () {
      this.$router.push({name: 'SignIn'})
    }
  }
}
</script>
