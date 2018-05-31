<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <template v-if="userLoading">
          <div class="col-xs-12 col-md-10 offset-md-1">
            Is loading...
          </div>
        </template>
        <template v-else>
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userImage" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>
              {{user.bio}}
            </p>
            <template v-if="!isCurrentUser">
              <button @click="toggleFollow" class="btn btn-sm btn-outline-secondary action-btn">
                <i :class="user.following ? 'ion-minus' : 'ion-plus'"></i>
                &nbsp;
                {{buttonFollowText}}
              </button>
            </template>
            <template v-else>
              <router-link :to="{name: 'Setting'}" class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </template>
          </div>
        </template>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <profile-nav></profile-nav>
        </div>

        <router-view></router-view>

      </div>

    </div>
  </div>

</div>
</template>
<script>
import {FOLLOW_USER, UNFOLLOW_USER, FETCH_PROFILE, COPY_PROFILE} from '@/store/actions.type'
import store from '@/store'
import ProfileNav from '@/components/ProfileNav'
export default {
  components: {
    ProfileNav
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  computed: {
    user () {
      return this.$store.state.profile.user
    },
    userLoading () {
      return this.$store.state.profile.isLoading
    },
    isCurrentUser () {
      return store.state.authentication.user.username === this.user.username
    },
    userImage () {
      return this.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
    },
    buttonFollowText () {
      if (this.user.following) return `Unfollow ${this.user.username}`
      return `Follow ${this.user.username}`
    }
  },
  beforeRouteEnter (to, from, next) {
    const currentUsername = store.state.authentication.user.username
    if (currentUsername === to.params.username) {
      const {username, bio, image} = store.state.authentication.user
      const user = {username, bio, image, following: false}
      store.dispatch(COPY_PROFILE, user)
    } else {
      store.dispatch(FETCH_PROFILE, to.params.username)
    }
    next()
  },
  methods: {
    toggleFollow () {
      if (this.user.following) store.dispatch(UNFOLLOW_USER, this.user.username)
      else store.dispatch(FOLLOW_USER, this.user.username)
    }
  }
}
</script>
