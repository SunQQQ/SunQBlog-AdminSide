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

const DEFAULT_TITLE = 'Coding Life Admin | Coding Life 管理后台 | 分享你的代码与生活';
const DEFAULT_DESCRIPTION = 'Coding Life Admin 是一个源码开源博客社区的管理后台，用Markdown书写我们的技术与生活。开发者可自由注册发布技术文章或生活随笔，沉浸于自己的编程乐趣，在技术中找到人生的价值。';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '概览页 | Coding Life 管理后台',
        description: 'Coding Life Admin 是一个源码开源博客社区的管理后台，开发者可自由注册发布技术文章或生活随笔，沉浸于自己的编程乐趣，在技术中找到人生的价值与快乐！',
        h1: '管理控制台概览'
      }
    }, {
      path: '/article',
      name: 'Article',
      component: Article,
      meta: {
        title: '文章管理 | Coding Life 管理后台',
        description: '管理所有技术博客文章，包括编辑、删除、审核和分类文章',
        h1: '技术文章管理'
      }
    }, {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail,
      meta: {
        title: '文章详情 | Coding Life 管理后台',
        description: '查看和编辑文章详细内容，管理文章标签和分类',
        h1: '文章内容编辑'
      }
    }, {
      path:'/writeArticle',
      name:'WriteArticle',
      component:WriteArticle,
      meta: {
        title: '撰写新文章 | Coding Life 管理后台',
        description: '使用Markdown编辑器撰写新的技术博客文章或生活随笔',
        h1: '创作新内容'
      }
    }, {
      path:'/tagIndex',
      name:'TagIndex',
      component:TagIndex,
      meta: {
        title: '标签管理 | Coding Life 管理后台',
        description: '管理博客文章标签系统，添加、编辑或删除标签',
        h1: '文章标签管理'
      }
    }, {
      path:'/topBar',
      name:'TopBar',
      component:TopBar,
      meta: {
        title: '导航栏设置 | Coding Life 管理后台',
        description: '自定义网站顶部导航栏的菜单项和显示顺序',
        h1: '导航菜单配置'
      }
    }, {
      path:'/loginPage',
      name:'LoginPage',
      component:LoginPage,
      meta: {
        title: '管理员登录 | Coding Life 管理后台',
        description: 'Coding Life 管理后台登录页面，验证管理员身份',
        h1: '管理员登录'
      }
    }, {
      path:'/timeLine',
      name:'TimeLine',
      component:TimeLine,
      meta: {
        title: '时间轴管理 | Coding Life 管理后台',
        description: '管理网站发展历程时间轴，添加重要里程碑事件',
        h1: '项目历程管理'
      }
    }, {
      path:'/heartfelt',
      name:'Heartfelt',
      component:Heartfelt,
      meta: {
        title: '心情随笔管理 | Coding Life 管理后台',
        description: '管理用户发布的非技术类生活随笔和心情文章',
        h1: '生活随笔管理'
      }
    }, {
      path:'/friendUrlIndex',
      name:'FriendUrlIndex',
      component:FriendUrlIndex,
      meta: {
        title: '友链管理 | Coding Life 管理后台',
        description: '管理友情链接，审核新申请的技术博客链接',
        h1: '友情链接审核'
      }
    }, {
      path:'/messageLeave',
      name:'MessageLeave',
      component:MessageLeave,
      meta: {
        title: '留言管理 | Coding Life 管理后台',
        description: '查看和管理用户留言板内容，回复用户反馈',
        h1: '用户留言管理'
      }
    },{
      path:'/comment',
      name:'Comment',
      component:Comment,
      meta: {
        title: '评论管理 | Coding Life 管理后台',
        description: '审核和管理文章评论，处理不当言论',
        h1: '文章评论审核'
      }
    },{
      path:'/snakeScores',
      name:'SnakeScores',
      component:SnakeScores,
      meta: {
        title: '游戏记录管理 | Coding Life 管理后台',
        description: '查看和管理贪吃蛇游戏高分记录',
        h1: '游戏数据管理'
      }
    },
    {
      path:'/userManage',
      name:'userManage',
      component:userManage,
      meta: {
        title: '用户管理 | Coding Life 管理后台',
        description: '管理注册用户，设置用户权限，处理违规账号',
        h1: '用户账户管理'
      }
    }
  ]
})

router.afterEach((to) => {
  // 1. 动态修改 title
  document.title = to.meta.title || DEFAULT_TITLE

  // 2. 动态修改 description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.content = to.meta.description || DEFAULT_DESCRIPTION
  } else {
    const meta = document.createElement('meta')
    meta.name = 'description'
    meta.content = to.meta.description || DEFAULT_DESCRIPTION
    document.head.appendChild(meta)
  }
})

export default router
