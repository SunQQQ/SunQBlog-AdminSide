<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">

        <!--表格操作栏-->
        <el-table :data="MessageLeaveList" style="width: 100%">
          <el-table-column prop="MessageLeaveName" label="留言者"></el-table-column>
          <el-table-column prop="MessageText" label="留言内容"></el-table-column>
          <el-table-column prop="MessageLeaveDate" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditMessageLeave(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="DeleteTag(scope.row._id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="MessageLeaveTotal>10">
          <el-pagination layout="prev, pager, next,total"
                         :total=MessageLeaveTotal
                         :page-size=PagiSize
                         @current-change="ChangeCurPage"
                         @next-click="NextPage"
                         @prev-click="NextPage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SnakeScores",
    data: function () {
      return {
        MessageLeaveList: [],
        MessageLeaveTotal:0,
        PagiSize:15,
        dialogFormVisible: false,
        form: {
          MessageLeaveName: '',
          MessageText: '',
          delivery: false
        },
        formLabelWidth: '120px',
        MyCurPage: 1
      }
    },
    methods: {
      /*渲染标签列表*/
      GetData:function () {
        var That = this;
        this.SQAjax({
          Url:'/api/MessageRead/backend',
          RequestData: {
            PagnationData: {
              Skip:0,
              Limit:16
            }
          },
          Success:function (data) {
            if (data.length > 10) {
              data.pop();

              That.SQAjax({
                Url: '/api/getmessagenum',
                Success: function (data) {
                  That.MessageLeaveTotal = data;
                }
              });
            }

            data.forEach(function (Item,I) {
              Item.MessageLeaveDate = Item.MessageLeaveDate.slice(0,10);
            });

            That.MessageLeaveList = data;
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
          Url:'/api/MessageRead/backend',
          RequestData: {
            PagnationData: {
              Skip:(CurPage-1) * 10,
              Limit:10
            }
          },
          Success:function (data) {
            That.MessageLeaveList = data;
          }
        });
      },
    },
    mounted: function () {
      this.GetData();
      this.bus.$emit('Topbar',{
        MenuHighLight:'8'
      });
    }
  }
</script>

<style scoped>

</style>
