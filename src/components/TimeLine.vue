<template>
  <main class="RightContent">
    <h1 class="mainTitle">{{ $route.meta.h1 }}</h1>
    <div class="ArticleList">
      <div style="margin-bottom:10px">
        <el-button type="primary" @click="OpenCreateDialog()" plain>新增</el-button>
      </div>

      <el-dialog :title=dialogTitle :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="事件内容" :label-width="formLabelWidth">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
          <el-form-item label="事件日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.contentDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
              placeholder="事件日期" style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CloseCreateDialog()">取 消</el-button>
          <el-button type="primary" @click="PostTimeLineData()">确 定</el-button>
        </div>
      </el-dialog>

      <!--表格操作栏-->
      <el-table :data="TimeLineList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
        <el-table-column prop="content" label="事件内容"></el-table-column>
        <el-table-column prop="contentDate" label="事件日期"></el-table-column>
        <el-table-column prop="createTime" label="创建日期"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="editTimeLine(scope.row.id, scope.row.content, scope.row.contentDate)" type="text"
              size="small" class="warning-color">编辑</el-button>
            <el-button @click="Delete(scope.row.id)" type="text" size="small" class="danger-color">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </main>
</template>

<script>
export default {
  name: "TimeLine",
  data: function () {
    return {
      TimeLineList: [],
      dialogFormVisible: false,
      dialogTitle: '新增时间轴',
      formLabelWidth: '80px',
      form: {
        content: '',
        contentDate: "",
      },
    }
  },
  methods: {
    // 打开新增弹框
    OpenCreateDialog: function () {
      this.dialogFormVisible = true;
      this.dialogTitle = '新增时间轴';

      this.form.content = "";
      this.form.contentDate = "";
      this.form.id = "";
    },
    // 关闭新增弹框
    CloseCreateDialog: function () {
      this.dialogFormVisible = false;
    },
    // 提交时间轴
    PostTimeLineData: function () {
      var That = this;

      if (!this.form.content || !this.form.contentDate) {
        this.$message({
          message: '事件内容和日期不能为空！',
          type: 'warning'
        });
        return;
      }

      if (this.form.id) {
        this.SQAjax({
          Url: '/api/updateTimeLine',
          RequestData: {
            content: this.form.content,
            contentDate: this.form.contentDate,
            id: this.form.id
          },
          Success: function () {
            That.CloseCreateDialog();
            That.GetTimeLineList();
          }
        });
      } else {
        this.SQAjax({
          Url: '/api/insertTimeLine',
          RequestData: {
            content: this.form.content,
            contentDate: this.form.contentDate
          },
          Success: function () {
            That.GetTimeLineList();
            That.CloseCreateDialog();
          }
        });
      }
    },
    // 获取时间轴列表数据
    GetTimeLineList: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/getTimeLineList',
        Success: function (data) {
          That.TimeLineList = data;
        }
      });
    },
    /*编辑标签*/
    editTimeLine: function (id, content, contentData) {
      this.form.content = content;
      this.form.contentDate = contentData;
      this.form.id = id;
      this.dialogFormVisible = true;
      this.dialogTitle = '编辑时间轴';
    },
    /**
     * 删除时间轴
     * @param CommentId 该条评论的id
     * @param ArticleId 文章id
     * @constructor
     */
    Delete: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteTimeLine',
        RequestData: {
          id: Id
        },
        Success: function (data) {
          That.$message('删除成功');
          That.GetTimeLineList();
        }
      });
    },
  },
  mounted: function () {
    this.GetTimeLineList();
    this.bus.$emit('Topbar', {
      MenuHighLight: '3'
    });
  }
}
</script>

<style scoped></style>
