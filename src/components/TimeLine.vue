<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OpenCreateDialog()" plain>新增时间轴</el-button>
        </div>

        <el-dialog title="新增时间轴" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="文本名称" :label-width="formLabelWidth">
              <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-date-picker v-model="form.content_date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" placeholder="创建日期"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="CloseCreateDialog()">取 消</el-button>
            <el-button type="primary" @click="PostTimeLineData()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="TimeLineList" style="width: 100%" border :header-cell-style="{background:'#f7f7f7'}">
          <el-table-column prop="content" label="事件内容"></el-table-column>
          <el-table-column prop="content_date" label="事件日期"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditTag(scope.row._id,scope.row.TagName,scope.row.TagNo)" type="text" size="small" class="warning-color">编辑</el-button>
              <el-button @click="Delete(scope.row.id)" type="text" size="small" class="danger-color">删除</el-button>
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
        formLabelWidth: '80px',
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
          Url:'/api/getTimeLineList',
          Success:function (data) {
            That.TimeLineList = data;
          }
        });
      },
      /**
       * 删除时间轴
       * @param CommentId 该条评论的id
       * @param ArticleId 文章id
       * @constructor
       */
      Delete:function (Id) {
        var That = this;

        That.SQAjax({
          Url:'/api/deleteTimeLine',
          RequestData:{
            id:Id
          },
          Success:function (data) {
            That.$message('删除成功');
            That.GetTimeLineList();
          }
        });
      },
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
