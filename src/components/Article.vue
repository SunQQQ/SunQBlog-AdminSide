<template>
  <div>
    <div class="RightContent">
      <div style="margin-bottom:10px">
        <el-button type="primary" @click="WriteArticle()" plain>创建文章</el-button>
      </div>

      <el-table border :data="ArticleList" style="width: 100%" :header-cell-style="{background:'#f7f7f7'}">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="summary" label="简介"></el-table-column>
        <el-table-column prop="articleTagName" label="分类标签"></el-table-column>
        <el-table-column prop="createName" label="创建人"></el-table-column>
        <!-- <el-table-column prop="order" label="优先级"></el-table-column> -->
        <el-table-column prop="commentNum" label="评论数"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="ReadArticle(scope.row.id)" type="text" size="small" class="success-color">查看</el-button>
            <el-button @click="EditArticle(scope.row.id)" type="text" size="small" class="warning-color">编辑</el-button>
            <el-button @click="DeleteArticle(scope.row.id)" type="text" size="small" class="danger-color">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="ArticleTotal>10">
        <el-pagination layout="prev, pager, next"
                       :total=ArticleTotal
                       :page-size=PagiSize
                       @current-change="SkipTo"
                       @next-click="SkipTo"
                       @prev-click="SkipTo">
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
          commonPage: 1
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
            Url:'/api/deleteBlog',
            RequestData:{id:Id},
            Success:function (data) {
              That.$message({
                message: '删除成功',
                type: 'success',
                duration: 900
              });
              That.SkipTo(That.commonPage);
            }
          });
        },
        /**
         * 此方法兼容左右按钮翻页，和直接选中某一页翻页
         * @param CurPage 此参数由elementUI自动维护、传入
         */
        SkipTo:function (CurPage) {
          var That = this;
          
          // 此变量用于删除功能等，记录当前页面状态
          That.commonPage = CurPage;

          That.SQAjax({
            Url:'/api/getBlogList',
            RequestData: {
              start:(CurPage-1) * That.PagiSize,
              size:That.PagiSize,
              tag: 0
            },
            Success:function (data) {
              if (data.total > 10) {
                That.ArticleTotal = data.total;
              }

              data.list.forEach(function (Item,I) {
                Item.createTime = Item.createTime.slice(0,10);
              });

              That.ArticleList = data.list;
            }
          });
        }
      },

      mounted:function () {
        this.SkipTo(this.commonPage);
        this.bus.$emit('Topbar',{
          MenuHighLight:'1'
        });
      }
    }
</script>

<style scoped>

</style>
