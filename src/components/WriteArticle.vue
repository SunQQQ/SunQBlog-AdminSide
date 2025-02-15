<template>
  <div>
    <div class="RightContent" style="margin-bottom:0;margin-right: 0;">
      <div class="WriteArticleContent">
        <div class="SimpleFlex">
          <div class="ArticleTitle">
            <span>文章标题：</span>
            <input placeholder="请输入标题" v-model="title">
          </div>
          <!-- <div class="ArticleTitle">
            <span>优先级别：</span>
            <input placeholder="(试验田使用)" v-model="order">
          </div> -->
          <div class="ArticleTitle">
            文章封面：
            <input @change="SetArticleCover" type="file" multiple="multiple" ref='selectfile' style="flex:1">
            <img :src="articleCover" v-show="articleCover" style="width: 70px;height: 40px"/>
          </div>
        </div>

        <div class="SimpleFlex">
          <div class="ArticleTitle">
            文章简介：
            <input placeholder="请输入文章简介" v-model="summary">
          </div>
          <div class="ArticleTitle">
            封面地址：
            <input placeholder="封面地址可不填" v-model="articleCover">
          </div>
          <div class="ArticleTitle">
            文章标签：
            <el-select v-model="articleTag" placeholder="选择文章标签" style="flex:1">
              <!-- <el-option v-for="item in ArticleTagOptions" :key="item.value" :label="item.TagName" :value="item.TagName"></el-option> -->
              <el-option label="技术" value="技术"></el-option>
              <el-option label="生活" value="生活"></el-option>
            </el-select>
          </div>
        </div>

        <div class="SimpleFlex">
          <div class="ArticleTitle" style="justify-content:start;">
            <el-button type="primary" @click="SubmitArticle()">提交</el-button>
          </div>
          <div class="ArticleTitle"></div>
          <div class="ArticleTitle"></div>
        </div>

        <div class="ArticleDetail" id="ArticleDetail">
          <mavon-editor v-model="content" :isHljs = "true" @imgAdd="$imgAdd" ref=md :style="{height: editorHeight}"></mavon-editor>
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
        title:'',
        // order:'', // 优先级，试验田类的文章需要本字段来排序
        content:'',
        summary:'',
        ArticleTagOptions: [],
        articleTag: '',
        articleCover:'',
        commentNum:0,
        editorHeight: 0
      }
    },
    methods:{
      // 监听提交按钮
      SubmitArticle:function () {
        var That = this;

        // 修改文章
        if(this.$route.params.ID){
          if(this.title && this.content){
            this.SQAjax({
              Url:'/api/ArticleUpdate/backend',
              RequestData:{
                _id:this.$route.params.ID,
                title: this.title,
                // order:this.order,
                summary:this.summary,
                content: this.content,
                articleTag:this.articleTag,
                articleCover:this.articleCover,
                commentNum:this.commentNum,
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
          if(this.title && this.content){
            this.SQAjax({
              Url:'/api/createBlog',
              RequestData:{
                title: this.title,
                // order: this.order,
                summary:this.summary,
                content: this.content,
                articleTag:this.articleTag,
                articleCover:this.articleCover
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
        PicData.append('content',this.$refs.selectfile.files[0]);
        axios.post('/api/UploadImg', PicData
        ).then(function (response) {
          That.articleCover = response.data.data[0];//头图图片预览
        }).catch(function (error) {
        });
      },
      $imgAdd(pos, $file){
        var formdata = new FormData(),That = this;
        formdata.append('content', $file);

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

      // That.SQAjax({
      //   Url:'/api/TagRead/foreend',
      //   RequestData:{},
      //   Success:function (data) {
      //     That.ArticleTagOptions = data;
      //   }
      // });

      if(this.$route.params.ID){
        That.SQAjax({
          Url:'/api/ArticleReadOne/foreend',
          RequestData:{_id:this.$route.params.ID},
          Success:function (data) {
            That.title = data[0].title;
            // That.order = data[0].order;
            That.content = data[0].content;
            That.summary = data[0].summary;
            That.articleTag = data[0].articleTag;
            That.articleCover = data[0].articleCover;
            That.commentNum = data[0].commentNum;
          }
        });
      }else{

      }

      // 根据分辨率，动态设置编辑器高度
      // That.editorHeight = window.screen.height - 318 + 'px';
      That.editorHeight = window.innerHeight - 261 + 'px';
    },
    components:{
      TopBar:TopBar
    }
  }
</script>

<style scoped>
  .SimpleFlex{
    margin-top: 10px;
    display: flex;
    vertical-align: middle;
    justify-content: space-around;
  }

  .WriteArticleContent{
  }
  .ArticleTitle {
    width: 30%;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .CommentNum{
    width: 150px;
    flex: none;
  }
  .CommentNum input{
    width: 100%;
  }

  .ArticleTitle input {
    flex: 1;
    height: 34px;
    line-height: 34px;
    border: 1px solid #dcdfe6;
    outline: none;
  }

  .ArticleTitle input::placeholder{
    color: #dcdfe6;
  }

  .ArticleDetail {
    margin-top: 20px;
    margin-right: 20px;
  }

  .ArticleDetail textarea {
    width: 100%;
    height: 15rem;
  }
  .WriteSubmit{
    text-align: right;
    margin-left: 10px;
  }
  .editortoolbar{
    border: 1px solid #ccc;
  }
  .editorbody{
    border: 1px solid #ccc;
    height: 500px;
  }
</style>
