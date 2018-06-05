<template>
  <div>
    <div class="input-group">
      <input @keydown.enter="submitTag" v-model="input" type="text" :placeholder="error || 'Enter tags'" class="form-control">
      <div class="input-group-btn">
        <button @click="submitTag" class="btn btn-outline-secondary" type="button">Add Tag</button>
      </div>
    </div>

    <div v-if="tags.length" class="tags">
      <span v-for="tag in tags" :key="tag.key" @click="remove(tag.key)" class="tags__item">
        {{tag.content}} <i class="ion-close-round"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'tags',
    event: 'change'
  },
  props: {
    tags: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      input: '',
      error: ''
    }
  },
  methods: {
    submitTag () {
      const error = this.checkIsInputError()
      if (error) this.showError(error)
      else {
        this.add()
        this.hideError()
      }
    },
    add () {
      const newTags = this.tags.slice()
      newTags.push({content: this.input, key: Date.now() + this.input})
      this.$emit('change', newTags)
      this.input = ''
    },
    remove (key) {
      const newTags = this.tags.filter((tag) => {
        return tag.key !== key
      })
      this.$emit('change', newTags)
      this.input = ''
    },
    checkIsInputError () {
      if (!this.input) return 'Can not be blank'
      const isDuplicate = this.tags.length && !this.tags.every((tag) => { return tag.content !== this.input })
      if (isDuplicate) return 'Can not be duplicate'

      return false
    },
    showError (error) {
      this.error = error
      this.input = ''
    },
    hideError () {
      this.error = ''
    }
  }
}
</script>

<style>
  .tags {
    margin-top: 8px;
  }
  .tags__item {
    color: #fff !important;
    font-size: 1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    white-space: nowrap;
    margin-right: 0.3em;
    margin-bottom: 0.2rem;
    display: inline-block;
    background-color: #818a91;
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 10rem;
    cursor: pointer;
  }
  .tags__item i {
    margin-left: 0.1em;
  }
</style>
