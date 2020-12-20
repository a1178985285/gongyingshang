<template>
  <div class="kcDbPage">
    <div class="xckcArea">
      <h4 style="margin-bottom: 12px;">基本信息</h4>
      <div class="kcJbxx">
        <span>供应商名称</span>
        <p :title="kcJbxx.SUPPLIER_NAME">{{kcJbxx.SUPPLIER_NAME}}</p>
      </div>
      <div class="kcJbxx">
        <span>企业性质</span>
        <p>{{kcJbxx.ESTABLISHMENT_NATURE}}</p>
      </div>
      <div class="kcJbxx">
        <span>法定代表人</span>
        <p>{{kcJbxx.CEO_NAME}}</p>
      </div>
      <div class="kcJbxx">
        <span>企业注册年份</span>
        <p>{{kcJbxx.ESTABLISHMENT_FOUND_DATE}}</p>
      </div>
      <div class="kcJbxx">
        <span>企业注册地址</span>
        <p :title="kcJbxx.ESTABLISHMENT_REGISTER_ADDRESS">{{kcJbxx.ESTABLISHMENT_REGISTER_ADDRESS}}</p>
      </div>
      <div class="kcJbxx">
        <span>注册资本</span>
        <p>{{kcJbxx.REGISTERED_CAPITAL}}</p>
      </div>
      <div class="kcJbxx">
        <span>服务区域</span>
        <p :title="kcJbxx.SUPPLIER_SERVICEREGION">{{kcJbxx.SUPPLIER_SERVICEREGION}}</p>
      </div>
      <div class="kcJbxx">
        <span>供应商类别</span>
        
        <p :title="kcJbxx.SUPPLIER_SORT_NAME">{{kcJbxx.SUPPLIER_SORT_NAME}}</p>
      </div>
      <el-form :model="xckcForm" :inline="true" size="mini" :disabled="true">
        <h4>考察模板及人员设置</h4>
        <el-form-item label="考察组长" :label-width="formLabelWidth">
          <el-input
            :title="xckcForm.inspectLeaderName"
            v-model="xckcForm.inspectLeaderName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="考察组员" :label-width="formLabelWidth">
          <el-input
            :title="xckcForm.inspectMembersName"
            v-model="xckcForm.inspectMembersName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="考察项目" :label-width="formLabelWidth">
          <el-input v-model="xckcForm.inspectItem" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="考察时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="xckcForm.inspectDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div>
        <h4>考察报告</h4>
        <div class="bgMuban"></div>
        <el-form :model="passForm" :inline="true" size="mini">
          <el-form-item style="width:100%" label="考察模板" :label-width="formLabelWidth">
            <a v-for="(item, index) in modelList" :key="index" href target="_blank">{{item}}</a>
          </el-form-item>
          <el-form-item label="考察得分" :label-width="formLabelWidth">
            <el-input v-model="passForm.inspectScore" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:100%" label="考察意见" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="passForm.inspectOpinion" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:100%" label="考察报告" :label-width="formLabelWidth">
            <el-upload
              class="upload-demo"
              :action="actionUrl"
              :data="uploadData"
              :on-success="(res, file, fileList)=> uploadSuccess(res, file, fileList)"
              :on-exceed="exceedFn"
              :file-list="bgFileList"
              :limit="10"
              :multiple="true"
            >
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="footerDiv">
        <el-button size="mini" @click="ksClose">取 消</el-button>
        <el-button size="mini" type="primary" @click="kcPassNot('转备选')">转为备选</el-button>
        <el-button size="mini" type="primary" @click="kcPassNot('考察不通过')">考察不通过</el-button>
        <el-button size="mini" type="primary" @click="kcPass('通过')">考察通过</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import base from "../api/base";
