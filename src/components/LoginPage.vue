<template>
  <div>
    <div class="loginBac">
      <img src="../assets/img/lognBac.jpg">
    </div>
    <div class="modal-mask">
      <div class="modal-container container-width" @click.stop>
        <div class="login-box">
          <!-- 标题 -->
          <h2 class="login-title">{{ isLoginForm ? 'CodingLife Admin' : 'Regist' }}</h2>

          <!-- 登录表单 -->
          <form v-if="isLoginForm" @submit.prevent="login">
            <div class="form-group">
              <label for="username">账号</label>
              <input type="text" id="username" v-model="username" placeholder="请输入账号" required />
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
            </div>
            <div class="button-content">
              <button type="submit" class="login-button">登录</button>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              还没有账号？
              <span @click="switchToRegister" style="color:blue;cursor: pointer;">
                快捷注册>>
              </span>
            </div>
          </form>

          <!-- 注册表单 -->
          <form v-else @submit.prevent="regist">
            <div class="form-group">
              <label for="username">账号</label>
              <input type="text" id="username" v-model="username" placeholder="请输入账号" required />
              <button type="button" class="generate-button" @click="generateUsername">
                一键生成
              </button>
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input id="password" v-model="password" placeholder="请输入密码" required />
              <button type="button" class="generate-button" @click="generatePassword">
                一键生成
              </button>
            </div>
            <div class="button-content">
              <button type="submit" class="login-button regist-button" @click="generatePassword">
                注册
              </button>
            </div>
            <div style="text-align: center;margin-top: 20px;">
              <span @click="switchToLogin" style="color:blue;cursor: pointer;">
                返回登录>>
              </span>
            </div>
          </form>
        </div>
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
      username: '',
      password: '',
      nameId: 0, // 随机用户名在表中的id
      isLoginForm: true, // 是否显示登录表单
    }
  },
  methods: {
    // 生成随机账号
    generateUsername() {
      let That = this;

      axios.post('/api/getUserName').then(function (data) {
        That.nameId = data?.data?.data?.id;
        That.username = data?.data?.data?.name;
      }).catch(function (error) {
      });
    },
    // 生成随机密码
    generatePassword() {
      const chars = "0123456789";
      let password = "";
      for (let i = 0; i < 4; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length)); // 生成4位随机密码
      }
      this.password = password;
    },
    // 登录
    login() {
      if (this.username && this.password) {
        var That = this;
        var AjaxLoading = Loading.service({ fullscreen: true });
        axios.post('/api/login', {
          username: this.username.replace(/\s/g, ""),
          password: this.password.replace(/\s/g, "")
        }).then(function (response) {
          AjaxLoading.close();
          if (response.data.statusCode == 200) {
            That.$router.push({ name: 'userManage' });
            // 登录成功后，调用菜单组件注册的方法，修改菜单组件的用户名
            That.bus.$emit('changeUser', That.username);

            That.$message({
              message: '登录成功！用户端也是登录状态啦，可以直接去玩~',
              type: 'success',
              duration: 4000
            });
            if (response.data.data.userInfo) {
              // 存储token
              That.SetLocalStorage('SunqBlog', {
                Key: 'token',
                Value: response.data.data.token
              });
              That.SetLocalStorage('SunqBlog', {
                Key: 'userInfo',
                Value: response.data.data.userInfo
              });
            }
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
      } else {
        alert("请输入账号和密码");
      }
    },
    // 注册
    regist() {
      let That = this;

      if (this.username && this.password) {
        axios.post('/api/regist', {
          username: this.username.replace(/\s/g, ""),
          password: this.password.replace(/\s/g, "")
        }).then(function (data) {
          That.$router.push({ name: 'userManage' });

          // 登录成功后，调用菜单组件注册的方法，修改菜单组件的用户名
          That.bus.$emit('changeUser', That.username);

          That.$message({
            message: '注册并登录成功！用户端也是登录状态啦，可以直接去玩~',
            type: 'success',
            duration: 4000
          });
          // 存储token
          That.SetLocalStorage('SunqBlog', {
            Key: 'token',
            Value: data?.data?.data?.token
          });
          That.SetLocalStorage('SunqBlog', {
            Key: 'userInfo',
            Value: data?.data?.data?.userInfo
          });

          if (That.nameId > 0) {
            // 删除已经使用的随机用户名
            That.SQFrontAjax({
              Url: "/api/markNameAsUsed",
              UploadData: {
                id: That.nameId
              },
              Success: function (data) {
                console.log('删除已经使用的随机用户名');
              }
            });
          }
        }).catch(function (error) {
        });
      } else {
        alert("请输入账号和密码");
      }
    },
    // 切换到注册表单
    switchToRegister() {
      this.isLoginForm = false;
    },
    // 切换到登录表单
    switchToLogin() {
      this.isLoginForm = true;
    },
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

/* 遮罩层 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 登录框容器 */
.modal-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  max-width: 400px;
}

/* 登录框 */
.login-box {
  position: relative;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: -30px;
  right: -10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #333;
}

/* 其他样式保持不变 */
.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  background-color: white !important;
}

.form-group input:focus {
  border-color: #007bff;
}

.button-content {
  display: flex;
  justify-content: space-around;
}

.login-button {
  width: 50%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.regist-button {
  background-color: #28a745;
}

.register-color {
  background-color: #f56c6c;
}

.login-button:hover {
  background-color: #0056b3;
}

/* 输入框和按钮的容器 */
.input-with-button {
  display: flex;
  align-items: center;
}

/* 输入框 */
.input-with-button input {
  flex: 1;
  margin-right: 0.5rem;
  /* 输入框和按钮之间的间距 */
}

/* 生成按钮 */
.generate-button {
  font-size: 0.9rem;
  cursor: pointer;
  position: absolute;
  width: 100px;
  right: 2px;
  border: none;
  color: #01aaed;
  top: 40px;
  background-color: white;
}
</style>
