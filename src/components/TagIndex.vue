<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OnOpenDialog()" plain>新增标签</el-button>
        </div>

        <el-dialog title="管理分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="分类名称" :label-width="formLabelWidth">
              <el-input v-model="form.TagName"></el-input>
            </el-form-item>
            <el-form-item label="分类顺序" :label-width="formLabelWidth">
              <el-input v-model="form.TagNo"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="OnDialogCancel()">取 消</el-button>
            <el-button type="primary" @click="OnDialogSubmit()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="TagList" style="width: 100%" border :header-cell-style="{background:'#f7f7f7'}">
          <el-table-column prop="TagName" label="标题名称"></el-table-column>
          <el-table-column prop="TagNo" label="排序"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditTag(scope.row._id,scope.row.TagName,scope.row.TagNo)" type="text" size="small" class="warning-color">编辑</el-button>
              <el-button @click="DeleteTag(scope.row._id)" type="text" size="small" class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TagIndex",
    data: function () {
      return {
        TagList: [],
        dialogFormVisible: false,
        form: {
          TagName: '',
          TagNo: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      /*监听新增弹框*/
      OnOpenDialog:function(){
        this.form.TagName = '';
        this.form.TagNo = '';
        this.dialogFormVisible = true;
      },
      /*监听弹框提交*/
      OnDialogSubmit:function(){
        var That = this;
        if(this.form.TagName && this.form.TagNo){
          this.SQAjax({
            Url:'/api/TagEdit/backend',
            RequestData:{
              TagName: this.form.TagName,
              TagNo: this.form.TagNo,
              TagId:this.form.TagId ? this.form.TagId : ''
            },
            Success:function (data) {
              if(That.form.TagId){
                delete That.form.TagId;
              }
              That.GetData(That);
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
      GetData: function (That) {
        That.SQAjax({
          Url:'/api/TagRead/foreend',
          Success:function (data) {
            That.TagList = data;
          }
        });
      },
      /*删除标签*/
      DeleteTag:function (Id) {
        var That = this;

        That.SQAjax({
          Url:'/api/TagDelete/backend',
          RequestData:{
            _id:Id
          },
          Success:function (data) {
            That.GetData(That);
          }
        });
      },
      /*编辑标签*/
      EditTag:function (Id,CurrentTagName,CurrentTagNo) {
        this.form.TagName = CurrentTagName;
        this.form.TagNo = CurrentTagNo;
        this.form.TagId = Id;
        this.dialogFormVisible = true;
      }
    },
    mounted: function () {
      this.GetData(this);
      this.bus.$emit('Topbar',{
        MenuHighLight:'2'
      });
    }
  }
</script>

<style scoped>

</style>
