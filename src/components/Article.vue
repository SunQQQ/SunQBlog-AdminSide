<template>
  <div>
    <div class="RightContent">
      <div style="margin-bottom:10px">
        <el-button type="primary" @click="WriteArticle()" plain>创建文章</el-button>
      </div>

      <el-table border :data="ArticleList" style="width: 100%" :header-cell-style="{background:'#f7f7f7'}">
        <el-table-column prop="Title" label="标题"></el-table-column>
        <el-table-column prop="Summary" label="简介"></el-table-column>
        <el-table-column prop="ArticleTag" label="分类标签"></el-table-column>
        <el-table-column prop="order" label="优先级"></el-table-column>
        <el-table-column prop="CommentNum" label="评论数"></el-table-column>
        <el-table-column prop="CreateDate" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="ReadArticle(scope.row._id)" type="text" size="small">查看</el-button>
            <el-button @click="EditArticle(scope.row._id)" type="text" size="small">编辑</el-button>
            <el-button @click="DeleteArticle(scope.row._id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="ArticleTotal>10">
        <el-pagination layout="prev, pager, next,total"
                       :total=ArticleTotal
                       :page-size=PagiSize
                       @current-change="ChangeCurPage"
                       @next-click="NextPage"
                       @prev-click="NextPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Article",
      data:function(){
        return {
          ArticleList:[],

          ArticleTotal:0,
          PagiSize:10,
          MyCurPage: 1
        }
      },
      methods:{
        ReadArticle:function (Id) {
          this.$router.push({name:'ArticleDetail',params:{ID:Id}});
        },
        WriteArticle:function () {
          this.$router.push({name:'WriteArticle'});
        },
        EditArticle:function (Id) {
          this.$router.push({name:'WriteArticle',params:{ID:Id}});
        },
        DeleteArticle:function (Id) {
          var That = this;

          this.SQAjax({
            Url:'/api/ArticleDelete/backend',
            RequestData:{_id:Id},
            Success:function (data) {
              That.$message('删除成功');
              That.SkipTo(That.MyCurPage);
            }
          });
        },
        GetData:function (that) {
          var That = this;
          this.SQAjax({
            Url:'/api/ArticleRead/foreend',
            RequestData: {
              PagnationData: {
                Skip:0,
                Limit:11
              }
            },
            Success:function (data) {
              if (data.length > 10) {
                data.pop();

                That.SQAjax({
                  Url: '/api/getarticlenum/foreend',
                  Success: function (data) {
                    That.ArticleTotal = data;
                  }
                });
              }

              data.forEach(function (Item,I) {
                Item.CreateDate = Item.CreateDate.slice(0,10);
              });
              That.ArticleList = data;
            }
          });
        },
        // 翻页方法
        ChangeCurPage:function(CurPage){
          this.SkipTo(CurPage);
          this.MyCurPage = CurPage;
        },
        NextPage:function (CurPage) {
          this.SkipTo(CurPage);
          this.MyCurPage = CurPage;
        },
        SkipTo:function (CurPage) {
          var That = this;
          That.SQAjax({
            Url:'/api/ArticleRead/foreend',
            RequestData: {
              PagnationData: {
                Skip:(CurPage-1) * 10,
                Limit:10
              }
            },
            Success:function (data) {
              That.ArticleList = data;
            }
          });
        }
      },

      mounted:function () {
        this.GetData(this);
        this.bus.$emit('Topbar',{
          MenuHighLight:'1'
        });
      }
    }
</script>

<style scoped>

</style>
