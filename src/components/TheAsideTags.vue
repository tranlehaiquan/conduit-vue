<template>
  <div class="sidebar">
    <p>Popular Tags</p>

    <div class="tag-list">
      <template v-if="tags.isLoading">
        <the-place-holder :isTags="true"></the-place-holder>
      </template>
      <template v-else>
        <router-link
          v-for='tag in tags.data'
          :key="tag"
          :to="{path: '/tag/'+tag}"
          class="tag-pill tag-default">
          {{tag}}
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import ThePlaceHolder from '@/components/ThePlaceHolder'
import {FETCH_TAGS} from '@/store/actions.type'
export default {
  created () {
    this.$store.dispatch(FETCH_TAGS)
  },
  computed: {
    tags () {
      return this.$store.state.home.tags
    }
  },
  components: {
    ThePlaceHolder
  }
}
</script>
