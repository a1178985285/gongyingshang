<template>
  <div class="accounts">
    <div class="accounts-box clearfix">
      <el-form size="mini" class="headinput" :model="searchForm">
        <div class="formLeft">
          <el-form-item label="年份">
            <el-date-picker
              value-format="yyyy"
              v-model="searchForm.estimateHeadYear"
              type="year"
              placeholder="选择年份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input placeholder="请输入" v-model="searchForm.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="评估类型">
            <el-select v-model="searchForm.estimateHeadType" placeholder="请选择">
              <el-option label="年中评估" value="e1"></el-option>
              <el-option label="年末评估" value="e2"></el-option>
              <el-option label="入库评估" value="e3"></el-option>
              <el-option label="支出凭单" value="e4"></el-option>
              <el-option label="付款合同付款" value="e5"></el-option>
              <el-option label="付款合同结算" value="e6"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formRight">
          <el-button type="primary" size="mini" v-if="hasQx('aph2_supplier_GYSNDKH-QX-C19')" @click="searchFn">查询</el-button>
          <el-button type="primary" size="mini" v-if="hasQx('aph2_supplier_GYSNDKH-QX-C19')" @click="searchFn('reset')">重置</el-button>
        </div>
      </el-form>
      <el-table
        :data="accountsData"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;margin: 20px auto;"
        :row-style="rowStyleFn"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="supplierName" align="left" label="供应商名称"></el-table-column>
        <el-table-column prop="supplierSortName" align="left" label="供应商类别" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" label="评估类型">
          <template slot-scope="scope">
            <span>{{returnPgType(scope.row.estimateHeadType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="estimateHeadYear" align="center" label="年份"></el-table-column>
        <el-table-column prop="estimateScore" align="center" width="120" label="得分">
          <template slot-scope="scope">
            <span>{{scope.row.estimateScore == 0 ? '' : scope.row.estimateScore}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{returnDate(scope.row.createdDate)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="staffName" align="center" label="创建人"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{returnStatus(scope.row.estimateHeadStatus)}}</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "../components/pagination";
import memberList from "../components/memberList";
export default {
  data() {
    return {
      accountsData: [],
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),
      searchForm: {
        pageNum: 1,
        size: 10,
        supplierName: "",
        estimateHeadType: "",
        estimateHeadYear: "",
        approveStatus: "submit",
      },
      pgPeople: [],
      selectArr: [],
      currentPage: 1,
      total: 0,
    };
  },

  mounted() {
    this.$store.commit("modifyindexSi", "5");
    let date = new Date();
    this.searchForm.estimateHeadYear = date.getFullYear().toString();
    this.searchFn();
  },
  methods: {
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 分页
    changePage(page, size) {
      this.searchForm.pageNum = page;
      this.searchFn();
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    returnPgType(type) {
      if (type == "e1") {
        return "年中评估";
      } else if (type == "e2") {
        return "年末评估";
      } else {
        return type;
      }
    },
    // 状态返回
    returnStatus(value) {
      switch (value) {
        case "edit": {
          return "评估中";
          break;
        }
        case "submit": {
          return "发起评估";
          break;
        }
        case "PASS": {
          return "通过";
          break;
        }
        case "": {
          return "";
          break;
        }
      }
    },
    handleSelectionChange(rows) {
      this.selectArr = rows;
    },
    // 每行的特殊处理
    rowStyleFn({ row, rowIndex }) {
      // console.log(row, rowIndex);
    },
    // 查看详情
    lookFn() {},
    // 查询/重置
    searchFn(type) {
      if (type == "reset") {
        this.searchForm = {
          pageNum: 1,
          size: 10,
          supplierName: "",
          estimateHeadType: "",
          estimateHeadYear: "",
          approveStatus: "submit",
        };
      }
      this.api
        .getSupplierListByPage(this.sso_sessionid, this.searchForm)
        .then((res) => {
          this.accountsData = res.data.data;
          this.total = Number(res.data.count);
        });
    },
  },
  components: {
    Pagination,
  },
};
</script>
<style>
.el-dialog__body {
  padding: 10px 20px;
}
</style>
<style lang="less" scoped>
@import "../assets/utils.less";
.accounts {
  @box();
  .pgArea {
    .el-dialog__body {
      .radioRoup {
        width: 100%;
        float: left;
        line-height: 24px;
        white-space: normal;
      }
      h4 {
        line-height: 36px;
        border-bottom: 1px solid #ccc;
      }
      .el-form {
        margin-top: 20px;
      }
      .el-input {
        width: 160px;
      }
      .cell .el-input {
        width: 100%;
      }
      .el-select--mini {
        width: 160px !important;
      }
      .el-textarea {
        width: 430px;
      }
      .info {
        margin-top: 10px;
      }
      .info p {
        display: inline-block;
        width: 50%;
        line-height: 24px;
      }
      .info p span {
        margin-right: 10px;
        width: 100px;
        text-align: right;
        float: left;
      }
      .info p span.ctspan {
        width: 173px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mubanSpan {
        margin-left: 20px;
      }
    }
  }
}
.headinput {
  height: auto !important;
  .formLeft {
    width: 80%;
  }
  .formLeft .el-form-item {
    width: 32%;
  }
  .formRight {
    float: right;
    margin-bottom: 20px;
    width: 50%;
    padding-right: 0;
  }
}
</style>