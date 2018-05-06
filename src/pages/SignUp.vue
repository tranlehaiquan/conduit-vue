<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <router-link :to="{path: '/login'}">Have an account?</router-link>
        </p>

        <ul class="error-messages" v-if="errors">
          <li v-for="(val, key) in errors" :key="key">{{key + val}}</li>
        </ul>

        <form @submit.prevent="register">
          <fieldset class="form-group">
            <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {REGISTER_ACCOUNT, LOGOUT_ACCOUNT} from '@/store/actions.type.js'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      errors: state => state.authentication.errors
    })
  },
  methods: {
    register () {
      const {username, email, password} = this
      this.$store.dispatch(REGISTER_ACCOUNT, {user: {username, email, password}})
        .then(() => {
          this.$router.push({name: 'Home'})
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
