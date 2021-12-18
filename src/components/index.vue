<template>
  <div class="RightContent">
    <div class="ArticleList">
      <div id="lineChart" class="lineChart"></div>
      <!--<div id="mapChart" class="lineChart"></div>-->
      <!--表格操作栏-->
      <el-table :data="blogVisitList" style="width: 100%">
        <el-table-column prop="fromUrl" label="来源URL"></el-table-column>
        <el-table-column prop="location" label="访客定位"></el-table-column>
        <el-table-column prop="time" label="访问时间"></el-table-column>
        <el-table-column prop="browser" label="浏览器"></el-table-column>
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
  data: function () {
    return {
      blogVisitList: [],
      lineChartOption: {
        title: {text: '数据趋势'},
        tooltip: {
          trigger: 'axis'
        },
        legend:{
          type:'plain'
        },
        xAxis: {data: []},
        yAxis: {},
        series: [{
          name: '博客访问量(人/天)', type: 'line', data: [],
          itemStyle: {normal: {label: {show: true}}}
        }]
      },
      mapChartOption:{
      }
    }
  },
  methods: {
    // 获取blog访问数据
    getBlogVisitList: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/visitRead/foreend',
        RequestData: {
          PagnationData: {
            Skip: 0,
            Limit: 10
          }
        },
        Success: function (data) {
          That.blogVisitList = data.list;
        }
      });
    },
    setLineChart: function () {
      var that = this;
      let lineChart = this.$echarts.init(document.getElementById('lineChart'));

      console.log(this.getSQTime().split('/')[0]);

      this.SQAjax({
        Url: '/api/visitCount/foreend',
        RequestData: {
          endTime: this.getSQTime().split(' ')[0],
          dayNum: 7
        },
        Success: function (data) {
          let dates = [], readings = [];
          data.dateCountList.forEach(function (item) {
            dates.push(item.time);
            readings.push(item.reading);
          });
          that.lineChartOption.xAxis.data = dates.reverse();
          that.lineChartOption.series[0].data = readings.reverse();
          lineChart.setOption(that.lineChartOption);
        }
      });
    },
    Delete: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/visitDelete/backend',
        RequestData: {
          _id: Id
        },
        Success: function (data) {
          That.$message('删除成功');
          That.getBlogVisitList();
        }
      });
    },
  },
  mounted: function () {
    this.getBlogVisitList();
    this.setLineChart();

    this.bus.$emit('Topbar', {
      MenuHighLight: '0'
    });
  }
}
</script>

<style scoped>
.lineChart {
  width: 100%;
  height: 400px;
}
</style>
