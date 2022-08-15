<template>
  <div class="LoginContent">
    <el-form ref="form" :model="form" label-width="60px">
      <div style="text-align: center"><h2>sunq's blog 管理后台</h2></div>
      <el-form-item label="账号">
        <el-input v-model="form.CnName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.PassWord"></el-input>
      </el-form-item>
      <div style="text-align: center">
        <el-button type="primary" @click="OnLogin()">登录</el-button>
        <!--<el-button type="primary" @click="OnRegist()">注册</el-button>-->
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import {Loading} from 'element-ui'

export default {
  name: "LoginPage",
  data: function () {
    return {
      form: {
        CnName: '大佬你好',
        PassWord: 'Github求个赞'
      }
    }
  },
  methods: {
    OnLogin: function () {
      var That = this;
      var AjaxLoading = Loading.service({fullscreen: true});
      axios.post('/api/UserReadOne', {
        CnName: this.form.CnName,
        PassWord: this.form.PassWord,
        UserType: 'Admin'
      }).then(function (response) {
        AjaxLoading.close();
        if (response.data.status == '0') {
          That.$message({
            message: '登录成功',
            type: 'success'
          });
          window.localStorage.setItem("SQBlog", JSON.stringify(response.data.data));
          window.localStorage.setItem("SQBlogUser", That.form.CnName);
          That.$router.push({name: 'Article'});

          // 登录成功后，调用菜单组件注册的方法，修改菜单组件的用户名
          That.bus.$emit('changeUser', That.form.CnName);
        } else if (response.data.status == '1') {
          That.$message.error('账号或密码错误');
        }
      }).catch(function (error) {
      });
    },
    OnRegist: function () {
      var That = this;
      axios.post('/api/UserCreate', {
        CnName: this.form.CnName,
        PassWord: this.form.PassWord,
        UserType: 'Admin'
      }).then(function (response) {
        if (response.data.status == '200') {
          That.$message({
            message: '注册成功',
            type: 'success'
          });
        }
      }).catch(function (error) {
      });
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/css/base.less";

@media only screen and (max-device-width: 768px) {
  .LoginContent {
    padding: 0 20px;
    margin: 12rem auto 0;
  }
}
@media only screen and (min-device-width: 768px) {
  .LoginContent {
    width: 600px;
    margin: 12rem auto 0;
  }
}
</style>
