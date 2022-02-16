<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OpenCreateDialog()" plain>新增心声</el-button>
        </div>
        
        <el-dialog title="新增心声" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="心声内容" :label-width="formLabelWidth">
              <el-input v-model="form.HeartfeltContent"></el-input>
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth">
              <el-input v-model="form.HeartfeltWriter"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form.CreateDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="创建日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="CloseCreateDialog()">取 消</el-button>
            <el-button type="primary" @click="PostHeartfelt()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="TimeLineList" style="width: 100%" border :header-cell-style="{background:'#f7f7f7'}">
          <el-table-column prop="HeartfeltContent" label="心声内容"></el-table-column>
          <el-table-column prop="HeartfeltWriter" label="心声作者"></el-table-column>
          <el-table-column prop="CreateDate" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="UpdateHeartfelt(scope.row._id,scope.row.HeartfeltContent,scope.row.HeartfeltWriter,scope.row.CreateDate,)" type="text" size="small">编辑</el-button>
              <el-button @click="DeleteHeartfelt(scope.row._id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TimeLine",
    data:function () {
      return {
        TimeLineList:'',
        dialogFormVisible:false,
        formLabelWidth: '120px',
        form:{
          HeartfeltContent:'',
          HeartfeltWriter:'',
          CreateDate:new Date()
        },
      }
    },
    methods:{
      // 打开新增弹框
      OpenCreateDialog:function(){
        this.form._id = '';
        this.form.HeartfeltContent = '';
        this.form.HeartfeltWriter = '';
        this.form.CreateDate = '';

        this.dialogFormVisible = true;
      },
      // 关闭新增弹框
      CloseCreateDialog:function(){
        this.dialogFormVisible = false;
      },
      // 提交数据
      PostHeartfelt:function(){
        var That = this;

        if(this.form.HeartfeltContent && this.form.CreateDate){
          this.SQAjax({
            Url:'/api/HeartfeltEditor/backend',
            RequestData:this.form,
            Success:function () {
              That.GetHeartfeltList();
              That.CloseCreateDialog();
            }
          });
        }
      },
      //修改心声
      UpdateHeartfelt:function(Id,HeartfeltContent,HeartfeltWriter,CreateDate){
        this.form._id = Id;
        this.form.HeartfeltContent = HeartfeltContent;
        this.form.HeartfeltWriter = HeartfeltWriter;
        this.form.CreateDate = CreateDate;

        this.dialogFormVisible = true;
      },
      // 获取时间轴列表数据
      GetHeartfeltList:function () {
        var That = this;
        That.SQAjax({
          Url:'/api/HeartfeltRead/foreend',
          Success:function (data) {
            data.forEach(function (Item,I) {
              Item.CreateDate = Item.CreateDate.slice(0,10);
            });
            That.TimeLineList = data;
          }
        });
      },
      // 删除心声
      DeleteHeartfelt:function (Id) {
        var That = this;

        That.SQAjax({
          Url:'/api/HeartfeltDelete/backend',
          RequestData:{
            _id:Id
          },
          Success:function (data) {
            That.GetHeartfeltList();
          }
        });
      }
    },
    mounted:function () {
      this.GetHeartfeltList();
      this.bus.$emit('Topbar',{
        MenuHighLight:'4'
      });
    }
  }
</script>

<style scoped>

</style>
