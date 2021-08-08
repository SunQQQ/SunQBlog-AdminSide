/**
* 此文件实现 评论管理 功能
*/
<template>
  <div>
    <div class="RightContent">
      <el-button type="primary" @click="">批量删除</el-button>

      <el-dialog title="管理友链" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="评论时间" :label-width="formLabelWidth">
            <el-input v-model="form.ArticleCommentDate"></el-input>
          </el-form-item>
          <el-form-item label="评论人" :label-width="formLabelWidth">
            <el-input v-model="form.ArticleCommentNickName"></el-input>
          </el-form-item>
          <el-form-item label="评论内容" :label-width="formLabelWidth">
            <el-input v-model="form.ArticleCommentText"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--表格操作栏-->
      <el-table :data="CommentList" style="width: 100%">
        <el-table-column prop="ArticleCommentDate" label="评论时间"></el-table-column>
        <el-table-column prop="ArticleCommentNickName" label="评论人"></el-table-column>
        <el-table-column prop="ArticleCommentText" label="评论内容"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="DeleteComment(scope.row._id,scope.row.ArticleId)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <div v-if="CommentTotal>10">
        <el-pagination layout="prev, pager, next,total"
                       :total=CommentTotal
                       :page-size=PageSize
                       @current-change="ChangeCurPage"
                       @next-click="NextPage"
                       @prev-click="NextPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    data:function(){
      return {
        CommentList: [],
        dialogFormVisible: false,
        form: {
          ArticleCommentDate:'',
          ArticleCommentNickName:'',
          ArticleCommentText:''
        },
        CommentTotal: 0,
        PageSize: 10
      }
    },
    methods: {
      // 评论列表
      GetData: function () {
        var That = this;
        That.SQAjax({
          Url:'/api/CommentRead/backend',
          RequestData: {
            PagnationData: {
              Skip:0,
              Limit:11
            }
          },
          Success:function (data) {
            if(data.length > 10){
              data.pop();

              That.SQAjax({
                Url:'/api/getCommentNum',
                Success: function (data) {
                  That.CommentTotal = data;
                  console.log(data);
                }
              });
            }

            That.CommentList = data;
          }
        });
      },
      /**
       * 删除评论
       * @param CommentId 该条评论的id
       * @param ArticleId 文章id
       * @constructor
       */
      DeleteComment:function (CommentId,ArticleId) {
        var That = this;

        That.SQAjax({
          Url:'/api/CommentDelete/backend',
          RequestData:{
            _id:CommentId
          },
          Success:function (data) {
            That.GetData();

            That.UpdateArticleCommentNum(ArticleId,'delete');
          }
        });
      },
      // 传入文章id，给对应文章评论数减1
      UpdateArticleCommentNum: function (id,type) {
        this.SQAjax({
          Url: '/api/ArticleCommentNumUpdate/backend',
          RequestData: {
            _id: id,
            type: type
          },
          Success: function (data) {

          }
        });
      },
      // 翻页方法
      ChangeCurPage:function(CurPage){
        this.SkipTo(CurPage);
      },
      NextPage: function(CurPage){
        this.SkipTo(CurPage);
      },
      SkipTo:function (CurPage) {
        var That = this;
        That.SQAjax({
          Url:'/api/CommentRead/backend',
          RequestData: {
            PagnationData: {
              Skip:(CurPage-1) * 10,
              Limit:10
            }
          },
          Success:function (data) {
            That.CommentList = data;
          }
        });
      }
    },
    mounted() {
      this.GetData();
      this.bus.$emit('Topbar',{
        MenuHighLight:'7'
      });
    }
  }
</script>

<style scoped>

</style>
