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
      /*如果有token则加载首页，如果没有则加载登录页*/
      var UserData = window.localStorage.getItem("SQBlog");
      if (!UserData) {
        this.$router.push({
          name: 'LoginPage',
        });
        this.TopbarShow = false;
      }
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

</style>

