<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <el-button type="primary" @click="OpenCreateDialog()">新增时间轴</el-button>

        <el-dialog title="新增时间轴" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="文本名称" :label-width="formLabelWidth">
              <el-input v-model="form.TextContent"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form.CreateDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="创建日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="CloseCreateDialog()">取 消</el-button>
            <el-button type="primary" @click="PostTimeLineData()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="TimeLineList" style="width: 100%">
          <el-table-column prop="TextContent" label="标签内容"></el-table-column>
          <el-table-column prop="CreateDate" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditTag(scope.row._id,scope.row.TagName,scope.row.TagNo)" type="text" size="small">编辑</el-button>
              <el-button @click="DeleteTag(scope.row._id)" type="text" size="small">删除</el-button>
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
          TextContent:'',
          CreateDate:new Date()
        },
      }
    },
    methods:{
      // 打开新增弹框
      OpenCreateDialog:function(){
        this.dialogFormVisible = true;
      },
      // 关闭新增弹框
      CloseCreateDialog:function(){
        this.dialogFormVisible = false;
      },
      // 提交时间轴
      PostTimeLineData:function(){
        var That = this;

        if(this.form.TextContent && this.form.CreateDate){
          this.SQAjax({
            Url:'/api/TimeLineCreate/backend',
            RequestData:{
              TextContent: this.form.TextContent,
              CreateDate:this.form.CreateDate
            },
            Success:function () {
              That.GetTimeLineList();
              That.CloseCreateDialog();
            }
          });
        }
      },
      // 获取时间轴列表数据
      GetTimeLineList:function () {
        var That = this;
        That.SQAjax({
          Url:'/api/TimeLineRead/backend',
          Success:function (data) {
            data.forEach(function (Item,I) {
              Item.CreateDate = Item.CreateDate.slice(0,10);
            });
            That.TimeLineList = data;
          }
        });
      }
    },
    mounted:function () {
      this.GetTimeLineList();
      this.bus.$emit('Topbar',{
        MenuHighLight:'3'
      });
    }
  }
</script>

<style scoped>

</style>
