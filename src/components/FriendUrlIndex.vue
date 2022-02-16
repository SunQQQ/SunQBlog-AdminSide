<template>
  <div>
    <div class="RightContent">
      <div class="ArticleList">
        <div style="margin-bottom:10px">
          <el-button type="primary" @click="OnOpenDialog()" plain>新增友链</el-button>
        </div>

        <el-dialog title="管理友链" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="网站名称" :label-width="formLabelWidth">
              <el-input v-model="form.FriendUrlNickName"></el-input>
            </el-form-item>
            <el-form-item label="友链地址" :label-width="formLabelWidth">
              <el-input v-model="form.FriendUrlAdress"></el-input>
            </el-form-item>
            <el-form-item label="图标地址" :label-width="formLabelWidth">
              <el-input v-model="form.FriendUrlIcoUrl"></el-input>
            </el-form-item>
            <el-form-item label="个人描述" :label-width="formLabelWidth">
              <el-input v-model="form.FriendUrlDescript"></el-input>
            </el-form-item>
            <el-form-item label="优先级" :label-width="formLabelWidth">
              <el-input v-model="form.order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="OnDialogCancel()">取 消</el-button>
            <el-button type="primary" @click="OnDialogSubmit()">确 定</el-button>
          </div>
        </el-dialog>

        <!--表格操作栏-->
        <el-table :data="FriendUrlList" style="width: 100%" border :header-cell-style="{background:'#f7f7f7'}">
          <el-table-column prop="FriendUrlNickName" label="友链名称"></el-table-column>
          <el-table-column prop="FriendUrlAdress" label="友链地址"></el-table-column>
          <el-table-column prop="FriendUrlIcoUrl" label="图标地址" width="300" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="FriendUrlDescript" label="个人描述"></el-table-column>
          <el-table-column prop="order" label="优先级（从0开始）"></el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditFriendUrl(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="DeleteFriendUrl(scope.row._id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <div v-if="FriendUrlTotal>10">
          <el-pagination layout="prev, pager, next,total"
                         :total=FriendUrlTotal
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
      FriendUrlList: [],
      dialogFormVisible: false,
      form: {
        FriendUrlNickName: '',
        FriendUrlAdress: '',
        FriendUrlIcoUrl: '',
        FriendUrlDescript: ''
      },
      formLabelWidth: '120px',

      FriendUrlTotal: 0,
      PagiSize: 10,
      MyCurPage: 1
    }
  },
  methods: {
    /*监听新增弹框*/
    OnOpenDialog: function () {
      // 清空表单数据
      this.form = {};
      this.dialogFormVisible = true;
    },
    /*监听弹框提交*/
    OnDialogSubmit: function () {
      var That = this;
      if (this.form.FriendUrlDescript) {
        this.SQAjax({
          Url: '/api/FriendUrlEditor/backend',
          RequestData: That.form,
          Success: function (data) {
            if (That.form._id) {
              delete That.form._id;
            }
            That.SkipTo(That.MyCurPage);
          }
        });

        this.dialogFormVisible = false;
      }
    },
    OnDialogCancel: function () {
      if (this.form._id) {
        delete this.form._id;
      }
      this.dialogFormVisible = false;
    },
    /*渲染标签列表*/
    GetData: function () {
      var That = this;
      That.SQAjax({
        Url: '/api/FriendUrlRead/foreend',
        RequestData: {
          PagnationData: {
            Skip: 0,
            Limit: 11
          }
        },
        Success: function (data) {
          if (data.length > 10) {
            data.pop();

            That.SQAjax({
              Url: '/api/getfriendurlnum',
              Success: function (data) {
                That.FriendUrlTotal = data;
              }
            });
          }

          That.FriendUrlList = data;
        }
      });
    },
    /*删除标签*/
    DeleteFriendUrl: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/FriendUrlDelete/backend',
        RequestData: {
          _id: Id
        },
        Success: function (data) {
          That.$message('删除成功');
          That.SkipTo(That.MyCurPage);
        }
      });
    },
    /*编辑标签*/
    EditFriendUrl: function (RowData) {
      this.OnOpenDialog();
      this.form = RowData;
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
        Url: '/api/FriendUrlRead/foreend',
        RequestData: {
          PagnationData: {
            Skip: (CurPage - 1) * 10,
            Limit: 10
          }
        },
        Success: function (data) {
          That.FriendUrlList = data;
        }
      });
    }
  },
  mounted: function () {
    this.GetData();
    this.bus.$emit('Topbar', {
      MenuHighLight: '5'
    });
  }
}
</script>

<style scoped>

</style>
