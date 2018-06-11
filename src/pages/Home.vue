<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <home-artcile-nav></home-artcile-nav>
        </div>

        <router-view></router-view>
      </div>

      <div class="col-md-3">
        <the-aside-tags></the-aside-tags>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import TheAsideTags from '@/components/TheAsideTags.vue'
import HomeArtcileNav from '@/components/HomeArtcileNav.vue'
export default {
  components: {
    HomeArtcileNav,
    TheAsideTags
  },
  data () {
    return {}
  }
}
</script>
