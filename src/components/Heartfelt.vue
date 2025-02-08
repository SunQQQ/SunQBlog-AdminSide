<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OpenCreateDialog()" plain>新增心声</el-button>
        </div>

        <el-dialog title="新增心声" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="心声内容" :label-width="formLabelWidth">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="心声作者" :label-width="formLabelWidth">
              <el-input v-model="form.writer"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="CloseCreateDialog()">取 消</el-button>
            <el-button type="primary" @click="PostHeartfelt()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="TimeLineList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
          <el-table-column prop="content" label="心声内容"></el-table-column>
          <el-table-column prop="writer" label="心声作者"></el-table-column>
          <el-table-column prop="creater" label="创建人" v-if="role == 'master'"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="UpdateHeartfelt(scope.row.id, scope.row.content, scope.row.writer)"
                type="text" size="small" class="warning-color">编辑</el-button>
              <el-button @click="DeleteHeartfelt(scope.row.id)" type="text" size="small"
                class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  data: function () {
    return {
      TimeLineList: '',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {
        id: "",
        content: '',
        writer: ''
      },
      role: JSON.parse(window.localStorage.getItem("sqBlogUserInfo")).role
    }
  },
  methods: {
    // 打开新增弹框
    OpenCreateDialog: function () {
      this.form.id = '';
      this.form.content = '';
      this.form.writer = '';

      this.dialogFormVisible = true;
    },
    // 关闭新增弹框
    CloseCreateDialog: function () {
      this.dialogFormVisible = false;
    },
    // 提交数据
    PostHeartfelt: function () {
      var That = this;

      if (this.form.id) {
        this.SQAjax({
          Url: '/api/editHeartfelt',
          RequestData: this.form,
          Success: function () {
            That.GetHeartfeltList();
            That.CloseCreateDialog();
          }
        });
      } else {
        if (this.form.content) {
          this.SQAjax({
            Url: '/api/createHeartfelt',
            RequestData: this.form,
            Success: function () {
              That.GetHeartfeltList();
              That.CloseCreateDialog();
            }
          });
        }
      }
    },
    //修改心声
    UpdateHeartfelt: function (Id, content, writer) {
      this.form.id = Id;
      this.form.content = content;
      this.form.writer = writer;

      this.dialogFormVisible = true;
    },
    // 获取时间轴列表数据
    GetHeartfeltList: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/heartfeltList',
        Success: function (data) {
          data.forEach(function (Item, I) {
            Item.create_time = Item.create_time.slice(0, 10);
          });
          That.TimeLineList = data;
        }
      });
    },
    // 删除心声
    DeleteHeartfelt: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteHeartFelt',
        RequestData: {
          id: Id
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
      MenuHighLight: '4'
    });
  }
}
</script>

<style scoped></style>
