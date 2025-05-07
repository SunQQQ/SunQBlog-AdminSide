/**
* 此文件实现 评论管理 功能
*/
<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <!-- <el-button type="primary" >批量删除</el-button> -->
        <el-dialog title="修改评论" :visible.sync="dialogEdit">
          <el-form :model="form">
            <el-form-item label="评论内容" :label-width="formLabelWidth">
              <el-input v-model="form.commentContent"></el-input>
            </el-form-item>
            <el-form-item label="评论来源" :label-width="formLabelWidth">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="OnDialogCancel()">取 消</el-button>
            <el-button type="primary" @click="OnDialogSubmit()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="CommentList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
          <el-table-column prop="blogTitle" label="文章名称"></el-table-column>
          <el-table-column prop="createrName" label="评论人"></el-table-column>
          <el-table-column label="评论内容">
            <template slot-scope="scope">
              <div v-html="scope.row.commentContent"></div>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="评论来源"></el-table-column>
          <el-table-column prop="createTime" label="评论时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small" class="warning-color">修改</el-button>
              <el-button @click="DeleteComment(scope.row.id)" type="text" size="small"
                class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-pagination layout="total,prev, pager, next" :total=CommentTotal :page-size=PageSize
          @current-change="GetData" @next-click="GetData" @prev-click="GetData"
          v-if="CommentTotal > 0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  data: function () {
    return {
      CommentList: [],
      dialogEdit: false,
      form: {
        city: '',
        commentContent: ''
      },
      formLabelWidth: '80px',
      CommentTotal: 0,
      PageSize: 10,

      // 当前分页
      MyCurPage: 1
    }
  },
  methods: {
    // 评论列表
    GetData: function (CurPage) {
      var That = this;
      That.SQAjax({
        Url: '/api/getAdminList',
        RequestData: {
          start: (CurPage - 1) * That.PageSize,
          pageSize: That.PageSize
        },
        Success: function (data) {
          That.CommentTotal = data.total;
          That.CommentList = data.list;
        }
      });
    },
    /**
     * 删除评论
     * @param CommentId 该条评论的id
     * @param ArticleId 文章id
     * @constructor
     */
    DeleteComment: function (CommentId) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteComment',
        RequestData: {
          id: CommentId
        },
        Success: function () {
          That.GetData(That.MyCurPage);
        }
      });
    },
    OnDialogCancel: function () {
      this.dialogEdit = false;
    },
    /*监听弹框提交*/
    OnDialogSubmit: function () {
      var That = this;
      if (this.form.commentContent && this.form.city) {
        this.SQAjax({
          Url: '/api/updateComment',
          RequestData: this.form,
          Success: function () {
            That.GetData(That.MyCurPage);
            That.dialogEdit = false;
          }
        });
      }
    },
    /**
    * 修改评论
    */
    edit: function (Row) {
      this.form.commentContent = Row.commentContent;
      this.form.city = Row.city;
      this.form.id = Row.id;
      this.dialogEdit = true;
    }
  },
  mounted() {
    this.GetData(this.MyCurPage);
    this.bus.$emit('Topbar', {
      MenuHighLight: '7'
    });
  }
}
</script>

<style scoped></style>
