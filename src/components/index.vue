<template>
  <div class="RightContent">
    <div class="ArticleList">
      <!--表格操作栏-->
      <el-table :data="blogVisitList" style="width: 100%">
        <el-table-column prop="ip" label="IP"></el-table-column>
        <el-table-column prop="location" label="定位"></el-table-column>
        <el-table-column prop="time" label="访问时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
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
    }
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
