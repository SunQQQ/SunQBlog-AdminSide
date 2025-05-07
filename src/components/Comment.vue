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
            <el-form-item label="评论人" :label-width="formLabelWidth">
              <el-input v-model="form.ArticleCommentNickName"></el-input>
            </el-form-item>
            <el-form-item label="评论内容" :label-width="formLabelWidth">
              <el-input v-model="form.ArticleCommentText"></el-input>
            </el-form-item>
            <el-form-item label="评论来源" :label-width="formLabelWidth">
              <el-input v-model="form.LocationCityName"></el-input>
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
              <el-button @click="DeleteComment(scope.row._id, scope.row.ArticleId)" type="text" size="small"
                class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-pagination layout="prev, pager, next" :total=CommentTotal :page-size=PageSize
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
        LocationCityName: '',
        ArticleCommentNickName: '',
        ArticleCommentText: ''
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
    DeleteComment: function (CommentId, ArticleId) {
      var That = this;

      That.SQAjax({
        Url: '/api/CommentDelete/backend',
        RequestData: {
          _id: CommentId
        },
        Success: function (data) {
          That.SkipTo(That.MyCurPage);

          That.UpdateArticleCommentNum(ArticleId, 'delete');
        }
      });
    },
    OnDialogCancel: function () {
      if (this.form.TagId) {
        delete this.form.TagId;
      }
      this.dialogEdit = false;
    },
    /*监听弹框提交*/
    OnDialogSubmit: function () {
      var That = this;
      if (this.form.ArticleCommentNickName && this.form.ArticleCommentText) {
        this.SQAjax({
          Url: '/api/ArticleCommentUpdate/backend',
          RequestData: this.form,
          Success: function () {
            That.SkipTo(That.MyCurPage);
            That.dialogEdit = false;
          }
        });
      }
    },
    /**
    * 修改评论
    */
    edit: function (Row) {
      this.form.ArticleCommentNickName = Row.ArticleCommentNickName;
      this.form.ArticleCommentText = Row.ArticleCommentText;
      this.form.LocationCityName = Row.LocationCityName;
      this.form._id = Row._id;
      this.dialogEdit = true;
    },

    // 传入文章id，给对应文章评论数减1
    UpdateArticleCommentNum: function (id, type) {
      this.SQAjax({
        Url: '/api/ArticleCommentNumUpdate/backend',
        RequestData: {
          _id: id,
          type: type
        },
        Success: function (data) { }
      });
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
