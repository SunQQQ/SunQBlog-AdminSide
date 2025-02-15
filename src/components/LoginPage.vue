<template>
  <div>
    <div class="loginBac">
      <img src="../assets/img/lognBac.jpg">
    </div>
    <div class="login-container">
      <div class="LoginContent">
        <el-form ref="form" :model="form" label-width="60px">
          <div label-class="white-label" style="text-align: center;color: #14213e;">
            <h2>sunq's blog 管理后台</h2>
          </div>
          <div style="text-align: center;color:#409EFF">
            <h4>（后台对外开发，可直接登录）</h4>
          </div>
          <el-form-item label="账号">
            <el-input v-model="form.CnName" @keydown.enter.native="OnLogin()"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.PassWord" type="password" show-password=true
              @keydown.enter.native="OnLogin()"></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button type="primary" @click="OnLogin()">登录</el-button>
            <!--<el-button type="primary" @click="OnRegist()">注册</el-button>-->
          </div>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import { Loading } from 'element-ui'

export default {
  name: "LoginPage",
  data: () => {
    return {
      form: {
        CnName: 'sunq',
        PassWord: '1qaz!QAZ'
      }
    }
  },
  methods: {
    OnLogin: function () {
      var That = this;
      var AjaxLoading = Loading.service({ fullscreen: true });
      axios.post('/api/login', {
        username: this.form.CnName.replace(/\s/g, ""),
        password: this.form.PassWord.replace(/\s/g, "")
      }).then(function (response) {
        AjaxLoading.close();
        if (response.data.statusCode == 200) {
          That.$message({
            message: '登录成功',
            type: 'success',
            duration: 800
          });
          if (response.data.data.userInfo) {
            window.localStorage.setItem("sqBlogUserInfo", JSON.stringify(response.data.data.userInfo));
            window.localStorage.setItem("sqBlogToken", response.data.data.token);
          }
          That.$router.push({ name: 'userManage' });

          // 记录日志
          // That.createLog({
          //   moduleType: 'button',
          //   operateType: '登录后台',
          //   operateContent: '成功'
          // });

          // 登录成功后，调用菜单组件注册的方法，修改菜单组件的用户名
          That.bus.$emit('changeUser', That.form.CnName);
        } else {
          That.$message.error(response.data.message);

          // 记录日志
          // That.createLog({
          //   moduleType: 'button',
          //   operateType: '登录后台',
          //   operateContent: '失败'
          // });
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
        if (response.data.statusCode == '200') {
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

// /deep/ .el-form-item__label {
//   color: #fff !important;
// }

@media only screen and (min-device-width: 768px) {
  .loginBac {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .loginBac img {
    width: 100%;
    height: 100%;
  }
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .LoginContent {
    width: 400px;
    background-color: white;
    padding: 30px 30px 20px 10px;
    border-radius: 5px;
  }
}
</style>
