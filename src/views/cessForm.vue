<template>
  <div class="border-none mineform">
    <div class="serach">
      <div class="serach-left"></div>
      <div class="serach-right">
        <el-button size="mini" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>

    <el-form :model="formHead">
      <table class="jixiao">
        <tbody>
          <tr>
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td class="header" style="width: 70%; border: none">
                    <img src="../assets/img/form.png" alt />
                  </td>
                  <td style="width: 30%; border: none" class="section thick">
                    流程与标准化编号：FC5-WS-02
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="section" colspan="10">
              <el-form-item
                label="流程与标准化名称："
                class="form-el change"
                label-width="120px"
              >
                <el-input
                  size="mini"
                  v-model="formHead.formName"
                  prop="formName"
                  readonly
                ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10">一、作业标准原则</td>
          </tr>
          <tr class="baseinfo">
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td style="border: none" class="section">
                    <el-form-item
                      label="中心/业务单元"
                      class="form-el change"
                      label-width="90px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.formName"
                        prop="formName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>

                  <td style="border: none" class="section">
                    <el-form-item
                      label="填制人"
                      class="form-el change"
                      label-width="90px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.formName"
                        prop="formName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="border: none" class="section">
                    <el-form-item
                      label="填表时间"
                      class="form-el change"
                      label-width="90px"
                    >
                      <el-input
                        size="mini"
                        v-model="formHead.formName"
                        prop="formName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10">二、作业标准范围</td>
          </tr>
          <tr class="section">
            <td colspan="10">适用于第一资产供应商服务评估</td>
          </tr>
          <tr class="section">
            <td colspan="10">三、作业标准职责</td>
          </tr>
          <tr>
            <td colspan="10">
              <table style="border: none; width: 100%">
                <tr>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="执行人："
                      class="form-el change font-weigh"
                      label-width="60px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="责任人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="核算人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                  <td style="width: 25%; border: none">
                    <el-form-item
                      label="控制人："
                      class="form-el change font-weigh"
                      label-width="130px"
                      prop="standardName"
                    >
                      <el-input
                        size="mini"
                        v-model="executorName"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr class="section">
            <td colspan="10">四、作业标准指引</td>
          </tr>

          <tr class="section thick xie-table-box">
            <td style="width: " class="xie-table">
              <span class="xie-table-top">专业</span>
            </td>
            <td colspan="10">五个三专业</td>
          </tr>

          <tr class="section thick">
            <td>评估项目</td>
            <td style="width: 95px" colspan="10"></td>
          </tr>

          <tr class="section thick">
            <td>供方单位</td>
            <td style="width: 95px" colspan="10"></td>
          </tr>

          <tr class="section thick">
            <td>相关合同</td>
            <td style="width: 95px" colspan="10"></td>
          </tr>

          <tr class="section thick">
            <td>评估时间</td>
            <td style="width: 95px" colspan="10"></td>
          </tr>

          <tr class="section thick">
            <td>经办部门</td>
            <td style="width: 95px" colspan="10">项目名称+专业全称</td>
          </tr>

          <tr class="form-table-item">
            <td class="section thick">服务类型</td>
            <td style="width: 95px" colspan="10">
              <el-form-item  label-width="20px">
                <el-select placeholder="请选择服务外包" size="mini">
                  <el-option
                    v-for="item in optionsReg"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>

          <tr class="section thick">
            <td>服务类型</td>
            <td style="width: 50px">序号</td>
            <td style="width: 25%">评估内容（根据实际情况标“打分”）</td>
            <td style="width: 25%">评估规则</td>
            <td style="width: 95px">分数</td>
            <td style="width: 95px">得分</td>
            <td>备注</td>
          </tr>

          <tr class="thick">
            <td rowspan="6">服务外包</td>
          </tr>
          <tr class="thick">
            <td style="width: 50px">1</td>
            <td>服务品质</td>
            <td>
              1、服务过程中有效提高现场品质，得30分；
              <br />
              2、服务过程中保持原有现场品质，无改善性的提升，得20分；
              <br />
              3、服务过程中现场品质降低，得5分；
            </td>
            <td>30</td>
            <td>30</td>
            <td>备注</td>
          </tr>
          <tr class="thick">
            <td style="width: 50px">2</td>
            <td>服务配合度</td>
            <td>
              1、在不产生成本的基础下积极配合业务单元调整或整改本评估项，得10分；
              <br />
              2、不配合、不调整、高傲姿态等，得0分；
            </td>
            <td>30</td>
            <td>30</td>
            <td>备注</td>
          </tr>

          <tr class="thick">
            <td style="width: 50px">3</td>
            <td>突发事件处理及构通能力</td>
            <td>
              1、突发事件处理具备专业能力，能够快速解决，无扩散、无产生负面影响等、得20分；
              <br />
              2、突发事件处理无专业能力，未能快速解决，无扩散、无产生负面影响等、得10分；
              <br />
              3、突发事件处理产生负面影响、得0分；
            </td>
            <td>30</td>
            <td>30</td>
            <td>备注</td>
          </tr>

          <tr class="thick">
            <td style="width: 50px">4</td>
            <td>服务内容履约情况</td>
            <td>
              响应合同或需求清单要求履约服务，如出现人员超龄、缺岗缺编、设备配备不齐全、工服不标准、清洗不标准等情况（具体事项依据服务内容），发现1人/1次/1项/1处不一致扣减5分，如没有，则不扣分
            </td>
            <td>30</td>
            <td>30</td>
            <td>备注</td>
          </tr>

          <tr class="thick">
            <td style="width: 50px">5</td>
            <td>是否扣款</td>
            <td>
              1、扣款未超本次应付款总额的5%，得5分；
              <br />
              2、扣款超本次应付款总额的5%，得0分；
              <br />
              3、没有扣款，则得10分；
            </td>
            <td>30</td>
            <td>30</td>
            <td>备注</td>
          </tr>
          <!-- 
                <tr>
            <td colspan="10">
              <table style=" width: 100%">
                <tr>
                  <td style="width: 25%; ">
                     1
                  </td>
                  <td style="width: 25%; border: none">
                   
                   2
                  </td>
                  <td style="width: 25%; border: none">
                   3
                  </td>
                  <td style="width: 25%; border: none">
                 4
                  </td>
                </tr>
              </table>
            </td>
          </tr> -->

          <tr class="thick section">
            <!-- <td >
           <table style=" width: 100%">
        <tr>
               <td style="width: 80%; border: none">
                 4
                  </td>
        </tr>
        </table>
        </td> -->

            <td colspan="3">其他情况（在服务过程中出现的其他问题请填写）：</td>
            <td colspan="9"></td>
          </tr>
          <tr class="section thick">
            <td colspan="1">应付贷款金额（元）</td>
            <td colspan="2">1</td>
            <td>本次扣款金额（元）</td>
            <td>1</td>
            <td colspan="1">实际付货款扣款金额（元）</td>
            <td>1</td>
          </tr>

          <!-- <tr >
            <td class="thick" colspan="2" rowspan="2">个人标签</td>
            <td colspan="10">【从下方备选择】</td>
          </tr> -->

          <tr class="section thick">
            <td style="width: 95px" colspan="1">本次服务综合得分:</td>
            <td style="width: 95px" colspan="12">80</td>
          </tr>

          <tr class="section thick">
            <td style="width: 95px" colspan="1">业务单元经办人签字:</td>
            <td style="width: 95px" colspan="2">6</td>
            <td colspan="1">审批时间:</td>
            <td colspan="1">时间</td>
            <td colspan="1">是否确认:</td>
            <td>确认</td>
          </tr>

          <tr class="section thick">
            <td style="width: 95px" colspan="1">财务经理签字:</td>
            <td style="width: 95px" colspan="2">6</td>
            <td colspan="1">审批时间:</td>
            <td colspan="1">时间</td>
            <td colspan="1">是否确认:</td>
            <td>确认</td>
          </tr>

          <tr class="section thick">
            <td style="width: 95px" colspan="1">业务单元责任人签字:</td>
            <td style="width: 95px" colspan="2">6</td>
            <td colspan="1">审批时间:</td>
            <td colspan="1">时间</td>
            <td colspan="1">是否确认:</td>
            <td>确认</td>
          </tr>

          <tr class="section">
            <td colspan="10">五、作业标准图片</td>
          </tr>
          <tr class="section">
            <td colspan="10">六、作业标准 《第一资产供应商管理作业标准》</td>
          </tr>
          <tr class="section">
            <td colspan="10">七、作业标准成本</td>
          </tr>
          <tr class="section">
            <td colspan="10">八、作业标准评估</td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sessid: sessionStorage.getItem("sso_sessionid"),
      formHead: {
        formName:"",
      },
      standardName: "",
      executorName: "",
      optionsReg: [
        {
          value: "A",
          label: "服务外包",
        },
        {
          value: "B",
          label: "工程施工",
        },
        {
          value: "C",
          label: "专项物资采购",
        },
        {
          value: "D",
          label: "服务外包、专项物资采购",
        },
        {
          value: "E",
          label: "某某某类型",
        },
      ],
    };
  },
  methods: {
    getApi() {
      let sessid = this.sessid;
      let params = {
        itemType: "服务评估",
      };
      this.api.getEstimateByModelName(sessid, params).then((res) => {
        console.log(res)
      });
    },
  },
  mounted() {
    this.getApi();
  },
};
</script>

