<template>
  <nav>
    <ul class="pagination" v-if="pages">
      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href>{{page}}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 10
    }
  },
  methods: {
    changePage (page) {
      console.log(page)
    }
  }
}
</script>
