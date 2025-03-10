<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OpenCreateDialog()" plain>创建留言</el-button>
        </div>

        <el-dialog title="管理分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="留言者" :label-width="formLabelWidth">
              <el-input v-model="form.leaveName"></el-input>
            </el-form-item>
            <el-form-item label="留言内容" :label-width="formLabelWidth">
              <el-input v-model="form.messageContent"></el-input>
            </el-form-item>
            <el-form-item label="城市" :label-width="formLabelWidth">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="头像编号(0-4)" :label-width="formLabelWidth">
              <el-input v-model="form.avator"></el-input>
            </el-form-item>
            <el-form-item label="父级留言" :label-width="formLabelWidth">
              <el-input v-model="form.parentId"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="OnDialogCancel()">取 消</el-button>
            <el-button type="primary" @click="OnDialogSubmit()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="MessageLeaveList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
          <el-table-column prop="leaveName" label="留言者"></el-table-column>
          <el-table-column prop="messageContent" label="留言内容">
            <template slot-scope="scope">
              <div v-html="scope.row.messageContent"></div>
            </template>
          </el-table-column>
          <el-table-column prop="city" label="城市"></el-table-column>
          <el-table-column prop="avator" label="头像"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditMessageLeave(scope.row)" type="text" size="small"
                class="warning-color">编辑</el-button>
              <el-button @click="DeleteTag(scope.row.id)" type="text" size="small" class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-if="MessageLeaveTotal > 10">
          <el-pagination layout="prev, pager, next" :total=MessageLeaveTotal :page-size=PagiSize
            @current-change="ChangeCurPage" @next-click="NextPage" @prev-click="NextPage">
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
      MessageLeaveTotal: 0,
      PagiSize: 15,
      dialogFormVisible: false,
      form: {
        leaveName: '',
        messageContent: '',
        // delivery: false,
        city: '',
        avator: '',
        parentId: 0,
        id: ''
      },
      formLabelWidth: '80px',
      MyCurPage: 1
    }
  },
  methods: {
    // 打开新增弹框
    OpenCreateDialog: function () {
      this.form.id = '';
      this.form.leaveName = '';
      this.form.messageContent = '';
      this.form.city = '';
      this.form.avator = '';
      this.form.parentId = 0;

      this.dialogFormVisible = true;
    },
    // 关闭新增弹框
    CloseCreateDialog: function () {
      this.dialogFormVisible = false;
    },
    /*监听弹框提交*/
    OnDialogSubmit: function () {
      var That = this;
      That.form.parentId = Number(this.form.parentId);

      if (this.form.leaveName && this.form.messageContent) {
        if (this.form.id == '') {
          this.SQAjax({
            Url: '/api/createLeaveMessage',
            RequestData: this.form,
            Success: function () {
              That.SkipTo(That.MyCurPage);
            }
          });
        }else{
          this.SQAjax({
            Url: '/api/updateLeaveMessage',
            RequestData: this.form,
            Success: function () {
              That.SkipTo(That.MyCurPage);
            }
          });
        }


        this.dialogFormVisible = false;
      }
    },
    OnDialogCancel: function () {
      if (this.form.TagId) {
        delete this.form.TagId;
      }
      this.dialogFormVisible = false;
    },
    /*渲染标签列表*/
    GetData: function () {
      var That = this;
      this.SQAjax({
        Url: '/api/leaveMessageList',
        RequestData: {
          PagnationData: {
            Skip: 0,
            Limit: 16
          }
        },
        Success: function (data) {
          if (data.length > 10) {
            data.pop();

            That.SQAjax({
              Url: '/api/getmessagenum',
              Success: function (data) {
                That.MessageLeaveTotal = data;
              }
            });
          }

          data.forEach(function (Item, I) {
            Item.createTime = Item.createTime.slice(0, 10);
          });

          That.MessageLeaveList = data;
        }
      });
    },
    // 翻页方法
    ChangeCurPage: function (CurPage) {
      this.SkipTo(CurPage);
      this.MyCurPage = CurPage;
    },
    NextPage: function (CurPage) {
      this.SkipTo(CurPage);
      this.MyCurPage = CurPage;
    },
    SkipTo: function (CurPage) {
      var That = this;
      That.SQAjax({
        Url: '/api/leaveMessageList',
        RequestData: {
          PagnationData: {
            Skip: (CurPage - 1) * 10,
            Limit: 10
          }
        },
        Success: function (data) {
          data.forEach(function (Item, I) {
            Item.createTime = Item.createTime.slice(0, 10);
          });
          That.MessageLeaveList = data;
        }
      });
    },
    /*删除标签*/
    DeleteTag: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteLeaveMessage',
        RequestData: {
          id: Id
        },
        Success: function () {
          That.SkipTo(That.MyCurPage);
        }
      });
    },
    /*编辑标签*/
    EditMessageLeave: function (Row) {
      this.form.leaveName = Row.leaveName;
      this.form.messageContent = Row.messageContent;
      this.form.city = Row.city;
      this.form.id = Row.id;
      this.form.avator = Row.avator;
      this.form.parentId = Number(Row.parentId);
      this.dialogFormVisible = true;
    },
  },
  mounted: function () {
    this.GetData();
    this.bus.$emit('Topbar', {
      MenuHighLight: '6'
    });
  }
}
</script>

<style scoped></style>
