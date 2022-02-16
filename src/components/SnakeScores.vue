<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <el-button type="primary" @click="mulDelete()">批量删除</el-button>


        <!--表格操作栏-->
        <el-table :data="MessageLeaveList" style="width: 100%" ref="multipleTable">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
        MyCurPage: 1,
        multipleSelection: [], // table批量删除选中值
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
            That.SQAjax({
              Url: '/snake/ScoreRead/foreend',
              Success: function (data) {
                if(data.num > 15){
                  That.MessageLeaveTotal = data.num;
                }
              }
            });

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
      // 删除标签
      DeleteTag:function (Id) {
        var That = this;

        if(window.localStorage.getItem("SQBlogUser") == 'sunq'){
          That.SQAjax({
            Url:'/snake/scoreDelete/backend',
            RequestData:{
              _id:Id
            },
            Success:function () {
              That.SkipTo(That.MyCurPage);
            }
          });
        }else{
          That.$message.error('权限不足，无法操作数据');
        }
      },

      // 批量删除
      mulDelete:function () {
        var that = this;

        // 整理选中项的id数组
        that.$refs.multipleTable.selection.forEach(item =>  {
          that.multipleSelection.push(item._id);
        });

        that.SQAjax({
          Url:'/snake/scoreMulDelete/backend',
          RequestData:{
            idArray: that.multipleSelection
          },
          Success:function () {
            that.$message('批量删除成功');
            that.SkipTo(that.MyCurPage);
          }
        });
      }
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
