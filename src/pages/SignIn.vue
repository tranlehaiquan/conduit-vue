<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="#/register" class="">
              Need an account?
            </a>
          </p>
          <ul class="error-messages"></ul>
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
import {LOGIN_ACCOUNT} from '@/store/actions.type.js'
import {saveJWTToStorage} from '@/api/localStorage'
import ApiService from '@/api'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const {email, password} = this
      this.$store.dispatch(LOGIN_ACCOUNT, {user: {email, password}})
        .then((data) => {
          saveJWTToStorage(data.user.token)
          this.$router.push({name: 'Home'})
          ApiService.setHeader()
        })
    }
  }
}
</script>
