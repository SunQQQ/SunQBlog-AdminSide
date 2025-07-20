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

const DEFAULT_TITLE = '管理后台 | 码语人生技术社区 - CodingLife Online Admin';
const DEFAULT_DESCRIPTION = '码语人生管理后台是开发者技术人文社区的中枢系统，支持Markdown写作、内容审核、用户权限管理等功能。助力开发者高效管理技术博客与生活随笔，让代码与人文共生共长。';
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
        title: '管理后台 | 码语人生技术社区 - CodingLife Online Admin',
        description: '码语人生管理后台是开发者技术人文社区的中枢系统，支持Markdown写作、内容审核、用户权限管理等功能。助力开发者高效管理技术博客与生活随笔，让代码与人文共生共长。',
        h1: '后台数据总览'
      }
    }, {
      path: '/article',
      name: 'Article',
      component: Article,
      meta: {
        title: '文章管理 | 技术内容审核 | 码语人生',
        description: '管理社区技术博客与生活随笔，支持批量操作、分类筛选及内容质量把控。',
        h1: '文章内容管理'
      }
    }, {
      path: '/articleDetail',
      name: 'ArticleDetail',
      component: ArticleDetail,
      meta: {
        title: '文章详情 | 深度编辑 | 码语人生',
        description: '查看并优化文章细节，调整Markdown格式、标签与可见性设置。',
        h1: '文章精细化编辑'
      }
    }, {
      path: '/writeArticle',
      name: 'WriteArticle',
      component: WriteArticle,
      meta: {
        title: '创作新文章 | Markdown编辑器 | 码语人生',
        description: '通过沉浸式编辑器撰写技术博客或生活随笔，支持实时预览与草稿保存。',
        h1: '创作新内容'
      }
    }, {
      path: '/tagIndex',
      name: 'TagIndex',
      component: TagIndex,
      meta: {
        title: '标签管理 | 内容分类优化 | 码语人生',
        description: '维护标签体系，合并重复标签，提升技术文章检索效率。',
        h1: '标签分类管理'
      }
    }, {
      path: '/topBar',
      name: 'TopBar',
      component: TopBar,
      meta: {
        title: '导航配置 | 菜单结构设计 | 码语人生',
        description: '自定义网站导航栏结构与跳转逻辑，优化用户浏览路径。',
        h1: '导航菜单管理'
      }
    }, {
      path: '/loginPage',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        title: '管理员登录 | 身份验证 | 码语人生',
        description: '安全登录入口，保障社区管理后台的权限管控。',
        h1: '管理员身份认证'
      }
    }, {
      path: '/timeLine',
      name: 'TimeLine',
      component: TimeLine,
      meta: {
        title: '历程管理 | 里程碑事件 | 码语人生',
        description: '记录技术社区的重大更新与版本迭代，展现发展轨迹。',
        h1: '项目历程维护'
      }
    }, {
      path: '/heartfelt',
      name: 'Heartfelt',
      component: Heartfelt,
      meta: {
        title: '随笔管理 | 生活化内容 | 码语人生',
        description: '审核用户分享的非技术类生活感悟，保持内容多样性。',
        h1: '生活随笔审核'
      }
    }, {
      path: '/friendUrlIndex',
      name: 'FriendUrlIndex',
      component: FriendUrlIndex,
      meta: {
        title: '友链管理 | 技术资源合作 | 码语人生',
        description: '审核与维护友情链接，筛选优质技术博客与开源项目。',
        h1: '友链质量把控'
      }
    }, {
      path: '/messageLeave',
      name: 'MessageLeave',
      component: MessageLeave,
      meta: {
        title: '留言管理 | 用户反馈处理 | 码语人生',
        description: '查看并回复社区留言，构建开发者间的良性互动。',
        h1: '用户留言处理'
      }
    }, {
      path: '/comment',
      name: 'Comment',
      component: Comment,
      meta: {
        title: '评论审核 | 内容风控 | 码语人生',
        description: '过滤不当言论，维护技术讨论区的专业性与友好度。',
        h1: '文章评论风控'
      }
    }, {
      path: '/snakeScores',
      name: 'SnakeScores',
      component: SnakeScores,
      meta: {
        title: '游戏数据 | 贪吃蛇记录 | 码语人生',
        description: '管理社区内置小游戏的高分榜单，增强用户互动乐趣。',
        h1: '游戏记录归档'
      }
    }, {
      path: '/userManage',
      name: 'userManage',
      component: userManage,
      meta: {
        title: '用户管理 | 权限分配 | 码语人生',
        description: '管理注册开发者账号，设置角色权限与封禁违规用户。',
        h1: '用户权限管理'
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
