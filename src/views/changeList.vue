<template>
  <div class="changeList">
    <div class="accounts-box clearfix">
      <el-form size="mini" class="headinput" :model="searchData">
        <div class="formLeft">
          <el-form-item label="供应商名称">
            <el-input placeholder="请输入" v-model="searchData.supplierName"></el-input>
          </el-form-item>
          <el-form-item label="账号状态">
            <el-select v-model="searchData.status" placeholder="请选择">
              <el-option label="请选择" value></el-option>
              <el-option label="待审核" value="submit"></el-option>
              <el-option label="通过" value="PASS"></el-option>
              <el-option label="驳回" value="STOP"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formRight">
          <el-button type="primary" size="mini" @click="searchFn">查询</el-button>
          <el-button type="primary" size="mini" @click="searchFn('reset')">重置</el-button>
        </div>
      </el-form>
      <el-table
        :data="changeList"
        border
        size="mini"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        class="listTable"
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column align="left" label="供应商名字">
          <template slot-scope="scope">
            <a href="javascript: void(0)" @click="lookDetail(scope.row.UPDATE_HEAD_CODE, scope.row.SUPPLIER_CODE)" style="color: #cc1235;">{{scope.row.SUPPLIER_NAME}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="UPDATEHEADCREATENAME" align="center" label="修改人"></el-table-column>
        <el-table-column align="center" label="修改时间">
          <template slot-scope="scope">{{returnDate(scope.row.UPDATEHEADCREATEDDATE)}}</template>
        </el-table-column>
        <el-table-column align="center" label="变更状态">
          <template slot-scope="scope">
          {{returnStatus(scope.row.UPDATEHEADAPPROVESTATUS)}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="scope.row.UPDATEHEADAPPROVESTATUS != 'submit'" type="primary" @click="changeDetail(scope.row.UPDATE_HEAD_CODE, scope.row.SUPPLIER_CODE)">变更审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
      <el-dialog
        title="变更详情"
        width="660px"
        @close="modifyClose"
        class="bgDetail"
        :visible.sync="modifyShow"
        size="mini"
      >
        <el-table
          :data="modifyData"
          border
          size="mini"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="UPDATE_FIELD_NAME" align="left" label="字段名称"></el-table-column>
          <el-table-column prop align="left" label="修改前" show-overflow-tooltip>
            <template slot-scope="scope"><span v-html="changeValue(scope.row, scope.row.UPDATE_BEGIN)"></span></template>
          </el-table-column>
          <el-table-column prop="UPDATE_AFTER" align="left" label="修改后" show-overflow-tooltip>
            <template slot-scope="scope"><span v-html="changeValue(scope.row, scope.row.UPDATE_AFTER)"></span></template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" v-if="ifLook">
        <el-button
              type="primary"
              size="mini"
              @click="changeApprove('pass')"
            >变更通过</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="changeApprove('stop')"
            >变更驳回</el-button>
        </div>
      </el-dialog>
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
      changeList: [],
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),
      searchData: {
        page: 1,
        size: 10,
        supplierName: "",
        status: "",
      },
      modifyShow: false,
      modifyData: [],
      changeObj: {
        updateHeadCode: '',
        headCode: '',
        status: ''
      },
      ifLook: true,
    };
  },

  mounted() {
    this.$store.commit("modifyindexSi", "2");
    this.searchFn();
  },
  methods: {
    searchFn(type) {
      if (type == "reset") {
        this.searchData = {
          supplerName: "",
          status: "",
          page: 1,
          size: 10,
        };
      }
      // 调接口
      this.getUpdateByPage();
    },
    // 返回状态
    returnStatus(val){
      if(val == 'PASS'){
        return '通过';
      } else if(val == 'STOP'){
        return '驳回';
      } else if(val == 'submit'){
        return '待审核';
      }
    },
    // 分页
    changePage(page, size) {
      console.log(page);
      this.searchData.page = page;
      this.getUpdateByPage();
    },
    // 查询
    getUpdateByPage() {
      var params = {
        supplierName: this.searchData.supplierName,
        approveStatus: this.searchData.status,
        pageNum: this.searchData.page,
        size: this.searchData.size,
      };
      console.log(params);
      this.api.getUpdateByPage(this.sso_sessionid, params).then((res) => {
        console.log(res);
        this.total = Number(res.data.count);
        this.changeList = res.data.data;
      });
    },
    // 查看详情
    changeDetail(headCode, supplierCode) {
      this.ifLook = true;
      this.changeObj.updateHeadCode = headCode;
      this.changeObj.headCode = supplierCode;
      var params = {
        updateHeadCode: headCode,
      };
      this.api.getUpdateByCode(this.sso_sessionid, params).then((res) => {
        this.modifyShow = true;
        this.modifyData = res.data.data;
        // this.changeList = res.data.data;
      });
    },
    lookDetail(headCode, supplierCode) {
      this.ifLook = false;
      this.changeObj.updateHeadCode = headCode;
      this.changeObj.headCode = supplierCode;
      var params = {
        updateHeadCode: headCode,
      };
      this.api.getUpdateByCode(this.sso_sessionid, params).then((res) => {
        this.modifyShow = true;
        this.modifyData = res.data.data;
        // this.changeList = res.data.data;
      });
    },
    modifyClose() {
      this.modifyShow = false;
      this.modifyData = [];
    },
    // 通过驳回
    changeApprove(type) {
      this.changeObj.status = type == "pass" ? "Y" : "N";
      this.api.approveByStatus(this.sso_sessionid, this.changeObj).then((res) => {
        this.modifyShow = false;
        this.$message.success("操作成功！");
        this.getUpdateByPage();
      });
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 修改值截取
    changeValue(row, value) {
      if(value){
        var arr1 = value.split(",");
        var arr = [];
        if (arr1.length > 0) {
          for (var i in arr1) {
            var arr2 = arr1[i].split("_");
            if(arr2.length>1){
              if (arr2.length > 8) {
                arr2.splice(7, 1);
              }
              arr2.splice(0, 1);
              arr.push(arr2);
            } else {
              return value;
            }
          }
        }
        if(row.UPDATE_FIELD_NAME == '人员'){
          var titleArr = ['人员类型', '姓名', '电话', '手机号', '个人邮箱', '身份证号', '职位'];
          var m = '';
          for(var j in arr){
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k == 0){
                  if(val == 1){
                    val = '主联系人'
                  } else if(val == 2){
                    val = '联系人'
                  } else if(val == 3){
                    val = '股东'
                  }
                }
                var str = titleArr[k] + '：' + val + '<br>';
                m += (str);
              }
            }
          }
          return m;
        } else if(row.UPDATE_FIELD_NAME == '资质证书'){
          var titleArr = ['证件类型', '资质名称', '资质编号', '证书有效期', '级别', '可承接范围', '附件code', '附件名称'];
          var m = '';
          for(var j in arr){
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k != 0){
                  var str = titleArr[k] + '：' + val + '<br>';
                  m += (str);
                }
              }
            }
          }
          return m;
        } else if(row.UPDATE_FIELD_NAME == '银行'){
          var titleArr = ['开户银行', '银行名称', '银行账号', '币种', '默认账户', '开户支行', '开户支行行号', '附件code', '附件名称'];
          var m = '';
          for(var j in arr){
            if(j>0){
              m += '-<br>'
            }
            for(var k in arr[j]){
              if(arr[j][k] && arr[j][k] != 'undefined' && arr[j][k] != 'null'){
                var val = arr[j][k];
                if(k != 0){
                  var str = titleArr[k] + '：' + val + '<br>';
                  m += (str);
                }
              }
            }
          }
          return m;
        }
      } else {
        return '';
      }
      
      if (value) {
        var arr1 = value.split(",");
        if (arr1.length > 1) {
          for (var i in arr1) {
            var arr2 = arr1[i].split("_");
            if (arr2.length > 8) {
              arr2.splice(7, 1);
            }
            arr2.splice(0, 1);
            arr1[i] = arr2.join("_");
            console.log(arr1[i])
          }
          return arr1.join(",");
        } else {
          var arr2 = arr1[0].split("_");
          if(arr2.length>1){
            if (arr2.length > 8) {
              arr2.splice(7, 1);
            }
            arr2.splice(0, 1);
            arr1[0] = arr2.join("_");
            return arr1.join(",");
          } else {
             return value;
          }
        }
      }
    },
  },
  components: {
    Pagination,
  },
};
</script>
<style>
.el-dialog__body {
  padding-top: 0;
}
.el-dialog__title {
  font-size: 16px !important;
}
</style>
<style lang="less" scoped>
@import "../assets/utils.less";
.changeList {
  background: #fff;
  padding-bottom: 15px;
  .el-table {
    width: 98%;
    margin: 15px auto;
  }
}
</style>