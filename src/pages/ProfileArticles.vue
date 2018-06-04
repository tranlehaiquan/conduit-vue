<template>
  <ListArticle :query="{author: username}"></ListArticle>
</template>

<script>
import ListArticle from '@/components/ListArticle'
export default {
  components: {
    ListArticle
  },
  computed: {
    username () {
      return this.$route.params.username
    }
  }
}
</script>
