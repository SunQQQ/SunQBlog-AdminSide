<template>
  <header v-if="TopbarShow == true">
    <nav class="TopBar" aria-label="顶部导航栏">
      <div class="topbac">
        <img src="../assets/img/topbar.png" alt="topbar background">
      </div>
      <div class="Logo">码语人生</div>
      <div class="TopBarRight">
        <div class="home-link">
          <a href="https://codinglife.online" target="_blank">
            <i class="iconfont icon-shouye"></i> 用户端入口
          </a>
        </div>
        <div class="home-link">
          <a href="https://github.com/SunQQQ/SunQBlog-AdminSide" target="_blank">
            <i class="iconfont icon-github"></i> 管理端源码
          </a>
        </div>
        <div class="home-link">
          <a href="https://codinglife.online/snake/" target="_blank">
            <i class="iconfont icon-she"></i> 贪吃蛇入口
          </a>
        </div>
        <div class="placeHolder"></div>
        <div class="PersonCenter">
          <div class="PersonCenterName" @click="OpenUserCenter()">
            {{ userName }} <i class="el-icon-caret-bottom"></i>
          </div>
          <div class="PersonCenterItem" v-if="ShowExit == 1" @click="Exit()">
            退出
          </div>
        </div>
      </div>

      <div class="MenuTopBarIcon" @click="OpenMenu()">
        <div class="MobileMenuSwitch">
          <span :class="menuStatus
            ? 'MenuButtonFirstGoOpen'
            : 'MenuButtonFirstGoClose'
            "></span>
          <span :class="menuStatus
            ? 'MenuButtonSecondGoOpen'
            : 'MenuButtonSecondGoClose'
            "></span>
          <span :class="menuStatus
            ? 'MenuButtonThirdGoOpen'
            : 'MenuButtonThirdGoClose'
            "></span>
        </div>
      </div>
    </nav>

    <div style="height: 61px"></div>

    <nav aria-label="左侧导航栏">
      <el-menu :default-active="MenuHighLight" class="LeftBar" background-color="#f6f8fc" text-color="#303133"
        active-text-color="#004eef" active-background-color="#d9e1f1" v-if="menuStatus">
        <el-menu-item index="9" @click="ChangeHighLight('userManage')">
          <i class="iconfont icon-shujutongji"></i>
          <span slot="title">我的账号</span>
        </el-menu-item>
        <!-- <el-menu-item index="0" @click="ChangeHighLight('index')">
        <i class="iconfont icon-shujutongji"></i>
        <span slot="title">访问数据</span>
      </el-menu-item> -->
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont icon-16"></i>
            <span>我的文章</span>
          </template>
          <el-menu-item index="1-1" @click="ChangeHighLight('Article')">
            <i class="iconfont icon-16"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="1-2" @click="ChangeHighLight('WriteArticle')">
            <i class="iconfont icon-16"></i>
            <span slot="title">新增/编辑文章</span>
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="6" @click="ChangeHighLight('MessageLeave')">
          <i class="iconfont icon-liuyan"></i>
          <span slot="title">我的留言</span>
        </el-menu-item>

        <el-menu-item index="7" @click="ChangeHighLight('Comment')">
          <i class="iconfont icon-pinglun"></i>
          <span slot="title">我的评论</span>
        </el-menu-item>

        <el-menu-item index="2" @click="ChangeHighLight('TagIndex')">
          <i class="iconfont icon-biaoqian_o"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>

        <el-menu-item index="3" @click="ChangeHighLight('TimeLine')">
          <i class="iconfont icon-fuhao-shijianzhou"></i>
          <span slot="title">时间轴管理</span>
        </el-menu-item>

        <el-menu-item index="4" @click="ChangeHighLight('Heartfelt')">
          <i class="iconfont icon-heart"></i>
          <span slot="title">我的心声</span>
        </el-menu-item>

        <el-menu-item index="5" @click="ChangeHighLight('FriendUrlIndex')">
          <i class="iconfont icon-lianjie"></i>
          <span slot="title">我的朋友圈</span>
        </el-menu-item>

        <el-menu-item index="8" @click="ChangeHighLight('SnakeScores')">
          <i class="iconfont icon-she"></i>
          <span slot="title">贪吃蛇榜单</span>
        </el-menu-item>

        <div class="mobileExit">
          <el-menu-item index="10" @click="switchPage('gitHub')">
            <i class="iconfont icon-github"></i>
            <span slot="title">源码入口</span>
          </el-menu-item>
        </div>

        <div class="mobileExit">
          <el-menu-item index="11" @click="switchPage('userClient')">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">用户端入口</span>
          </el-menu-item>
        </div>

        <div class="mobileExit">
          <el-menu-item index="11" @click="Exit()">
            <i class="iconfont icon-heart"></i>
            <span slot="title">切换账号</span>
          </el-menu-item>
        </div>

      </el-menu>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TopBar",
  data: function () {
    return {
      // 个人中心显隐
      ShowExit: -1,
      // 菜单高亮参数
      MenuHighLight: "0",
      userName: "加载中",
      topBarStyle: {
        background: 'url("../assets/img/topbar.png") no-repeat 50%'
      },
      menuStatus: window.screen.width > 768 ? true : false // pc端时菜单初始化展示，移动端初始化时隐藏
    };
  },
  // 这个参数是父子组件间传值
  props: ["TopbarShow"],
  methods: {
    ChangeHighLight: function (Page) {
      this.OpenMenu();
      this.$router.push({
        name: Page,
      });
    },
    OpenUserCenter: function () {
      this.ShowExit = this.ShowExit * -1;
    },
    Exit: function () {
      localStorage.clear();
      this.ShowExit = -1;
      this.$router.push({ name: "LoginPage" });
      this.menuStatus = window.screen.width > 768 ? this.menuStatus : !this.menuStatus;
    },
    // 展示或隐藏菜单
    OpenMenu: function () {
      this.menuStatus = window.screen.width > 768 ? this.menuStatus : !this.menuStatus;
    },
    // 打开新的页面
    switchPage: function (page) {
      if (page == 'userClient') {
        window.open("https://codinglife.online/");
      } else if (page == 'gitHub') {
        window.open("https://github.com/SunQQQ/SunQBlog-AdminSide");
      }
    }
  },
  mounted: function () {
    var That = this;

    // 切换路由后，各组件会修改菜单高亮。这个参数是平级组件间传值
    this.bus.$on("Topbar", function (data) {
      That.MenuHighLight = data.MenuHighLight;
    });
    // 初始化菜单时，从localstorage中获取用户名
    if (That.GetLocalStorage('SunqBlog')?.userInfo) {
      That.userName = That.GetLocalStorage('SunqBlog')?.userInfo?.name ?? ''
    }

    // 注册修改用户名方法，登录成功时登录组件会通过这个方法修改用户名
    this.bus.$on("changeUser", function (user) {
      That.userName = user;
    });

    // 点击用户名以外区域关闭用户名弹窗
    document.addEventListener("click", function (e) {
      if (
        !document
          .getElementsByClassName("PersonCenterName")[0]
        &&
        !document
          .getElementsByClassName("PersonCenterName")[0]
          .contains(e.target)
      ) {
        That.ShowExit = -1;
      }
    });
  },
};
</script>