export default {
  data() {
    return {
      propsType: {
        multiple: true,
        children: "nodeList",
        label: "name",
        value: "id",
      },

      xckcForm: {
        inspectLeaderName: "",
        inspectMembersName: "",
        inspectLeader: "",
        inspectMembers: "",
        inspectLeaderArr: "",
        inspectMembersArr: "",
        inspectDate: "",
        inspectItem: "",
        inspectType: "1",
        inspectModel: "",
        supplierCode: "",
        supplerRowNum: "",
      },
      formLabelWidth: "100px",
      zhuanData: [],
      kcJbxx: {},

      mubanData: [],
      mubanData2: [],
      passForm: {
        inspectOpinion: "",
        inspectScore: "",
        inspectCode: "",
        supplierCode: "",
        inspectStatusName: "",
        supplerScheduleStatus: "",
        supplierStatus: "",
        supplerRowNum: "",
      },
      uploadData: {
        fileType: "考察报告",
        headCode: "",
        fileDescription: "",
      },
      actionUrl: base.fileUploadList,
      bgFileList: [],
      leiBieData: [],
      defaultProps: {
        children: "nodeList",
        label: "name",
      },
      suppType: {
        categoryName: "",
        categoryNumber: "",
        parentCategoryCode: "",
      },
      modelList: [],
      supplierStatus: "",
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf("spCode=");
    var len = urlV.indexOf("&");
    if (pathS != -1) {
      var supplierCode = urlV.substring(pathS + 7, len);
    } else {
      //   this.$message.error('数据有误，请核实后重新进入页面！');
      var supplierCode = "42fb7405-cd54-4b38-8e2a-d2e39968f5e9";
    }
    this.supplierCode = supplierCode;
    this.xckcFn(supplierCode);
    this.getsuppType();
  },
  methods: {
    // 上传
    uploadSuccess(res, file, fileList) {
      this.bgFileList = fileList;
    },
    exceedFn() {
      this.$message.error("最多上传十个附件");
    },
    // 关闭考察弹窗
    ksClose() {
      this.bgFileList = [];
      this.kcJbxx = {};
      this.xckcForm = {
        inspectLeaderName: "",
        inspectMembersName: "",
        inspectLeader: "",
        inspectMembers: "",
        inspectLeaderArr: "",
        inspectMembersArr: "",
        inspectType: "1",
        inspectDate: "",
        inspectItem: "",
        inspectModel: "",
        supplierCode: "",
        supplerRowNum: "",
      };
      this.passForm = {
        inspectOpinion: "",
        inspectScore: "",
        inspectCode: "",
        supplierCode: "",
        inspectStatusName: "",
        supplerScheduleStatus: "",
        supplierStatus: "",
        supplerRowNum: "",
      };
      window.location.href = "about:blank";
      window.close();
    },
    // 现场考察
    xckcFn(code, type) {
      this.api
        .getSupplierByInspect('', { supplierCode: code })
        .then((res) => {
          this.supplierStatus = res.data.data[0].SUPPLIER_STATUS;
          this.kcJbxx = res.data.data[0];
          var supp = res.data.data[0].SUPPLIER_SORT;
          var sortArr = [];
          if (supp) {
            sortArr = supp.split(",");
          }
          var sortArr2 = [];
          for (let j in sortArr) {
            sortArr2.push(sortArr[j].split("_"));
          }
          this.kcJbxx.SUPPLIER_SORT = sortArr2;
          if (res.data.data[0].INSPECT_MODEL) {
            this.modelList = res.data.data[0].INSPECT_MODEL.split(",");
          }

          this.xckcForm.inspectItem = res.data.data[0].INSPECT_ITEM;
          this.xckcForm.inspectDate = res.data.data[0].INSPECT_DATE;
          this.xckcForm.supplierCode = res.data.data[0].SUPPLIER_CODE;
          var str = [],
            str2 = [];
          var leadersArr = [],
            memberArr = [];
          if (res.data.data[0].INSPECT_LEADER) {
            var arr = res.data.data[0].INSPECT_LEADER.split(",");
            for (var i = 0; i < arr.length; i++) {
              var arr2 = arr[i].split(":");
              leadersArr.push({
                username: arr2[0],
                staffName: arr2[1],
              });
              str.push(arr2[1]);
            }
          }
          this.xckcForm.inspectLeader = res.data.data[0].INSPECT_LEADER || "";
          this.xckcForm.inspectLeaderName = str.join(",");
          if (res.data.data[0].INSPECT_MEMBERS) {
            var arr = res.data.data[0].INSPECT_MEMBERS.split(",");
            for (var i = 0; i < arr.length; i++) {
              var arr2 = arr[i].split(":");
              memberArr.push({
                username: arr2[0],
                staffName: arr2[1],
              });
              str2.push(arr2[1]);
            }
          }
          this.xckcForm.inspectMembers = res.data.data[0].INSPECT_MEMBERS || "";
          this.xckcForm.inspectMembersName = str2.join(",");
          // 模板
          this.mubanData = [];
          this.mubanData.push({
            name: res.data.data[0].INSPECT_MODEL,
            url: "",
          });
          this.passForm.supplierCode = res.data.data[0].SUPPLIER_CODE;
          this.passForm.inspectCode = res.data.data[0].INSPECT_CODE;
          this.uploadData.headCode = res.data.data[0].INSPECT_LEADER;
        });
    },
    // 模板预览
    lookMuban() {},

    // 考察通过
    kcPass(inspectStatusName) {
      this.passForm.inspectStatusName = inspectStatusName;
      if (this.supplierStatus == "2" || this.supplierStatus == "3") {
        this.passForm.supplerRowNum = "5";
      }
      this.api.inspectByPass(this.sso_sessionid, this.passForm).then((res) => {
        this.$message.success("操作成功！");
        setTimeout(function () {
          window.location.href = "about:blank";
          window.close();
        }, 1500);
      });
    },
    // 考察不通过
    kcPassNot(inspectStatusName) {
      this.passForm.inspectStatusName = inspectStatusName;
      if (this.supplierStatus == "2" || this.supplierStatus == "3") {
        this.passForm.supplerRowNum = "5";
      }
      switch (inspectStatusName) {
        case "转不合格":
          this.passForm.supplerScheduleStatus = "12";
          break;
        case "转备选":
          this.passForm.supplerScheduleStatus = "13";
          this.passForm.supplierStatus = "2";
          break;
        case "转潜在":
          this.passForm.supplerScheduleStatus = "14";
          break;
        case "考察不通过":
          this.passForm.supplerScheduleStatus = "5";
          break;
      }
      this.api
        .InspectByWaitOrNo(this.sso_sessionid, this.passForm)
        .then((res) => {
          this.$message.success("操作成功！");
          setTimeout(function () {
            window.location.href = "about:blank";
            window.close();
          }, 1500);
        });
    },
  },
};
</script>
<style lang="less" scope>
@import "../assets/utils.less";

.el-form {
  width: 100%;
  .infor-box-button {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }
}
.kcDbPage {
  width: 1000px;
  margin: 0 auto;
  position: relative;
  background: #fff;
  padding-bottom: 20px;
  .xckcArea {
    .mubanSpan {
      margin-left: 20px;
    }
    .upload-demo {
      width: 400px;
    }
    .el-upload-list {
      width: 300px;
      float: left;
    }
    .el-upload-list__item:first-child {
      margin-top: 2px;
    }
    .bgMuban {
      margin-top: 10px;
      span {
        width: 100px;
        display: inline-block;
        text-align: right;
      }
      a {
        margin-left: 12px;
        color: @color;
      }
    }
    h4 {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding: 8px 10px;
      font-size: 14px;
    }
    .el-form-item {
      margin-bottom: 10px;
      width: 46%;
      margin-left: 2%;
      margin-top: 10px;
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 178px;
      }
      .el-input--suffix .el-input__inner {
        padding-right: 15px;
      }
    }
    .el-textarea {
      width: 860px;
    }
    .kcJbxx {
      width: 50%;
      display: inline-block;
      margin: 5px 0;
      padding-left: 20px;
      span {
        width: 100px;
        text-align: right;
        margin-right: 12px;
        float: left;
        color: #666;
        font-size: 13px;
      }
      p {
        display: inline-block;
        width: calc(100% - 130px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #666;
      }
    }
    .el-cascader__tags {
      width: 100%;
      span {
        width: auto;
      }
    }
  }
  .footerDiv {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
}
</style>