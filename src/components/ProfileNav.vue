<template>
  <ul class="nav nav-pills outline-active">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <router-link :to="{name: 'ProfileArticles'}" exact-active-class="active" class="nav-link" append>Articles</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'ProfileFavorited'}" exact-active-class="active" class="nav-link" append>
          Favorited
        </router-link>
      </li>
    </ul>
  </ul>
</template>
