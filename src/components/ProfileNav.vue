<template>
  <ul class="nav nav-pills outline-active">
    <li class="nav-item">
      <router-link :to="{name: 'ProfileArticles'}" exact-active-class="active" class="nav-link">Articles</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name: 'ProfileFavorited'}" exact-active-class="active" class="nav-link">
        Favorited
      </router-link>
    </li>
  </ul>
</template>
