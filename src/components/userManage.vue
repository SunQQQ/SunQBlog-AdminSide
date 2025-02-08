<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px" v-if="userRole == 'master'">
          <el-button type="primary" @click="OpenCreateDialog()" plain>创建账号</el-button>
        </div>

        <el-dialog :title="dailogTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="账号名称" :label-width="formLabelWidth">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="form.role" placeholder="请选择" :disabled="userRole == 'user'" style="width: 100%;">
                <el-option label="普通用户" value="user"></el-option>
                <el-option label="管理员" value="master"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="CloseCreateDialog()">取 消</el-button>
            <el-button type="primary" @click="PostHeartfelt()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="userList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
          <el-table-column prop="name" label="账号名称"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="createdAt" label="创建时间"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button
                @click="UpdateHeartfelt(scope.row.id, scope.row.name, scope.row.password, scope.row.role, scope.row.email)"
                type="text" size="small" class="warning-color">
                编辑
              </el-button>
              <el-button @click="DeleteHeartfelt(scope.row.name)" v-if="userRole == 'master'" type="text" size="small"
                class="danger-color">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userManage",
  data: function () {
    return {
      userList: '',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        id:"",
        username: '',
        password: '',
        role: '',
        email: ''
      },
      userRole: JSON.parse(window.localStorage.getItem("sqBlogUserInfo")).role,
      dailogTitle: '新增账号' // 弹框标题
    }
  },
  methods: {
    // 打开新增弹框
    OpenCreateDialog: function () {
      this.form.id = '';
      this.form.username = '';
      this.form.password = '';
      this.form.role = '';
      this.form.email = '';

      this.dialogFormVisible = true;
    },
    //修改账号
    UpdateHeartfelt: function (Id, username, password, role, email) {
      this.form.id = Id;
      this.form.username = username;
      this.form.password = password;
      this.form.role = role;
      this.form.email = email;

      this.dialogFormVisible = true;
      this.dailogTitle = '编辑账号';
    },
    // 关闭新增弹框
    CloseCreateDialog: function () {
      this.dialogFormVisible = false;
    },
    // 提交数据
    PostHeartfelt: function () {
      var That = this;

      if (this.form.id) {
        // 修改
        this.SQAjax({
          Url: '/api/updateUser',
          RequestData: this.form,
          Success: function () {
            That.GetHeartfeltList();
            That.CloseCreateDialog();
          }
        });
      } else {
        // 新增
        this.SQAjax({
          Url: '/api/register',
          RequestData: this.form,
          Success: function () {
            That.GetHeartfeltList();
            That.CloseCreateDialog();
          }
        });
      }
    },
    // 获取时间轴列表数据
    GetHeartfeltList: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/userList',
        Success: function (data) {
          data.forEach(function (Item, I) {
            Item.createdAt = Item.createdAt ? Item.createdAt.slice(0, 10) : "";
          });
          That.userList = data;
        }
      });
    },
    // 删除账号
    DeleteHeartfelt: function (name) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteByUser',
        RequestData: {
          username: name
        },
        Success: function (data) {
          That.GetHeartfeltList();
        }
      });
    }
  },
  mounted: function () {
    this.GetHeartfeltList();
    this.bus.$emit('Topbar', {
      MenuHighLight: '9'
    });
  }
}
</script>

<style scoped></style>
