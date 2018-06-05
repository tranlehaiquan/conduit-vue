<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link :to="{ name: 'Home'}" class="navbar-brand">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link :to="{ name: 'Home'}" class="nav-link active">Home</router-link>
        </li>
        <template v-if="isLogin">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'EditorArticle'}" active-class="active">
              <i class="ion-compose"></i>&nbsp; Create Post
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Setting'}" class="nav-link" active-class="active">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'ProfileArticles', params: {username: user.username} }"
              exact-active-class="active" class="nav-link">
              {{user.username}}
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" @click="doLogout" class="nav-link"><i class="ion-log-out"></i> Logout</a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link :to="{name: 'SignUp'}" class="nav-link" active-class="active"><i class="ion-compose"></i> Sign up</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'SignIn'}" class="nav-link" active-class="active"><i class="ion-compose"></i> Sign in</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState({
      isLogin: state => state.authentication.isLogin,
      user: state => state.authentication.user
    })
  },
  methods: {
    ...mapActions({
      logout: 'LOGOUT_ACCOUNT'
    }),
    doLogout () {
      this.logout()
      if (this.$route.path !== '/') this.$router.push({name: 'Home'})
    }
  }
}
</script>
