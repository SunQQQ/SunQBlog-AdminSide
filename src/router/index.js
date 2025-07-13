import Vue from 'vue'
import Router from 'vue-router'

const index = () =>
  import(/* webpackChunkName:"index" */ '@/components/index');
const Article = () =>
  import(/* webpackChunkName:"index" */ '@/components/Article');
const ArticleDetail = () =>
  import(/* webpackChunkName:"index" */ '@/components/ArticleDetail');
const WriteArticle = () =>
  import(/* webpackChunkName:"index" */ '@/components/WriteArticle');
const TagIndex = () =>
  import(/* webpackChunkName:"index" */ '@/components/TagIndex');
const TopBar = () =>
  import(/* webpackChunkName:"index" */ '@/components/TopBar');
const LoginPage = () =>
  import(/* webpackChunkName:"index" */ '@/components/LoginPage');
const TimeLine = () =>
  import(/* webpackChunkName:"index" */ '@/components/TimeLine');
const Heartfelt = () =>
  import(/* webpackChunkName:"index" */ '@/components/Heartfelt');
const FriendUrlIndex = () =>
  import(/* webpackChunkName:"index" */ '@/components/FriendUrlIndex');
const MessageLeave = () =>
  import(/* webpackChunkName:"index" */ '@/components/MessageLeave');
const Comment = () =>
  import(/* webpackChunkName:"index" */ '@/components/Comment');
const SnakeScores = () =>
  import(/* webpackChunkName:"index" */ '@/components/SnakeScores');
const userManage = () =>
  import(/* webpackChunkName:"index" */ '@/components/userManage');

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/article',
      name: 'Article',
      component: Article
    }, {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    }, {
      path:'/writeArticle',
      name:'WriteArticle',
      component:WriteArticle
    }, {
      path:'/tagIndex',
      name:'TagIndex',
      component:TagIndex
    }, {
      path:'/topBar',
      name:'TopBar',
      component:TopBar
    }, {
      path:'/loginPage',
      name:'LoginPage',
      component:LoginPage
    }, {
      path:'/timeLine',
      name:'TimeLine',
      component:TimeLine
    }, {
      path:'/heartfelt',
      name:'Heartfelt',
      component:Heartfelt
    }, {
      path:'/friendUrlIndex',
      name:'FriendUrlIndex',
      component:FriendUrlIndex
    }, {
      path:'/messageLeave',
      name:'MessageLeave',
      component:MessageLeave
    },{
      path:'/comment',
      name:'Comment',
      component:Comment
    },{
      path:'/snakeScores',
      name:'SnakeScores',
      component:SnakeScores
    },
    {
      path:'/userManage',
      name:'userManage',
      component:userManage
    }
  ]
})
