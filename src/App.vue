<template>
  <div id="apps" class="PageContainer">
    <TopBar :TopbarShow='TopbarShow'></TopBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'

  export default {
    name: 'app',

    data:function(){
      return{
        TopbarShow:true
      }
    },
    mounted: function () {
      // SQAjax方法体内，会取本地token，如果没有直接路由到登录页；如果有token，路由会打开首页。
      // 且如果返回失败会路由到登录页，如果返回成功不做操作，路由还是正常展示首页不变
      // this.SQAjax({
      //   Url:'/api/checkToken', // 此接口非真实接口，只为校验token
      //   Success:function (data) {}
      // });
    },
    /*监听每次路由变化，如果是登录页则隐藏导航栏*/
    watch:{
      $route: {
        handler: function(val, oldVal){
          if(this.$route.path == '/LoginPage'){
            this.TopbarShow = false;
          }else{
            this.TopbarShow = true;
          }
        },
        // 深度观察监听
        deep: true
      }
    },
    components: {
      TopBar: TopBar
    }
  }

</script>

<style>
  .el-loading-mask{
    width: 100px;
    height: 100px;
    margin: 250px auto 0;
  }
  .el-loading-spinner i, .el-loading-spinner .el-loading-text{
    color:white
  }
</style>

