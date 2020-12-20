<template>
  <div class="starLevel">
    <div class="starLevel-box clearfix">
      <el-form size="mini" class="headinput" :model="searchForm" label-width="100px">
        <div class="formLeft">
          <el-form-item label="评星定级时间">
            <el-date-picker v-model="searchForm.starHeadDate" type="month" placeholder="选择时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input placeholder="请输入" v-model="searchForm.supplierName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="供应商类别">
            <el-input placeholder="请输入" v-model="searchForm.supplierName"></el-input>
          </el-form-item>-->
        </div>
        <div class="formRight">
          <el-button type="primary" size="mini" v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C19')" @click="searchFn">查询</el-button>
          <el-button type="primary" size="mini" v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C19')" @click="searchFn('reset')">重置</el-button>
          <el-button type="primary" size="mini" v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C11')" @click="starRating">评星定级</el-button>
        </div>
      </el-form>
      <el-table
        :data="accountsData"
        border
          :cell-class-name="hoverClassFn"
        size="mini"
        class="listTable"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;margin: 20px auto;"
        :row-style="rowStyleFn"
      >
        <!-- @selection-change="handleSelectionChange" -->
        <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="supplierName" align="left" label="名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript: void(0)" style="color: #cb1235;" @click="lookFn(scope.row.starHeadCode, scope.row.starHeadDate, scope.row.starType)">{{scope.row.starHeadDate+'评星定级'}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="审批状态" width="110">
          <template slot-scope="scope">
            <blockquote class="blockquoteClass">
              <button type="default" class="DbtnClass" size="mini" v-if="!scope.row.statusDesc">未起件</button>
              <button
                class="btnClass btnClass_bjz"
                type="default"
                size="mini"
                v-if="scope.row.statusDesc == '编制中'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_yzz"
                type="default"
                size="mini"
                v-if="scope.row.statusDesc == '已终止'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_yth"
                size="mini"
                v-if="scope.row.statusDesc == '已退回'"
                slot="reference"
                type="default"
              >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_spz"
                type="default"
                size="mini"
                v-if="scope.row.statusDesc == '审批中'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_yqh"
                type="default"
                size="mini"
                v-if="scope.row.statusDesc == '已取回'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
              <button
                class="btnClass btnClass_ytg"
                type="success"
                size="mini"
                v-if="scope.row.statusDesc == '已通过'"
                slot="reference"
              >{{scope.row.statusDesc}}</button>
            </blockquote>

            <div class="el_Popver">
              <div class="popoverClass">
                <div class="jtCss"></div>
                <div class="clickClass">
                  <span style="float:left;">审定：</span>
                  <p @click="toApproval(scope.row.approveUrl)">{{scope.row.approveNumber}}</p>
                </div>
                <span>加急：{{scope.row.urgent == "Y" ? '是' : '否'}}</span>
                <span>状态：【{{scope.row.statusDesc}}】</span>
                <div class="lineDiv"></div>
                <span class="h">当前审批人：{{scope.row.assigneeName}}</span>
                <span class="h">下一审批环节：{{scope.row.nextTaskName}}</span>
              </div>
              <div class="popperArrow"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="starHeadDate" align="center" label="评级日期"></el-table-column>
        <el-table-column align="center" label="评级类型">
          <template slot-scope="scope">
            {{scope.row.starType == 'e1'? '年中' : '年末'}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            
            <div v-if="scope.row.approveStatus == 'WORK' || scope.row.approveStatus == 'EDIT' || scope.row.approveStatus == 'submit' || scope.row.approveStatus == 'PASS'">
              <span>禁止操作</span>
            </div>
            <div v-else>
              <el-button
                @click="changeFn(scope.row.starHeadCode, scope.row.starHeadDate, scope.row.starType)"
                type="text"
                size="mini"
                v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C11')"
              >编辑</el-button>
              <el-button
                @click="changeFn(scope.row.starHeadCode, scope.row.starHeadDate, scope.row.starType)"
                type="text"
                v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C11')"
                size="mini"
              >发起审批</el-button>
              <el-button
                @click="delectFn(scope.row.starHeadCode)"
                type="text"
                size="mini"
                v-if="hasQx('aph2_supplier_GYSPXDJ-QX-C11')"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :currentPage="currentPage" :total="total" @changePage="changePage"></Pagination>
    </div>

    <div class="star">
      <el-dialog
        title="评星定级"
        @close="starCloseFn"
        :visible.sync="starLevelShow"
        width="1200px"
        top="10vh"
      >
        <div class="ssTj">
          <span>评星定级日期</span>
          <el-date-picker
            v-model="starHeadDate"
            type="date"
            size="mini"
            value-format="yyyy-MM-dd"
            placeholder="选择时间"
          ></el-date-picker>
          <span>评星定级类型</span>
          <el-select v-model="starType" size="mini" placeholder="请选择">
            <el-option label="年中" value="e1"></el-option>
            <el-option label="年末" value="e2"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="searchStarList">查询</el-button>
        </div>
        <el-table :data="starLevelList2"
        :row-class-name="tableRowClassName"
          @selection-change="choseFn"
         border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column type="selection" :selectable="selectInit" width="50" align="center"></el-table-column>
          <el-table-column prop="SUPPLIER_NAME" label="供应商名称" align="center" width="100"></el-table-column>
          <el-table-column
            prop="SUPPLIER_SORT_NAME"
            label="供应商类别"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="SUPPLIER_SCORE" label="入库得分" align="center">
            <template slot-scope="scope">{{scope.row.SUPPLIER_SCORE || 0}}</template>
          </el-table-column>
          <el-table-column prop="DAY_ESTIMATE_SCORE" label="评分加权平均" align="center">
            <template slot-scope="scope">{{scope.row.DAY_ESTIMATE_SCORE || 0}}</template>
          </el-table-column>
          <el-table-column prop="YEAR_ESTIMATE_SCORE" label="半年度/年度考评" align="center" width="100">
            <template slot-scope="scope">{{scope.row.YEAR_ESTIMATE_SCORE || 0}}</template>
          </el-table-column>
          <el-table-column prop="STARCHANGESCORE" label="调剂分值（-10~10分）" align="center" width="100">
            <template slot-scope="scope">{{scope.row.STARCHANGESCORE || 0}}</template>
          </el-table-column>
          <el-table-column prop="SUPPLIER_STAR" label="历史星级" align="center" width="100">
            <template slot-scope="scope">{{scope.row.SUPPLIER_STAR || 0}}星</template>
          </el-table-column>
          <el-table-column prop="COUNTSCORE" label="综合得分" align="center" width="100">
            <template slot-scope="scope">{{scope.row.COUNTSCORE || 0}}</template>
          </el-table-column>
          <el-table-column prop="STAR_LINE_LEVEL" label="星级" align="center" width="80">
            <template slot-scope="scope">{{returnStar(scope.row)}}星</template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="80">
            <template slot-scope="scope">{{returnStatus(scope.row.APPROVE_STATUS)}}</template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="100">
            <template slot-scope="scope">
              <el-input :disabled="scope.row.starLevelLook" v-model="scope.row.STAR_ADD_REMARK" size="mini"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button size="mini" @click="starCloseFn">取 消</el-button>
          <el-button :disabled="starLevelLook" size="mini" type="primary" @click="saveFn">保存</el-button>
          <el-button
            :disabled="starLevelLook"
            size="mini"
            type="primary"
            @click="starApproveFn"
          >发起审定</el-button>
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
      accountsData: [],
      sso_sessionid: sessionStorage.getItem("sso_sessionid"),
      searchForm: {
        pageNum: 1,
        size: 10,
        supplierName: "",
        starHeadDate: "",
      },
      starLevelShow: false,
      starLevelList2: [], // 评星定级列表2
      starHeadDate: "",
      starHeadCode: "",
      starLevelLook: false,
      starType: '',
      selectArr: []
    };
  },

  mounted() {
    this.$store.commit("modifyindexSi", "6");
    this.searchFn();
  },
  methods: {
    
    // 列表多选 状态改变事件
    choseFn(arr) {
      this.selectArr = arr;
    },
    // 判断是否起件
    weiqijian(status) {
      if (this.headInputData.type != "4" && this.headInputData.type != "5") {
        if (status == "7" || status == "8" || status == "9") {
          return false;
        } else {
          return true;
        }
      } else {
        if (status == "10" || status == "10.1" || status == "10.2") {
          return false;
        } else {
          return true;
        }
      }
    },
    // 评星定级弹窗 关闭事件
    starCloseFn() {
      this.starLevelShow = false;
      this.starLevelList2 = [];
      this.starLevelLook = false;
    },

// 评星定级行颜色
    tableRowClassName({row, rowIndex}){
      if (row.starLevelLook) {
          return 'success-row';
      }
      return '';
    },

    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    // 生成星级
    returnStar(row) {
      return this.commonFn.returnStar(row);
    },
    returnStatus(s){
      if(s == 'edit'){
        return '编制中';
      } else if(s == 'submit'){
        return '审批中';
      } else if(s == 'PASS'){
        return '已通过';
      } else {
        return '';
      } 
    },

    // 评星定级发起审定
    async starApproveFn() {
      this.$confirm("确认对此次评星定级发起审批?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.saveFn("approve");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // sss
    selectInit(row, index) {
      if (row.APPROVE_STATUS && row.APPROVE_STATUS != "STOP") {
        return false;
      } else {
        return true;
      }
    },
    // 保存事件
    saveFn(from) {
      if(this.selectArr.length == 0){
        this.$message.error('数据为空，不能保存！');
        return false;
      }
      var data = this.selectArr[0];
      // if(!data.starChangScore){
      //   this.$message.error('调剂分值不能为空！');
      //   return false;
      // }
      var params = {
        starHeadDate: this.starHeadDate,
        starHeadCode: this.starHeadCode, //评星定级HeadCode,有须传，没有不传
        starType: this.starType,
        starLineList: [],
      };
      for (var i in this.selectArr) {
        if(!this.selectArr[i].starLevelLook){
          var item = {
            estimateHeadCode: this.selectArr[i].estimateHeadCode, //评估code
            starAddRemark: this.selectArr[i].STAR_ADD_REMARK, //评星定级说明
            starAddScore: this.selectArr[i].STARCHANGESCORE, // 调机分
            starEstimateScore: this.selectArr[i].YEAR_ESTIMATE_SCORE, // 半年全年评分
            starHeadCode: this.selectArr[i].STAR_HEAD_CODE,
            starLineCode: this.selectArr[i].STAR_LINE_CODE, // 评星定级LineCode,有须传，没有不传
            // starLineLevel: this.selectArr[i].STAR_LINE_LEVEL,
            starLineLevel: 1,
            starLineScore: this.selectArr[i].SUPPLIER_SCORE, // 初始得分
            starLineWeightedScore: this.selectArr[i].DAY_ESTIMATE_SCORE, //加权评分
            supplierCode: this.selectArr[i].SUPPLIER_CODE,
          };
          params.starLineList.push(item);
        }
      }
      console.log(params);
      if(params.length == 0){
        this.$message.error('可保存的数据为空，不能保存！');
        return false;
      }
      // return false;
      this.api.saveStar(this.sso_sessionid, params).then((res) => {
        this.approveHeadCode = res.data.message;
        if (from == "approve") {
          this.starApprove2();
        } else {
          this.$message.success("保存成功！");
          this.starCloseFn();
          this.searchFn();
        }
      });
    },

    starApprove2() {
      var params = {
        approveContent: "评星定级-内容",
        approveTitle: "评星定级-标题",
        approveHeadCode: this.approveHeadCode,
      };
      this.api
        .getApproveByStarHead(this.sso_sessionid, params)
        .then((res) => {
          this.starCloseFn();
          window.open(res.data.message);
        });
    },

    // 查看详情
    lookFn(code, date, starType) {
      this.starLevelShow = true;
      this.starLevelLook = true;
      this.starHeadCode = code;
      this.starHeadDate = date;
      this.starType = starType;
      this.searchStarList('look');
    },
    // 编辑、发起审定
    changeFn(code, date, starType) {
      this.starLevelShow = true;
      this.starHeadCode = code;
      this.starHeadDate = date;
      this.starType = starType;
      this.searchStarList();
    },
    // 删除
    delectFn(code){
      var params = {
        starHeadCode: code
      }
      this.api.delByStar(this.sso_sessionid, params).then((res) => {
        this.$message.success('删除成功！');
        this.searchFn();
      });
    },
    // 评星定级
    starRating() {
      this.starLevelShow = true;
      let date = new Date();
      this.starHeadDate = this.returnDate(date);
      console.log(this.starHeadDate);
    },
    // 查询评星定级列表（弹窗)
    searchStarList(type) {
      if (!this.starHeadDate) {
        this.$message.error("评星定级日期不能为空！");
        return false;
      }
      if (!this.starType) {
        this.$message.error("评星定级类型不能为空！");
        return false;
      }
      var params = {
        starHeadDate: this.starHeadDate,
        starHeadCode: this.starHeadCode,
        starType: this.starType,
      };
      this.api.getStarListByHead(this.sso_sessionid, params).then((res) => {
        this.starLevelList2 = res.data.data;
        var len = this.starLevelList2.length;
        var starLevelLook = 0;
        if(len>0){
          for(let i in this.starLevelList2){
            if(this.starLevelList2[i].APPROVE_STATUS == 'submit'){
              starLevelLook++;
              this.starLevelList2[i].starLevelLook = true;
            }
            if(this.starLevelList2[i].APPROVE_STATUS == 'PASS'){
              this.starLevelList2[i].starLevelLook = true;
            }
          }
        }
        if(type == 'look'){
          this.starLevelLook = true;
          return false;
        }
        // if(starLevelLook > 0){
        if(starLevelLook == len){
          this.starLevelLook = true;
          this.$message.error('评星定级审批中，暂时无法进行任何操作！');
        } else {
          this.starLevelLook = false;
        }
      });
    },

    // 分页回调
    changePage(page, size) {
      this.searchForm.pageNum = page;
      this.searchFn();
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    // 列表勾选事件
    handleSelectionChange(rows) {
      console.log(rows);
    },
    // 每行的特殊处理
    rowStyleFn({ row, rowIndex }) {
      // console.log(row, rowIndex);
    },
    // 查询/重置   获取首页列表
    searchFn(type) {
      if (type == "reset") {
        this.searchForm = {
          pageNum: 1,
          size: 10,
          supplierName: "",
          starHeadDate: "",
        };
      }
      this.api
        .getStartByPage(this.sso_sessionid, this.searchForm)
        .then((res) => {
          console.log(res);
          this.accountsData = res.data.data;
          this.total = Number(res.data.count);
        });
    },
    // 给审批按钮加类名
    hoverClassFn(row) {
      if (row.columnIndex == 2) {
        return "hoverClass";
      } else {
        return "";
      }
    },
    // 审定跳转
    toApproval(url) {
      if (url) {
        window.open(url);
      }
    },
  },
  components: {
    Pagination,
  },
};
</script>
<style>
.star .el-dialog__body {
  padding: 0 20px !important;
}

.el-table__body-wrapper {
  overflow: inherit!important;
}
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<style lang="less" scoped>
@import "../assets/utils.less";
.starLevel {
  @box();
  .headinput {
    height: auto;
  }
}
.formLeft {
  width: 90%;
}
.formLeft .el-form-item {
  width: 32%;
}
.formRight {
  float: right;
  margin-bottom: 20px;
  width: 100%;
  padding-right: 0;
}
.listTable {
      width: 98%;
      margin-bottom: 20px;
      float: left;
      margin-left: 1%;
      overflow: inherit;
    }
.star {
  .info {
    width: 100%;
    float: left;
    padding: 6px 0;
    p {
      float: left;
      width: 50%;
      line-height: 24px;
      padding-left: 20px;
      .ctspan {
        width: 360px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .ssTj {
    width: 100%;
    float: left;
    margin: 10px;
    span {
      float: left;
      line-height: 30px;
      margin-right: 10px;
    }
    .el-input {
      margin-right: 10px;
      float: left;
    }
    button{
      margin-left: 10px;
    }
  }
}

.el_Popver {
  min-width: 240px;
  position: absolute;
  top: -50px;
  left: 92%;
  z-index: 2007;
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 10px;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  display: none;
}
.popoverClass .clickClass {
  height: 20px;
  background: none;
  line-height: 1;
  margin: 0;
  width: 100%;
}
.popoverClass {
  span {
    display: block;
    line-height: 20px;
    font-size: 12px;
  }
  p {
    font-size: 13px;
    line-height: 20px;
  }
}
.clickClass span {
  display: inline-block;
}
.clickClass p:hover {
  cursor: pointer;
}
.clickClass p {
  float: left;
  margin-right: 0;
  margin-bottom: 0;
  padding: 0;
  width: auto;
  white-space: nowrap;
  line-height: 20px;
  word-break: break-all;
  color: #1e88e5;
}
.hoverClass button:hover {
  cursor: pointer;
}
.hoverClass .cell:hover .blockquoteClass + .el_Popver {
  display: block;
}
.jtCss {
  margin-left: -23px;
  margin-top: 44px;
  float: left;
  width: 0 !important;
  height: 0 !important;
  border-width: 6px;
  border-style: solid;
  border-color: transparent #fff transparent transparent;
  background: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>