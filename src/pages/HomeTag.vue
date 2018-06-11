<template>
  <ListArticle :limit="7" :query="{tag: tag}"></ListArticle>
</template>
<script>
import ListArticle from '@/components/ListArticle'
export default {
  props: {
    tag: String,
    required: true
  },
  components: {
    ListArticle
  }
}
</script>
