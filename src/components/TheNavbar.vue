<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link :to="{ name: 'Home'}" class="nav-link active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'CreateArticle'}">
            <i class="ion-compose"></i>&nbsp; Create Post
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'Setting'}" class="nav-link">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'SignUp'}" class="nav-link">Sign up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {

}
</script>
