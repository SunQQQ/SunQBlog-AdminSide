<template>
  <main class="RightContent">
    <h1 class="mainTitle">{{ $route.meta.h1 }}</h1>
    <div class="ArticleList">
      <div style="margin-bottom:10px">
        <el-button @click="mulDelete()" type="primary" plain>批量删除</el-button>
        <el-button @click="jumpPage('game')" plain>体验游戏</el-button>
        <el-button @click="jumpPage('code')" type="success" plain>游戏源码</el-button>
      </div>

      <!--表格操作栏-->
      <el-table :data="MessageLeaveList" style="width: 100%" ref="multipleTable" border
        :header-cell-style="{ background: '#f7f7f7' }">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="score" label="成绩"></el-table-column>
        <el-table-column prop="gameTime" label="时长"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>

      <el-pagination layout="total, prev, pager, next" :total=total :page-size=PagiSize @current-change="GetData">
      </el-pagination>
    </div>
  </main>
</template>

<script>
export default {
  name: "SnakeScores",
  data: function () {
    return {
      MessageLeaveList: [],
      total: 0,
      PagiSize: 10,
      dialogFormVisible: false,
      form: {
        MessageLeaveName: '',
        MessageText: '',
        delivery: false
      },
      formLabelWidth: '80px',
      MyCurPage: 1,
      multipleSelection: [], // table批量删除选中值
    }
  },
  methods: {
    /*渲染标签列表*/
    GetData: function (CurPage) {
      var That = this;
      That.MyCurPage = CurPage;
      this.SQAjax({
        Url: '/api/getSnakeScoreList',
        RequestData: {
          start: (CurPage - 1) * That.PagiSize,
          size: That.PagiSize
        },
        Success: function (data) {
          That.MessageLeaveList = data.list;
          That.total = data.total;
        }
      });
    },
    // 批量删除
    mulDelete: function () {
      var that = this;

      // 整理选中项的id数组
      that.$refs.multipleTable.selection.forEach(item => {
        that.multipleSelection.push(item.id);
      });

      if (that.multipleSelection.length === 0) {
        that.$message({
          type: 'warning',
          message: '请选择要删除的记录'
        });
        return;
      }

      that.SQAjax({
        Url: '/api/scoreMulDelete',
        RequestData: {
          ids: that.multipleSelection
        },
        Success: function () {
          that.$message('批量删除成功');
          that.GetData(that.MyCurPage);
        }
      });
    },
    jumpPage: function (type) {
      window.open(type == 'code' ? 'https://github.com/SunQQQ/snake' : 'https://codinglife.online/snake');
    }
  },
  mounted: function () {
    this.GetData(this.MyCurPage);
    this.bus.$emit('Topbar', {
      MenuHighLight: '8'
    });
  }
}
</script>

<style scoped></style>
