import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import SignUp from '@/pages/SignUp'
import HomeFeed from '@/pages/HomeFeed'
import HomeTag from '@/pages/HomeTag'
import HomeGlobal from '@/pages/HomeGlobal'
import ProfileArticles from '@/pages/ProfileArticles'
import ProfileFavorited from '@/pages/ProfileFavorited'
import SignIn from '@/pages/SignIn'
const Profile = import('@/pages/Profile')
const Setting = import('@/pages/Setting')
const EditorArticle = import('@/pages/EditorArticle')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: HomeGlobal, name: 'Home' },
        { path: 'feed', component: HomeFeed, meta: { requiresAuth: true } },
        { path: 'tag/:tag', component: HomeTag, props: true }
      ]
    },
    {
      path: '/articles/:slug',
      name: 'Article',
      component: Article,
      props: true
    },
    {
      path: '/editor/:slug?',
      name: 'EditorArticle',
      component: () => EditorArticle,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/register',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/setting',
      name: 'Setting',
      component: () => Setting,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/:username',
      component: () => Profile,
      props: true,
      children: [
        { path: '', component: ProfileArticles, name: 'ProfileArticles' },
        { path: 'favorites', component: ProfileFavorited, name: 'ProfileFavorited' }
      ]
    }
  ]
})
