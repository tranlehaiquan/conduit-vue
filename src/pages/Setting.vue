<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <the-error :errors="errors"></the-error>
        <form @submit.prevent="updateProfile">
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image"
                  class="form-control form-control-lg" type="text" placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username"
                  class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {UPDATE_PROFILE} from '@/store/actions.type'
import TheError from '@/components/TheError'
export default {
  components: {
    TheError
  },
  data () {
    return {
      user: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      },
      errors: {}
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.authentication.user
    }
  },
  created () {
    const {image, username, bio, email} = this.currentUser
    Object.assign(this.user, {image, username, bio, email})
  },
  methods: {
    updateProfile () {
      this.$store.dispatch(UPDATE_PROFILE, this.user)
        .then(() => {
          this.$router.push({name: 'Home'})
        })
        .catch(({response}) => {
          this.errors = response.data.errors
        })
    }
  }
}
</script>
