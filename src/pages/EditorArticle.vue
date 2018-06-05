<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input v-model="title" type="text" class="form-control" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="description" type="text" class="form-control" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
              <textarea v-model="body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
              <TheInputTags v-model="tagList"></TheInputTags>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button">
              Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import TheInputTags from '@/components/TheInputTags'
import store from '@/store'
export default {
  components: {
    TheInputTags
  },
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async (vm) => {
      const {slug} = to.params
      if (slug) {
        if (store.state.article.article.data.slug !== slug) await store.dispatch('FETCH_ARTICLE', slug)

        const {title, description, body, tagList} = store.state.article.article.data
        vm.title = title
        vm.description = description
        vm.body = body
        vm.tagList = tagList
      }
    })
  },
  async beforeRouteUpdate (to, from, next) {
    const {slug} = to.params
    if (slug) {
      await store.dispatch('FETCH_ARTICLE', slug)

      const {title, description, body, tagList} = store.state.article.article.data
      this.title = title
      this.description = description
      this.body = body
      this.tagList = tagList
    } else {
      this.title = ''
      this.description = ''
      this.body = ''
      this.tagList = []
    }
    next()
  }
}
</script>
