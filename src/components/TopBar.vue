<template>
  <div v-if="TopbarShow == true">
    <div class="TopBar">
      <div class="Logo">Sunq's Blog Admin</div>
      <div class="TopBarRight">
        <div class="PersonCenter">
          <div class="PersonCenterName" @click="OpenUserCenter()">{{userName}}  <i class="el-icon-caret-bottom"></i></div>
          <div class="PersonCenterItem" v-if="ShowExit == 1" @click="Exit()">退出</div>
        </div>
      </div>
    </div>

    <div style="height: 61px"></div>

    <el-menu :default-active="MenuHighLight" class="LeftBar" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="0" @click="ChangeHighLight('index')">
        <i class="el-icon-document"></i>
        <span slot="title">访问数据</span>
      </el-menu-item>
      <el-menu-item index="1" @click="ChangeHighLight('Article')">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
      </el-menu-item>

      <el-menu-item index="2"  @click="ChangeHighLight('TagIndex')">
        <i class="el-icon-star-off"></i>
        <span slot="title">分类管理</span>
      </el-menu-item>

      <el-menu-item index="3"  @click="ChangeHighLight('TimeLine')">
        <i class="el-icon-date"></i>
        <span slot="title">时间轴管理</span>
      </el-menu-item>

      <el-menu-item index="4"  @click="ChangeHighLight('Heartfelt')">
        <i class="el-icon-view"></i>
        <span slot="title">心声管理</span>
      </el-menu-item>

      <el-menu-item index="5"  @click="ChangeHighLight('FriendUrlIndex')">
        <i class="el-icon-share"></i>
        <span slot="title">友链管理</span>
      </el-menu-item>

      <el-menu-item index="6"  @click="ChangeHighLight('MessageLeave')">
        <i class="el-icon-star-off"></i>
        <span slot="title">留言管理</span>
      </el-menu-item>

      <el-menu-item index="7"  @click="ChangeHighLight('Comment')">
        <i class="el-icon-view"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>

      <el-menu-item index="8"  @click="ChangeHighLight('SnakeScores')">
        <i class="el-icon-view"></i>
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
      // 这个参数是平级组件间传值
      this.bus.$on('Topbar',function (data) {
        That.MenuHighLight = data.MenuHighLight;
      });
      That.userName = window.localStorage.getItem("SQBlogUser");
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

  .PersonCenterName{
    cursor:pointer;
  }

  .PersonCenterItem{
    width: 9rem;
    height: 50px;
    line-height: 50px;
    border:1px solid @BorderColor;
  }

</style>
