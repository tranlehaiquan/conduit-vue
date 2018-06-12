<template>
  <div class="loading">
    <template v-if="isArticlePreview">
      <div class="loading__avatar"></div>
      <div class="loading__metas">
        <div class="loading__meta"></div>
        <div class="loading__meta"></div>
      </div>
      <div class='loading__text'></div>
      <div class='loading__text'></div>
      <div class='loading__text'></div>
      <div class='loading__text'></div>
    </template>

    <template v-else-if="isTags">
      <div class="loading__tags">
        <div v-for="(item, index) in 15" :key="index" class="loading__tag"></div>
      </div>
    </template>

    <template v-else>
      <div v-for="(item, index) in contentLine" :key="index" class="loading__text"></div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isArticlePreview: {
      type: Boolean,
      default: false
    },
    isTags: {
      type: Boolean,
      default: false
    },
    contentLine: {
      type: Number,
      default: 5
    }
  }
}
</script>

<style>
.loading {
  position: relative;
}
.loading__text {
  height: 10px;
  margin: 10px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
}
.loading__text:nth-of-type(1) {
  width: 85%;
}
.loading__text:nth-of-type(5) {
  width: 85%;
}
.loading__text:nth-of-type(9) {
  width: 85%;
}
.loading__text:nth-of-type(2) {
  width: 80%;
}
.loading__text:nth-of-type(6) {
  width: 80%;
}
.loading__text:nth-of-type(10) {
  width: 80%;
}
.loading__text:nth-of-type(3) {
  width: 75%;
}
.loading__text:nth-of-type(7) {
  width: 75%;
}
.loading__text:nth-of-type(4) {
  width: 65%;
}
.loading__text:nth-of-type(8) {
  width: 65%;
}
.loading__avatar {
  height: 50px;
  width: 50px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
  margin: 10px;
}
.loading__meta {
  height: 10px;
  margin: 10px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
}
.loading__meta:nth-of-type(1) {
  width: 50px;
}
.loading__meta:nth-of-type(2) {
  width: 70px;
}
.loading__metas {
  position: absolute;
  top: 0;
  left: 60px;
}

.loading__tag {
  height: 20px;
  margin-right: 5px;
  margin-bottom: 2.5px;
  -webkit-animation: pulse 1s infinite ease-in-out;
          animation: pulse 1s infinite ease-in-out;
  display: inline-block;
  width: 40px;
}
.loading__tag:nth-of-type(1) {
  width: 30px;
}
.loading__tag:nth-of-type(4) {
  width: 30px;
}
.loading__tag:nth-of-type(8) {
  width: 30px;
}
.loading__tag:nth-of-type(2) {
  width: 70px;
}
.loading__tag:nth-of-type(5) {
  width: 70px;
}
.loading__tag:nth-of-type(7) {
  width: 70px;
}
.loading__tag:nth-of-type(3) {
  width: 50px;
}
.loading__tag:nth-of-type(6) {
  width: 50px;
}
.loading__tag:nth-of-type(9) {
  width: 50px;
}
.loading__tag:nth-of-type(10) {
  width: 70px;
}
.loading__tag:nth-of-type(11) {
  width: 70px;
}
.loading__tag:nth-of-type(12) {
  width: 50px;
}
.loading__tag:nth-of-type(13) {
  width: 50px;
}
.loading__tag:nth-of-type(14) {
  width: 50px;
}
</style>
