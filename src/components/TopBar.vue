<template>
  <div v-if="TopbarShow == true">
    <div class="TopBar">
      <div class="Logo">Sunq's Blog Admin</div>
      <div class="TopBarRight">
        <div class="home-link">
          <a href="http://39.104.22.73:67" target="_blank">
            <i class="iconfont icon-shouye"></i> 用户端入口
          </a>
        </div>
        <div class="home-link">
          <a href="https://github.com/SunQQQ/SunQBlog-AdminSide" target="_blank">
            <i class="iconfont icon-github"></i> 管理端源码
          </a>
        </div>
        <div class="home-link">
          <a href="http://39.104.22.73:70" target="_blank">
            <i class="iconfont icon-she"></i> 贪吃蛇入口
          </a>
        </div>
        <div class="placeHolder"></div>
        <div class="PersonCenter">
          <div class="PersonCenterName" @click="OpenUserCenter()">{{userName}}  <i class="el-icon-caret-bottom"></i></div>
          <div class="PersonCenterItem" v-if="ShowExit == 1" @click="Exit()">退出</div>
        </div>
      </div>
    </div>

    <div style="height: 61px"></div>

    <el-menu :default-active="MenuHighLight" class="LeftBar" background-color="#545c64" text-color="#fff" active-text-color="#409EFF">
      <el-menu-item index="0" @click="ChangeHighLight('index')">
        <i class="iconfont icon-shujutongji"></i>
        <span slot="title">访问数据</span>
      </el-menu-item>
      <el-menu-item index="1" @click="ChangeHighLight('Article')">
        <i class="iconfont icon-16"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>

      <el-menu-item index="2"  @click="ChangeHighLight('TagIndex')">
        <i class="iconfont icon-biaoqian_o"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>

      <el-menu-item index="3"  @click="ChangeHighLight('TimeLine')">
        <i class="iconfont icon-fuhao-shijianzhou"></i>
        <span slot="title">时间轴管理</span>
      </el-menu-item>

      <el-menu-item index="4"  @click="ChangeHighLight('Heartfelt')">
        <i class="iconfont icon-heart"></i>
        <span slot="title">心声管理</span>
      </el-menu-item>

      <el-menu-item index="5"  @click="ChangeHighLight('FriendUrlIndex')">
        <i class="iconfont icon-lianjie"></i>
        <span slot="title">友链管理</span>
      </el-menu-item>

      <el-menu-item index="6"  @click="ChangeHighLight('MessageLeave')">
        <i class="iconfont icon-liuyan"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>

      <el-menu-item index="7"  @click="ChangeHighLight('Comment')">
        <i class="iconfont icon-pinglun"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>

      <el-menu-item index="8"  @click="ChangeHighLight('SnakeScores')">
        <i class="iconfont icon-she"></i>
        <span slot="title">贪吃蛇榜单</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "TopBar",
    data: function () {
      return {
        // 个人中心显隐
        ShowExit:-1,
        // 菜单高亮参数
        MenuHighLight:'0',
        userName:'加载中'
      }
    },
    // 这个参数是父子组件间传值
    props:['TopbarShow'],
    methods: {
      ChangeHighLight: function (Page) {
        this.$router.push({
          name: Page,
        });
      },
      OpenUserCenter:function () {
        this.ShowExit = this.ShowExit * -1;
      },
      Exit:function () {
        localStorage.clear();
        this.ShowExit = -1;
        this.$router.push({name:'LoginPage'});
      }
    },
    mounted:function () {
      var That = this;

      // 切换路由后，各组件会修改菜单高亮。这个参数是平级组件间传值
      this.bus.$on('Topbar',function (data) {
        That.MenuHighLight = data.MenuHighLight;
      });

      // 初始化菜单时，从localstorage中获取用户名
      if(window.localStorage.getItem("SQBlogUser")){
        That.userName = window.localStorage.getItem("SQBlogUser");
      }

      // 注册修改用户名方法，登录成功时登录组件会通过这个方法修改用户名
      this.bus.$on('changeUser',function (user) {
        That.userName = user;
      });

      // 点击用户名以外区域关闭用户名弹窗
      document.addEventListener('click',function(e){
        if(!document.getElementsByClassName('PersonCenterName')[0].contains(e.target)){
          That.ShowExit = -1;
        }
      });
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/base.less";
  .TopBar{
    .myflex('middle');
    height: 61px;
    line-height: 61px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .Logo {
    background-color: rgb(84, 92, 100);
    width: 220px;
    color: white;
    text-align: center;
  }

  .TopBarRight{
    flex: 1;
    text-align: right;
    padding-right: 40px;
    border-bottom: 1px solid #ebeef5;
    background-color: hsla(0,0%,100%,.9);
    display: flex;
  }

  .home-link{
    text-align: left;
    width: 100px;
    margin-left: 20px;
    font-weight: 500;
    font-size: 15px;
  }

  .home-link a{
    cursor: pointer;
    color: #666;
    text-decoration: none;
  }

  .home-link a:hover{
    color: #409EFF;
  }

  .LeftBar{
    width: 220px;
    position: fixed;
    bottom: 0;
    top: 61px;
  }

  .PersonCenter{
    display: inline-block;
    width: 9rem;
    right: 0;
    text-align: center;
  }

  .placeHolder{
    flex: 1;
  }
  .PersonCenterName{
    cursor:pointer;
  }

  .PersonCenterItem{
    width: 8rem;
    height: 50px;
    line-height: 50px;
    border:1px solid @BorderColor;
    background-color: white;
    box-shadow: 0 2px 12px 0 #0000001a;
    cursor:pointer;
  }

</style>
