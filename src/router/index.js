import Vue from 'vue'
import Router from 'vue-router'

const index = () =>
  import(/* webpackChunkName:"index" */ '@/components/index');
const Article = () =>
  import(/* webpackChunkName:"index" */ '@/components/Article');
const ArticleDetail = () =>
  import(/* webpackChunkName:"index" */ '@/components/ArticleDetail');
const WriteArticle = () =>
  import(/* webpackChunkName:"WriteArticle" */ '@/components/WriteArticle');
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
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/Article',
      name: 'Article',
      component: Article
    }, {
      path: '/ArticleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail
    }, {
      path:'/WriteArticle',
      name:'WriteArticle',
      component:WriteArticle
    }, {
      path:'/TagIndex',
      name:'TagIndex',
      component:TagIndex
    }, {
      path:'/TopBar',
      name:'TopBar',
      component:TopBar
    }, {
      path:'/LoginPage',
      name:'LoginPage',
      component:LoginPage
    }, {
      path:'/TimeLine',
      name:'TimeLine',
      component:TimeLine
    }, {
      path:'/Heartfelt',
      name:'Heartfelt',
      component:Heartfelt
    }, {
      path:'/FriendUrlIndex',
      name:'FriendUrlIndex',
      component:FriendUrlIndex
    }, {
      path:'/MessageLeave',
      name:'MessageLeave',
      component:MessageLeave
    },{
      path:'/Comment',
      name:'Comment',
      component:Comment
    },{
      path:'/SnakeScores',
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
