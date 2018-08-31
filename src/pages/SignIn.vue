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
              <input
                type="text"
                v-model="email"
                placeholder="Email"
                class="form-control form-control-lg"
                :disabled="loading"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                class="form-control form-control-lg"
                :disabled="loading"
              >
            </fieldset>
            <the-button
              class="btn-lg btn-primary pull-xs-right"
              :loading="loading"
            >
              Sign in
            </the-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LOGIN_ACCOUNT, LOGOUT_ACCOUNT } from '@/store/actions.type.js'
import { mapActions } from 'vuex'
import TheError from '@/components/TheError'
import TheButton from '@/components/TheButton'
export default {
  components: {
    TheError,
    TheButton
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {},
      loading: false
    }
  },
  methods: {
    ...mapActions({
      loginAccount: LOGIN_ACCOUNT,
      logoutAccount: LOGOUT_ACCOUNT
    }),
    async login () {
      const { email, password } = this
      this.loading = true
      try {
        await this.loginAccount({ user: { email, password } })
        const { redirect } = this.$route.query
        if (redirect) this.$router.push({ path: redirect })
        else this.$router.push({ name: 'Home' })
      } catch ({ response }) {
        this.errors = response.data.errors
      }
      this.loading = false
    }
  },
  created () {
    this.logoutAccount()
  }
}
</script>
