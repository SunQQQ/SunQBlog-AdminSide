<template>
  <div class="RightContent">
    <div class="ArticleList">
      <!--表格操作栏-->
      <el-table :data="blogVisitList" style="width: 100%">
        <el-table-column prop="ip" label="访客IP"></el-table-column>
        <el-table-column prop="location" label="访客定位"></el-table-column>
        <el-table-column prop="time" label="访问时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="Delete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data:function (){
    return {
      blogVisitList:[]
    }
  },
  methods: {
    // 获取blog访问数据
    getBlogVisitList: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/visitRead/foreend',
        Success: function (data) {
          That.blogVisitList = data;
        }
      });
    },
    Delete:function (Id) {
      var That = this;

      That.SQAjax({
        Url:'/api/visitDelete/backend',
        RequestData:{
          _id:Id
        },
        Success:function (data) {
          That.$message('删除成功');
          That.getBlogVisitList();
        }
      });
    },
  },
  mounted:function () {
    this.getBlogVisitList();
    this.bus.$emit('Topbar',{
      MenuHighLight:'0'
    });
  }
}
</script>

<style scoped>

</style>
