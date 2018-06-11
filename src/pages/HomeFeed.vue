<template>
  <ListArticle :limit="7" :feed="true"></ListArticle>
</template>
<script>
import ListArticle from '@/components/ListArticle'
export default {
  components: {
    ListArticle
  }
}
</script>
