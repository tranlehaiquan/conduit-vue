<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <the-error :errors="errors"></the-error>
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input
                v-model="title"
                type="text"
                class="form-control"
                placeholder="Article Title"
                :disabled="loading"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="description"
                type="text"
                class="form-control"
                placeholder="What's this article about?"
                :disabled="loading"
              >
            </fieldset>
            <fieldset class="form-group">
              <textarea
                v-model="body"
                class="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                :disabled="loading"
              ></textarea>
            </fieldset>
            <fieldset class="form-group">
              <TheInputTags
                v-model="tagList"
                :disabled="loading"
              />
            </fieldset>
            <the-button
              @click="handlerSubmit"
              class="pull-xs-right btn-primary"
              :loading="loading"
              native-type="button"
            >
              Publish Article
            </the-button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import TheInputTags from '@/components/TheInputTags'
import TheButton from '@/components/TheButton'
import store from '@/store'
import {UPDATE_ARTICLE, CREATE_ARTICLE, FETCH_ARTICLE} from '@/store/actions.type'
import TheError from '@/components/TheError'
export default {
  components: {
    TheInputTags,
    TheError,
    TheButton
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
      tagList: [],
      errors: {},
      loading: false
    }
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
  computed: {
    ...mapState({
      article: (state) => state.article.article.data
    })
  },
  methods: {
    ...mapActions({
      createArticle: CREATE_ARTICLE,
      updateArticle: UPDATE_ARTICLE,
      fetchArticle: FETCH_ARTICLE
    }),
    async handlerSubmit () {
      this.loading = true
      await this.submitArticle()
      this.loading = false
    },
    async submitArticle () {
      const {title, description, body} = this
      const tagList = this.tagList.map((tag) => tag.content)

      let {slug} = this.$route.params
      let article
      try {
        if (slug) {
          article = await this.updateArticle({slug, article: {title, description, body, tagList}})
        } else {
          article = await this.createArticle({title, description, body, tagList})
        }

        this.$router.push({name: 'Article', params: {slug: article.data.article.slug}})
      } catch ({response}) {
        this.errors = response.data.errors
      }
    }
  },
  async created () {
    const {slug} = this
    if (slug) {
      if (this.article.slug !== slug) {
        await this.fetchArticle(slug)
      }

      const {title, description, body, tagList} = this.article
      this.title = title
      this.description = description
      this.body = body
      this.tagList = tagList.map((tag) => {
        return {
          content: tag,
          key: Date.now() + tag
        }
      })
    }
  }
}
</script>
