<template>
  <ListArticle :query="{favorited: username}" :limit="5"></ListArticle>
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
