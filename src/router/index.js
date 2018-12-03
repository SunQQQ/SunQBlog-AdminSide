import Vue from 'vue'
import Router from 'vue-router'
import Article from '@/components/Article'
import ArticleDetail from '@/components/ArticleDetail'
import WriteArticle from '@/components/WriteArticle'
import TagIndex from '@/components/TagIndex'
import TopBar from '@/components/TopBar'
import LoginPage from '@/components/LoginPage'
import TimeLine from '@/components/TimeLine'
import Heartfelt from '@/components/Heartfelt'
import FriendUrlIndex from '@/components/FriendUrlIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article
    },
    {
      path: '/ArticleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path:'/WriteArticle',
      name:'WriteArticle',
      component:WriteArticle
    },
    {
      path:'/TagIndex',
      name:'TagIndex',
      component:TagIndex
    },
    {
      path:'/TopBar',
      name:'TopBar',
      component:TopBar
    },
    {
      path:'/LoginPage',
      name:'LoginPage',
      component:LoginPage
    },
    {
      path:'/TimeLine',
      name:'TimeLine',
      component:TimeLine
    },
    {
      path:'/Heartfelt',
      name:'Heartfelt',
      component:Heartfelt
    },
    {
      path:'/FriendUrlIndex',
      name:'FriendUrlIndex',
      component:FriendUrlIndex
    }
  ]
})
