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
            <button @click="submitArticle" class="btn pull-xs-right btn-primary" type="button">
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
import {mapActions} from 'vuex'
import TheInputTags from '@/components/TheInputTags'
import store from '@/store'
import {UPDATE_ARTICLE, CREATE_ARTICLE} from '@/store/actions.type'
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
        vm.tagList = tagList.map((tag) => {
          return {
            content: tag,
            key: Date.now() + tag
          }
        })
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
      this.tagList = tagList.map((tag) => {
        return {
          content: tag,
          key: Date.now() + tag
        }
      })
    } else {
      this.title = ''
      this.description = ''
      this.body = ''
      this.tagList = []
    }
    next()
  },
  methods: {
    ...mapActions({
      createArticle: CREATE_ARTICLE,
      updateArticle: UPDATE_ARTICLE
    }),
    async submitArticle () {
      const {title, description, body} = this
      const tagList = this.tagList.map((tag) => tag.content)

      let {slug} = this.$route.params
      let article
      if (slug) {
        article = await this.updateArticle({slug, article: {title, description, body, tagList}})
      } else {
        article = await this.createArticle({title, description, body, tagList})
      }

      this.$router.push({name: 'Article', params: {slug: article.data.article.slug}})
    }
  }
}
</script>