<style lang="less">
@import url("../assets/utils.less");
//表单

.mineform {
  .form-table-item {
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .xie-table-box {
    .xie-table {
      position: relative;
    }
    .xie-table-top {
      position: absolute;
      top: 0;
      right: 10px;
    }
    .xie-table:before {
      content: "";
      position: absolute;
      width: 1px;
      height: 97px;
      top: 0;
      left: 0;
      background-color: black;
      display: block;
      transform: rotate(-74deg);
      transform-origin: top;
    }
    .xie-table:after {
      content: "业务";
      position: absolute;
      transform: rotate(-0deg);
      top: 10px;
      left: 10px;
      transform-origin: top;
    }
  }
  .el-form {
    border: 2px solid #000;
    margin: 10px auto 10px auto;
    width: 98%;
  }
  .el-form-item__label {
    // text-align: left !important;
    line-height: 28px !important;
  }
  .el-input__inner {
    padding: 0 6px !important;
  }
  .width-auto();
  overflow: auto !important;
  .jixiao {
    width: 100%;
    border-collapse: collapse;
    // border: 2px solid #000;
    // margin: 10px auto 10px auto;
    background: #fff;
    // border: none;
    .change {
      width: 100% !important;
      .el-form-item__content {
        width: 86% !important;
      }
      .el-form-item__label {
        width: 120px;
      }
    }
    .section {
      font-weight: 600;
    }
    .tabl-flex {
      display: flex;
      width: 100%;
      & > div {
        margin-right: 20px;
      }
    }
    .form-el {
      margin-bottom: 0 !important;
      display: flex;
      .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 9pt !important;
        color: #000 !important;
        // line-height: 0px !important;
        padding: 0 !important;
        box-sizing: border-box;
      }
      .el-form-item__content {
        line-height: 0px !important;
        margin: auto 0 !important;
      }
    }
    td {
      min-height: 20px;
      height: 28px;
      line-height: 18px;
      font-family: simSong;
      font-size: 9pt;
      border: 1px solid #999;
      // padding: 2px;
      color: #000 !important;
    }
    .td_list {
      height: 28px;
      line-height: 0;
      font-family: simSong;
      font-size: 9pt;
      border: none;
      color: #000 !important;
    }
    .thick {
      // font-weight: bold;
      text-align: center;
    }
    .header {
      height: 45px;
      padding: 0px;
      margin: 5px auto;
      //   text-align: center;
      border: none !important;
      background: #fff;
      img {
        width: 120px;
        // height: 28px;
        margin-left: 15px;
        float: left;
        margin: 10px;
      }
      .title {
        font-family: simHei;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 0 !important;
        display: flex;
        padding-left: 400px;
        .el-form-item__label {
          text-align: right;
          vertical-align: middle;
          float: left;
          font-size: 20pt !important;
          color: #000 !important;
          // line-height: 0px !important;
          padding: 0 !important;
          box-sizing: border-box;
        }
      }
    }
    .baseinfo {
      font-size: 10pt;
      font-family: simHei;
    }
  }
}
.border-none {
  background: #fff;
  .el-input__inner {
    border: none;
    color: #000 !important;
    height: 20px !important;
  }
  .jixiao td {
    color: #000 !important;
  }
  .font-weigh {
    .el-form-item__label {
      font-weight: 600;
    }
    .el-input__inner {
      font-weight: 600;
    }
  }
}
</style>