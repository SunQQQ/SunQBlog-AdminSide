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
              <el-input v-model="form.siteName"></el-input>
            </el-form-item>
            <el-form-item label="友链地址" :label-width="formLabelWidth">
              <el-input v-model="form.siteUrl"></el-input>
            </el-form-item>
            <el-form-item label="图标地址" :label-width="formLabelWidth">
              <el-input v-model="form.siteLogo"></el-input>
            </el-form-item>
            <el-form-item label="个人描述" :label-width="formLabelWidth">
              <el-input v-model="form.siteDesc"></el-input>
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
        <el-table :data="siteList" style="width: 100%" border :header-cell-style="{ background: '#f7f7f7' }">
          <el-table-column prop="siteName" label="友链名称"></el-table-column>
          <el-table-column prop="siteUrl" label="友链地址"></el-table-column>
          <el-table-column prop="siteLogo" label="图标地址" width="300" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="siteDesc" label="个人描述"></el-table-column>
          <!-- <el-table-column prop="order" label="优先级（从0开始）"></el-table-column> -->
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="EditFriendUrl(scope.row)" type="text" size="small" class="warning-color">编辑</el-button>
              <el-button @click="DeleteFriendUrl(scope.row.id)" type="text" size="small"
                class="danger-color">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-pagination layout="total,prev, pager, next" :total=FriendUrlTotal :page-size=PagiSize
          @current-change="GetData" @next-click="GetData" @prev-click="GetData">
        </el-pagination>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagIndex",
  data: function () {
    return {
      siteList: [],
      dialogFormVisible: false,
      form: {
        siteName: '',
        siteUrl: '',
        siteLogo: '',
        site: ''
      },
      formLabelWidth: '80px',

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
      if (this.form.siteDesc) {
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
    GetData: function (start) {
      var That = this;
      That.SQAjax({
        Url: '/api/getAdminSiteList',
        RequestData: {
          start: (start - 1) * That.PagiSize,
          size: That.PagiSize
        },
        Success: function (data) {
          That.MyCurPage = start;
          That.FriendUrlTotal = data.total;
          That.siteList = data.list;
        }
      });
    },
    /*删除标签*/
    DeleteFriendUrl: function (Id) {
      var That = this;

      That.SQAjax({
        Url: '/api/deleteSite',
        RequestData: {
          id: Id
        },
        Success: function (data) {
          That.$message('删除成功');
          That.GetData(That.MyCurPage);
        }
      });
    },
    /*编辑标签*/
    EditFriendUrl: function (RowData) {
      this.OnOpenDialog();
      this.form = RowData;
    }
  },
  mounted: function () {
    this.GetData(1);
    this.bus.$emit('Topbar', {
      MenuHighLight: '5'
    });
  }
}
</script>

<style scoped></style>
