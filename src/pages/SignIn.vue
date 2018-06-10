<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{path: '/register'}">Need an account?</router-link>
          </p>
          <the-error :errors="errors"></the-error>
          <form @submit.prevent="login">
            <fieldset class="form-group">
              <input type="text" v-model="email" placeholder="Email" class="form-control form-control-lg">
            </fieldset>
            <fieldset class="form-group">
              <input type="password" v-model="password" placeholder="Password" class="form-control form-control-lg">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {LOGIN_ACCOUNT, LOGOUT_ACCOUNT} from '@/store/actions.type.js'
import TheError from '@/components/TheError'
export default {
  components: {
    TheError
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    login () {
      const {email, password} = this
      this.$store.dispatch(LOGIN_ACCOUNT, {user: {email, password}})
        .then(() => {
          const {redirect} = this.$route.query
          if (redirect) {
            this.$router.push({path: redirect})
          } else {
            this.$router.push({name: 'Home'})
          }
        })
        .catch(({response}) => {
          this.errors = response.data.errors
        })
    },
    logout () {
      this.$store.dispatch(LOGOUT_ACCOUNT)
    }
  },
  created () {
    this.logout()
  }
}
</script>
