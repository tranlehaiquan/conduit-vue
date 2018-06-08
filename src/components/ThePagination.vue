<template>
  <nav>
    <ul class="pagination" v-if="pageCount > 1">
      <li @click.prevent="previousPage" :class="isFirst && 'disabled'" class="page-item">
        <a class="page-link" href>Previous</a>
      </li>
      <li
        v-for="page in pagination"
        :key="page"
        class="page-item"
        :class="isActive(page) && 'active'"
        @click.prevent="changePage(page)"
      >
        <template v-if="page !== '...'">
          <a class="page-link" href>{{page}}</a>
        </template>
        <template v-else>
          <a class="page-link">...</a>
        </template>
      </li>
      <li @click.prevent="nextPage" :class="isLast && 'disabled'" class="page-item">
        <a class="page-link" href>Next</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    pageCount: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  methods: {
    changePage (page) {
      if (page === '...') return
      this.$emit('change', page - 1)
    },
    isActive (page) {
      if (page === this.value + 1) return true
      return false
    },
    previousPage () {
      this.$emit('change', this.value - 1)
    },
    nextPage () {
      this.$emit('change', this.value + 1)
    }
  },
  computed: {
    pagination () {
      let current = this.value
      let last = this.pageCount
      let delta = 3
      let left = current - delta
      let right = current + delta + 1
      let range = []
      let rangeWithDots = []
      let l

      for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
          range.push(i)
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      }

      return rangeWithDots
    },
    isFirst () {
      return this.value === 0
    },
    isLast () {
      return this.value === (this.pageCount - 1)
    }
  }
}
</script>
