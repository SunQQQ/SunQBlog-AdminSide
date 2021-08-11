<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <el-dialog title="管理分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.MessageLeaveName"></el-input>
            </el-form-item>
            <el-form-item label="分类顺序" :label-width="formLabelWidth">
              <el-input v-model="form.MessageText"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="OnDialogCancel()">取 消</el-button>
            <el-button type="primary" @click="OnDialogSubmit()">确 定</el-button>
          </div>
        </el-dialog>

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
    name: "TagIndex",
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
        MyCurPage: 0
      }
    },
    methods: {
      /*监听弹框提交*/
      OnDialogSubmit:function(){
        var That = this;
        if(this.form.MessageLeaveName && this.form.MessageText){
          this.SQAjax({
            Url:'/api/MessageLeaveEdit/backend',
            RequestData:this.form,
            Success:function () {
              That.SkipTo(That.MyCurPage);
            }
          });

          this.dialogFormVisible = false;
        }
      },
      OnDialogCancel:function(){
        if(this.form.TagId){
          delete this.form.TagId;
        }
        this.dialogFormVisible = false;
      },
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
      /*删除标签*/
      DeleteTag:function (Id) {
        var That = this;

        That.SQAjax({
          Url:'/api/MessageLeaveDelete/backend',
          RequestData:{
            _id:Id
          },
          Success:function () {
            That.SkipTo(That.MyCurPage);
          }
        });
      },
      /*编辑标签*/
      EditMessageLeave:function (Row) {
        this.form.MessageLeaveName = Row.MessageLeaveName;
        this.form.MessageText = Row.MessageText;
        this.form._id = Row._id;
        this.dialogFormVisible = true;
      },
    },
    mounted: function () {
      this.GetData();
      this.bus.$emit('Topbar',{
        MenuHighLight:'6'
      });
    }
  }
</script>

<style scoped>

</style>
