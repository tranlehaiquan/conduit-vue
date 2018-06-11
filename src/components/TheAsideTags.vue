<template>
  <div class="sidebar">
    <p>Popular Tags</p>

    <div class="tag-list">
      <template v-if="tags.isLoading">
        <div class="loading">
          <div class="loading__tags">
            <div v-for="(item, index) in 15" :key="index" class="loading__tag"></div>
          </div>
        </div>
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
import {FETCH_TAGS} from '@/store/actions.type'
export default {
  created () {
    this.$store.dispatch(FETCH_TAGS)
  },
  computed: {
    tags () {
      return this.$store.state.home.tags
    }
  }
}
</script>

<style>
.loading__tag {
  height: 20px;
  margin-right: 5px;
  margin-bottom: 2.5px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
  display: inline-block;
  width: 40px;
}
.loading__tag:nth-of-type(1) {
  width: 30px;
}
.loading__tag:nth-of-type(4) {
  width: 30px;
}
.loading__tag:nth-of-type(8) {
  width: 30px;
}
.loading__tag:nth-of-type(2) {
  width: 70px;
}
.loading__tag:nth-of-type(5) {
  width: 70px;
}
.loading__tag:nth-of-type(7) {
  width: 70px;
}
.loading__tag:nth-of-type(3) {
  width: 50px;
}
.loading__tag:nth-of-type(6) {
  width: 50px;
}
.loading__tag:nth-of-type(9) {
  width: 50px;
}
.loading__tag:nth-of-type(10) {
  width: 70px;
}
.loading__tag:nth-of-type(11) {
  width: 70px;
}
.loading__tag:nth-of-type(12) {
  width: 50px;
}
.loading__tag:nth-of-type(13) {
  width: 50px;
}
.loading__tag:nth-of-type(14) {
  width: 50px;
}
</style>
