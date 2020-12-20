<template>
  <div class="accounts">
    <div class="accounts-box clearfix">
      <el-form size="mini" class="headinput" :model="searchForm">
        <div class="formLeft">
          <el-form-item label="供应商名称">
            <el-input placeholder="请输入" v-model="searchForm.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="停用" value="N"></el-option>
              <el-option label="启用" value="Y"></el-option>
              <el-option label="未启用" value="W"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号">
            <el-input placeholder="请输入" v-model="searchForm.loginName"></el-input>
          </el-form-item>
        </div>
        <div class="formRight">
          <el-button type="primary" size="mini" @click="searchFn">查询</el-button>
          <el-button type="primary" size="mini" @click="searchFn('reset')">重置</el-button>
        </div>
      </el-form>
          <el-table
            :data="accountsData"
            border
            size="mini"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            style="width: 100%;margin: 20px auto;"
            :row-style="rowStyleFn"
            >
            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
            <el-table-column prop="supplierName" align="left" label="供应商名称"></el-table-column>
            <el-table-column prop="slLoginName" align="center" label="账号"></el-table-column>
            <el-table-column prop="statusName" align="center" label="账号状态"></el-table-column>
            <el-table-column prop="cdate" align="center" label="注册时间"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.status == 'N'"
                  @click="startStopUse(scope.row.slCode, scope.row.status)"
                  type="text"
                  size="mini"
                >启用</el-button>
                <el-button
                  v-if="scope.row.status == 'Y'"
                  @click="startStopUse(scope.row.slCode, scope.row.status)"
                  type="text"
                  size="mini"
                >停用</el-button>
                <el-button
                  v-if="!scope.row.status"
                  @click="scFn(scope.row.supplierCode)"
                  type="text"
                  size="mini"
                >生成</el-button>
                <el-button
                  v-if="!scope.row.status || !scope.row.supplierStatus"
                  @click="changeFn(scope.row.supplierCode)"
                  type="text"
                  size="mini"
                >修改</el-button>
                <el-button
                  v-if="scope.row.status" type="text" @click="upateByPasswordFn(scope.row.slCode)" size="mini">重置密码</el-button>
              </template>
            </el-table-column>
          </el-table>
      <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "../components/pagination";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      accountsData: [],
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),
      searchForm: {
        pageNum: 1,
        size: 10,
        supplierName: "",
        loginName: "",
        status: ""
      }
    };
  },

  mounted() {
    this.$store.commit("modifyindexSi", "3");
    this.searchFn();
  },
  methods: {
    // 每行的特殊处理
    rowStyleFn({ row, rowIndex }) {
      console.log(row, rowIndex);
    },
    // 启动/停用事件
    startStopUse(code, status) { 
      if(status == 'N'){
        var sta = 'Y';
      } else {
        var sta ="N";
      }
      var params = {
        slCode: code,
        status: sta
      };
      this.api.updateByStatus(this.sso_sessionid, params).then(res => {
        this.$message.success("操作成功！");
        this.searchFn();
      });
    },
    // 重置密码
    async upateByPasswordFn(code) {
      this.$confirm("确认重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          console.log(code)
          await this.upateByPassword(code);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    upateByPassword(code) {
      var params = {
        slCode: code
      };
      this.api.upateByPassword(this.sso_sessionid, params).then(res => {
        this.$message.success("密码重置成功！");
        this.searchFn();
      });
    },
    scFn(code){
      this.api.saveByLogin(this.sso_sessionid, {supplierCode: code}).then(res => {
        this.$message.success("操作成功！");
        this.searchFn();
      });
    },
    changeFn(code){
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "edit",
          supplierCode: code,
        },
      });
      var winObj = window.open(href, "_blank");
      var loop = setInterval(() => {
        if (winObj.closed) {
          clearInterval(loop);
          this.getListByPageFn();
        }
      }, 1000);
    },
    // 分页
    changePage(page, size) {
      console.log(page);
      this.searchForm.pageNum = page;
      this.searchFn();
    },
    // 查询/重置
    searchFn(type){
      if(type == 'reset'){
        this.searchForm = {
          pageNum: 1,
          size: 10,
          supplierName: "",
          loginName: "",
          status: ""
        }
      }
      this.api.getLoginList(this.sso_sessionid, this.searchForm).then(res => {
        console.log(res);
        this.accountsData = res.data.data;
        this.total = Number(res.data.count);
      });
    },
  },
  components: {
    Pagination
  }
};
</script>

<style lang="less" scoped>
@import "../assets/utils.less";
.accounts {
  @box();
}
.formLeft{
  width: 70%;
}
.formLeft .el-form-item {
  width: 32%;
}
.formRight{
  width: 20%;
}
</style>