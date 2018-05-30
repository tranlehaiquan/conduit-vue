<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'" class="user-img" />
          <h4>{{user.username}}</h4>
          <p>
            {{user.bio}}
          </p>
          <template v-if="!isCurrentUser">
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{user.username}}
            </button>
          </template>
          <template v-else>
            <router-link :to="{name: 'Setting'}" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </router-link>
          </template>
        </div>

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
      return this.$store.state.authentication.user
    },
    isCurrentUser () {
      return this.username === this.user.username
    }
  }
}
</script>
