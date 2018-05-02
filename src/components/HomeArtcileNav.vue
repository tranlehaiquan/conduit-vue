<template>
  <ul class="nav nav-pills outline-active">
    <li class="nav-item">
      <router-link :to="{path: '/'}" class="nav-link" exact-active-class="active">Global Feed</router-link>
    </li>
    <li class="nav-item" v-if="isLogin">
      <router-link :to="{path: '/feed'}" class="nav-link" active-class="active">Feed</router-link>
    </li>
    <li class="nav-item" v-if="$route.params.tag">
      <router-link :to="{path: '/tag/' + $route.params.tag}" class="nav-link" active-class="active">
        #{{$route.params.tag}}
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  computed: {
    isLogin () {
      return this.$store.state.authentication.isLogin
    }
  }
}
</script>
