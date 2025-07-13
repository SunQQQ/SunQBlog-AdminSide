<template>
  <main class="RightContent">
    <el-form>
      <el-form-item label="文章分类">
        <el-select v-model="select_val" placeholder="请选择">
          <el-option v-for="item in ArticleTagOptions" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table border :data="ArticleList" style="width: 100%" :header-cell-style="{ background: '#f7f7f7' }"
      empty-text="暂无数据，快发布一篇文章体验下吧~">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="summary" label="简介"></el-table-column>
      <el-table-column prop="articleTagName" label="分类标签"></el-table-column>
      <el-table-column prop="createName" label="创建人"></el-table-column>
      <!-- <el-table-column prop="order" label="优先级"></el-table-column> -->
      <el-table-column prop="commentNum" label="评论数"></el-table-column>
      <el-table-column prop="systemIsReview" :formatter="formatBoolean" label="是否经过审核"></el-table-column>
      <el-table-column prop="systemReviewResult" :formatter="formatResult" label="审核结果"></el-table-column>
      <el-table-column prop="systemReviewComment" label="审核意见"></el-table-column>
      <el-table-column prop="systemReviewTime" label="审核时间"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click="ReadArticle(scope.row.id)" type="text" size="small" class="success-color">查看</el-button>
          <el-button @click="EditArticle(scope.row.id)" type="text" size="small" class="warning-color">编辑</el-button>
          <el-button @click="DeleteArticle(scope.row.id)" type="text" size="small" class="danger-color">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="total,prev, pager, next" :total=ArticleTotal :page-size=PagiSize @current-change="SkipTo"
      @next-click="SkipTo" @prev-click="SkipTo" v-if="ArticleTotal > 0">
    </el-pagination>
    <div class="guide-text">
      <i class="el-icon-info" style="margin-right: 4px; color: #9196a1;"></i>每位小伙伴都可以发布文章，这里将是专属你的一方空间，分享自己的心得或生活~
    </div>
  </main>
</template>

<script>
export default {
  name: "Article",
  data: function () {
    return {
      ArticleList: [],
      ArticleTotal: 0,
      PagiSize: 10,
      // 分页组件无需手动传入参数，自动传入。但删除列表时需要手动传入，此变量用于同步分页当前页
      commonPage: 1,
      select_val: 0,
      ArticleTagOptions: []
    }
  },
  methods: {
    ReadArticle: function (Id) {
      this.$router.push({ name: 'ArticleDetail', params: { ID: Id } });
    },
    EditArticle: function (Id) {
      this.$router.push({ name: 'WriteArticle', params: { ID: Id } });
    },
    DeleteArticle: function (Id) {
      var That = this;

      this.SQAjax({
        Url: '/api/deleteBlog',
        RequestData: { id: Id },
        Success: function (data) {
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
    SkipTo: function (CurPage) {
      var That = this;

      // 此变量用于删除功能等，记录当前页面状态
      That.commonPage = CurPage;

      That.SQAjax({
        Url: '/api/getBlogList',
        RequestData: {
          start: (CurPage - 1) * That.PagiSize,
          size: That.PagiSize,
          tag: That.select_val
        },
        Success: function (data) {
          That.ArticleTotal = data.total;

          data.list.forEach(function (Item, I) {
            Item.createTime = Item.createTime.slice(0, 10);
          });

          That.ArticleList = data.list;
        }
      });
    },
    getTags() {
      var That = this;
      That.SQAjax({
        Url: '/api/getDictionaryList',
        RequestData: {
          parentId: 1
        },
        Success: function (data) {
          data.push({ id: 0, name: '全部' });
          That.ArticleTagOptions = data;
        }
      });
    },
    formatBoolean(row, column, cellValue) {
      return cellValue === 1 ? '是' : '否';
    },
    formatResult(row, column, cellValue) {
      return cellValue === 1 ? '通过' : '未通过';
    },

  },

  mounted: function () {
    this.SkipTo(this.commonPage);
    this.getTags();
    this.bus.$emit('Topbar', {
      MenuHighLight: '1-1'
    });
  },
  watch: {
    select_val: function () {
      this.SkipTo(1);
    }
  }
}
</script>

<style scoped>
.guide-text {
  color: var(--GBK06A);
  font-size: 12px;
  line-height: 19px;
  padding: 12px 0px 0px;
  color: #9196a1;
}
</style>