<style scoped lang="less">
@import "../assets/css/base.less";

.home-link {
  text-align: left;
  width: 100px;
  margin-left: 20px;
  font-weight: 500;
  font-size: 15px;
}

.home-link a {
  cursor: pointer;
  color: white;
  text-decoration: none;
}

.home-link a:hover {
  color: #409eff;
}

// PC端
@media only screen and (min-device-width: 768px) {
  .LeftBar {
    width: 220px;
    position: fixed;
    bottom: 0;
    top: 61px;
    border-right: 1px solid #dadeeb !important;
  }

  .TopBar {
    .myflex("middle");
    height: 61px;
    line-height: 61px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .is-active {
    background-color: #d9e1f1 !important;
  }

  .topbac {
    position: absolute;
    z-index: -1;
    height: 61px;
    width: 100%;
  }

  .topbac img {
    width: 100%;
    height: 100%;
  }

  .Logo {
    // background-color: rgb(84, 92, 100);
    width: 220px;
    color: white;
    text-align: center;
    font-weight: bolder;
  }

  .TopBarRight {
    flex: 1;
    text-align: right;
    padding-right: 40px;
    // border-bottom: 1px solid #ebeef5;
    // background-color: hsla(0, 0%, 100%, 0.9);
    display: flex;
  }

  .MenuTopBarIcon {
    display: none;
  }

  .mobileExit {
    display: none;
  }
}

// 移动端
@media only screen and (max-device-width: 768px) {
  .LeftBar {
    width: 100%;
    position: fixed;
    top: 61px;
    z-index: 10000;
    border-top: 1px solid @BorderColor;
  }

  .TopBar {
    .myflex("middle");
    height: 61px;
    line-height: 61px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    background-color: @menu_color;
    border-bottom: 1px solid @BorderColor;
  }

  .Logo {
    // width: 220px;
    color: @fore_color;
    text-align: center;
    padding: 0 20px;
  }

  .topbac {
    position: absolute;
    z-index: -1;
    height: 61px;
    width: 100%;
  }

  .topbac img {
    width: 100%;
    height: 100%;
  }

  .TopBarRight {
    display: none;
  }

  .MenuTopBarIcon {
    text-align: right;
    margin-right: 1rem;
    flex: 1;
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .mobileExit {
    display: block;
  }
}

.PersonCenter {
  display: inline-block;
  width: 9rem;
  right: 0;
  text-align: center;
  color: white;
}

.placeHolder {
  flex: 1;
}

.PersonCenterName {
  cursor: pointer;
}

.PersonCenterItem {
  width: 8rem;
  height: 50px;
  line-height: 50px;
  border: 1px solid @BorderColor;
  background-color: white;
  box-shadow: 0 2px 12px 0 #0000001a;
  cursor: pointer;
  color: #303133;
}

.MobileMenuSwitch {
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  margin-left: auto;
}

.MobileMenuSwitch span {
  display: block;
  width: 20px;
  height: 2px;
  background: @fore_color;

  margin: 0 auto 5px;
  position: relative;
  border-radius: 3px;
}

/*给移动端菜单按钮，第一个横杠设置动画*/
.MenuButtonFirstGoOpen {
  animation: MenuButtonGoOpen 0.3s linear;
  animation-fill-mode: forwards;
}

.MenuButtonFirstGoClose {
  animation: MenuButtonGoClose 0.3s linear;
  animation-fill-mode: forwards;
}

@keyframes MenuButtonGoOpen {
  0% {
    -ms-transform: rotate(-8deg);
    /* IE 9 */
    transform: rotate(-8deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  25% {
    -ms-transform: rotate(-16deg);
    /* IE 9 */
    transform: rotate(-16deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  50% {
    -ms-transform: rotate(-25deg);
    /* IE 9 */
    transform: rotate(-25deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  75% {
    -ms-transform: rotate(-34deg);
    /* IE 9 */
    transform: rotate(-34deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  100% {
    -ms-transform: rotate(-43deg);
    /* IE 9 */
    transform: rotate(-43deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }
}

@keyframes MenuButtonGoClose {
  0% {
    -ms-transform: rotate(-43deg);
    /* IE 9 */
    transform: rotate(-43deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  25% {
    -ms-transform: rotate(-34deg);
    /* IE 9 */
    transform: rotate(-34deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  50% {
    -ms-transform: rotate(-25deg);
    /* IE 9 */
    transform: rotate(-25deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  75% {
    -ms-transform: rotate(-16deg);
    /* IE 9 */
    transform: rotate(-16deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  100% {
    -ms-transform: rotate(0deg);
    /* IE 9 */
    transform: rotate(0deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }
}

.MenuButtonSecondGoOpen {
  opacity: 0;
}

.MenuButtonSecondGoClose {
  -webkit-animation: MenutionGoCloseSeFloor 0.5s linear;
  -o-animation: MenutionGoCloseSeFloor 0.5s linear;
  animation: MenutionGoCloseSeFloor 0.5s linear;
  animation-fill-mode: forwards;
}

@keyframes MenutionGoCloseSeFloor {
  0% {
    /*background: white;*/
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/*给移动端菜单按钮，第3个横杠设置动画*/
.MenuButtonThirdGoOpen {
  animation: MenuButtonGoOpenThFloor 0.3s linear;
  animation-fill-mode: forwards;
}

.MenuButtonThirdGoClose {
  animation: MenuButtonGoCloseThFloor 0.3s linear;
  animation-fill-mode: forwards;
}

@keyframes MenuButtonGoOpenThFloor {
  0% {
    -ms-transform: rotate(8deg);
    /* IE 9 */
    transform: rotate(8deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  25% {
    -ms-transform: rotate(16deg);
    /* IE 9 */
    transform: rotate(16deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  50% {
    -ms-transform: rotate(25deg);
    /* IE 9 */
    transform: rotate(25deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  75% {
    -ms-transform: rotate(34deg);
    /* IE 9 */
    transform: rotate(34deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  100% {
    -ms-transform: rotate(43deg);
    /* IE 9 */
    transform: rotate(43deg);
    -moz-transform-origin: top right;
    -webkit-transform-origin: top right;
    -o-transform-origin: top right;
  }
}

@keyframes MenuButtonGoCloseThFloor {
  0% {
    -ms-transform: rotate(43deg);
    /* IE 9 */
    transform: rotate(43deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  25% {
    -ms-transform: rotate(34deg);
    /* IE 9 */
    transform: rotate(34deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  50% {
    -ms-transform: rotate(25deg);
    /* IE 9 */
    transform: rotate(25deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  75% {
    -ms-transform: rotate(16deg);
    /* IE 9 */
    transform: rotate(16deg);
    -moz-transform-origin: 100% 100%;
    -webkit-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
  }

  100% {
    -ms-transform: rotate(0deg);
    /* IE 9 */
    transform: rotate(0deg);
    -moz-transform-origin: top right;
    -webkit-transform-origin: top right;
    -o-transform-origin: top right;
  }
}
</style>
