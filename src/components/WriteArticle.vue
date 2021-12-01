<template>
  <div>
    <div class="RightContent">
      <div class="WriteArticleContent">
        <div class="SimpleFlex">
          <div class="ArticleTitle">
            <input placeholder="文章标题" v-model="Title">
          </div>
          <div>
            <el-date-picker v-model="CreateDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="创建日期"></el-date-picker>
          </div>

          <el-select v-model="ArticleTag" placeholder="选择文章标签">
            <el-option v-for="item in ArticleTagOptions" :key="item.value" :label="item.TagName" :value="item.TagName"></el-option>
          </el-select>
        </div>

        <div class="SimpleFlex">
          <div class="ArticleTitle">
            <input placeholder="文章简介" v-model="Summary">
          </div>
          <div class="ArticleTitle">
            <input placeholder="文章简介" v-model="ArticleCover">
          </div>
          <div class="ArticleTitle CommentNum">
            <input placeholder="评论数" v-model="CommentNum">
          </div>
        </div>

        <div class="SimpleFlex">
          <div class="ArticleTitle">
            <input placeholder="文章缩略图" @change="SetArticleCover" type="file" multiple="multiple" ref='selectfile'>
          </div>
          <img :src="ArticleCover" v-show="ArticleCover" style="width: 150px;height: 100px">
          <div class="WriteSubmit">
            <el-button type="primary" @click="SubmitArticle()">确认</el-button>
          </div>
        </div>

        <div class="ArticleDetail" id="ArticleDetail">
          <mavon-editor v-model="Content" :isHljs = "true" @imgAdd="$imgAdd" ref=md></mavon-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import TopBar from './TopBar'
  import axios from 'axios'

  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // use
  Vue.use(mavonEditor)

  /*此页面为新增文章和修改文章共用，判断hash有参数则为修改页面，无参数则为新增文章*/

  export default {
    name: "WriteArticle",
    data: function () {
      return {
        Title:'',
        Content:'',
        CreateDate:new Date(),
        Summary:'',
        ArticleTagOptions: [],
        ArticleTag: '',
        ArticleCover:'',
        CommentNum:0
      }
    },
    methods:{
      // 监听提交按钮
      SubmitArticle:function () {
        var That = this;

        // 修改文章
        if(this.$route.params.ID){
          if(this.Title && this.Content){
            this.SQAjax({
              Url:'/api/ArticleUpdate/backend',
              RequestData:{
                _id:this.$route.params.ID,
                Title: this.Title,
                Summary:this.Summary,
                Content: this.Content,
                CreateDate:this.CreateDate,
                ArticleTag:this.ArticleTag,
                ArticleCover:this.ArticleCover,
                CommentNum:this.CommentNum
              },
              Success:function (data) {
                That.$router.push({name:'Article'});
              }
            });
          }else {
            That.$message.error('标题和内容不能为空');
          }
        //新增文章
        }else {
          if(this.Title && this.Content){
            this.SQAjax({
              Url:'/api/AddArticle/backend',
              RequestData:{
                Title: this.Title,
                Summary:this.Summary,
                Content: this.Content,
                CreateDate:this.CreateDate,
                ArticleTag:this.ArticleTag,
                ArticleCover:this.ArticleCover
              },
              Success:function (data) {
                That.$router.push({name:'Article'});
              }
            });
          }else {
            That.$message.error('标题和内容不能为空');
          }
        }
      },
      //上传文章缩略图
      SetArticleCover:function () {
        var That = this;
        var PicData = new FormData();
        PicData.append('Content',this.$refs.selectfile.files[0]);
        axios.post('/api/UploadImg', PicData
        ).then(function (response) {
          That.ArticleCover = response.data.data[0];//头图图片预览
        }).catch(function (error) {
        });
      },
      $imgAdd(pos, $file){
        var formdata = new FormData(),That = this;
        formdata.append('Content', $file);

        axios.post('/api/UploadImg', formdata
        ).then(function (UrlValue) {
          That.$refs.md.$img2Url(pos, UrlValue.data.data[0]);
        });
      }
    },
    /*初始化富文本插件*/
    mounted:function(){
      this.bus.$emit('Topbar',{
        MenuHighLight:'1'
      });
    },
    /*初始化页面*/
    created: function () {
      var That = this;
      //判断是否传参,是为修改文章、否为新增文章。初始化这个页面

      That.SQAjax({
        Url:'/api/TagRead/backend',
        RequestData:{},
        Success:function (data) {
          That.ArticleTagOptions = data;
        }
      });

      if(this.$route.params.ID){
        That.SQAjax({
          Url:'/api/ArticleReadOne/backend',
          RequestData:{_id:this.$route.params.ID},
          Success:function (data) {
            That.Title = data[0].Title;
            That.Content = data[0].Content;
            That.Summary = data[0].Summary;
            That.CreateDate = data[0].CreateDate;
            That.ArticleTag = data[0].ArticleTag;
            That.ArticleCover = data[0].ArticleCover;
            That.CommentNum = data[0].CommentNum;
          }
        });
      }else{

      }
    },
    components:{
      TopBar:TopBar
    }
  }
</script>

<style scoped>
  .SimpleFlex{
    margin-top: 1rem;
    display: flex;
    vertical-align: middle;
  }

  .WriteArticleContent{
  }
  .ArticleTitle {
    flex: 1;
    margin-right: 10px;
  }

  .CommentNum{
    width: 150px;
    flex: none;
  }
  .CommentNum input{
    width: 100%;
  }

  .ArticleTitle input {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .ArticleDetail {
    margin-top: 1rem;
    width: 100%;
    height: 800px;
  }

  .ArticleDetail textarea {
    width: 100%;
    height: 15rem;
  }
  .WriteSubmit{
    text-align: right;
    margin-top: 1rem;
  }
  .editortoolbar{
    border: 1px solid #ccc;
  }
  .editorbody{
    border: 1px solid #ccc;
    height: 500px;
  }
</style>
