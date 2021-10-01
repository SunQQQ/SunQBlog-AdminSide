<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">

        <!--表格操作栏-->
        <el-table :data="MessageLeaveList" style="width: 100%">
          <el-table-column prop="userName" label="用户名"></el-table-column>
          <el-table-column prop="score" label="成绩"></el-table-column>
          <el-table-column prop="gameTime" label="时长"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
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
          Url:'/snake/scoreReadByDate/foreend',
          RequestData: {
            PagnationData: {
              Skip:0,
              Limit:15
            }
          },
          Success:function (data) {
            if (data.length > 15) {
              // data.pop();

              That.SQAjax({
                Url: '/snake/ScoreRead/foreend',
                Success: function (data) {
                  That.MessageLeaveTotal = data.num;
                }
              });
            }
            //
            // data.forEach(function (Item,I) {
            //   Item.MessageLeaveDate = Item.MessageLeaveDate.slice(0,10);
            // });

            That.MessageLeaveList = data;
          }
        });
      },
      // 跳转到选中页
      ChangeCurPage:function(CurPage){
        this.SkipTo(CurPage);
        this.MyCurPage = CurPage;
      },
      // 点击下一页
      NextPage:function (CurPage) {
        this.SkipTo(CurPage);
        this.MyCurPage = CurPage;
      },
      // 跳转分页的具体方法
      SkipTo:function (CurPage) {
        var That = this;
        That.SQAjax({
          Url:'/snake/scoreReadByDate/foreend',
          RequestData: {
            PagnationData: {
              Skip:(CurPage-1) * 15,
              Limit:15
            }
          },
          Success:function (data) {
            That.MessageLeaveList = data;
          }
        });
      },
      /*删除标签*/
      DeleteTag:function (Id) {
        var That = this;

        That.SQAjax({
          Url:'/snake/scoreDelete/foreend',
          RequestData:{
            _id:Id
          },
          Success:function () {
            That.SkipTo(That.MyCurPage);
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
