<template>
  <div class="pgDbPage">
    <div class="pgArea">
      <h4>基本信息</h4>
      <div class="info">
        <p>
          <span>供应商名称</span>
          <span class="ctspan" :title="pgInfo.name">{{pgInfo.name}}</span>
        </p>
        <p>
          <span>供应商类别</span>
          <span class="ctspan" :title="pgInfo.sort">{{pgInfo.sort}}</span>
        </p>
        <p>
          <span>评估类型</span>
          <span class="ctspan" :title="pgInfo.type">{{pgInfo.type}}</span>
        </p>
        <p>
          <span>供应商状态</span>
          <span class="ctspan" :title="pgInfo.status">{{pgInfo.status}}</span>
        </p>
      </div>
      <h4>历史合作信息</h4>
      <div class="historyInfo">
        <el-table :data="historyInfoData" border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column label="日期" align="center" width="100"></el-table-column>
          <el-table-column label="合作公司" align="left"></el-table-column>
        </el-table>
      </div>
      <h4>过程评估基本信息</h4>
      <el-form :model="pgForm" size="mini" inline :disabled="true">
        <el-form-item label="评估年度" :label-width="formLabelWidth">
          <el-date-picker
            v-model="pgForm.estimateHeadYear"
            value-format="yyyy"
            type="year"
            placeholder="选择年"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="评估截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="pgForm.estimateHeadEndDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="评估类型" :label-width="formLabelWidth">
          <el-select v-model="pgForm.estimateHeadType" size="mini" placeholder="请选择">
            <el-option label="请选择" value></el-option>
            <el-option label="年末评估" value="e2"></el-option>
            <el-option label="年中评估" value="e1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评估模板" :label-width="formLabelWidth" style="width: 100%">
          <!-- <el-button :disabled="flow1" type="primary" @click="choseMuban">选择模板</el-button> -->
          <a class="mubanSpan" v-for="(item, index) in mubanData" :key="index">{{item.name}}</a>
          <!-- <el-input v-model="pgForm.estimateHeadModel" autocomplete="off"></el-input> -->
        </el-form-item>
        <el-form-item label="评估说明" :label-width="formLabelWidth" style="width: 100%">
          <el-input type="textarea" v-model="pgForm.estimateHeadRemark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <h4>过程评估</h4>
        <el-table :data="guoChengPingGu" border size="mini" style="width: 100%;margin: 20px auto;">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="weidu" label="评估维度" align="left" width="80"></el-table-column>
          <el-table-column prop="zhibiao" label="评估指标" align="left" width="120"></el-table-column>
          <el-table-column prop="quanzhong" label="权重" align="center" width="50">
                <template slot-scope="scope">
                  <span>{{Number(scope.row.quanzhong)*100 + '%'}}</span>
                </template>
          </el-table-column>
              <el-table-column label="评分细则" align="left">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.xizeScore" size="mini">
                    <el-radio @change="radioChangeFn(scope.row, scope.$index)" class="radioRoup" v-for="(item, index) in scope.row.xize" :key="index" :label="item.score">{{item.title}}</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
          <el-table-column label="得分" align="center" width="60">
            <template slot-scope="scope">
              <span>{{scope.row.score}}</span>
            </template>
          </el-table-column>
        </el-table>
            <div style="">
              <span style="float:right;margin-right: 10px;">{{nowScore}}</span>
              <span style="float:right;margin-right: 10px;">当前得分</span>
            </div>
        <div style="width: 100%; float:left;margin:15px 0;">
          <span class="pgsm">评估备注</span>
          <el-input type="textarea" size="mini" v-model="estimateLineOpinion"></el-input>
        </div>
      </div>
      <div class="footerDiv">
        <el-button size="mini" @click="pgCloseFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="assessMentDoing">提交打分</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supplierCode: "",
      estimateHeadCode: "",
      estimateHeadType: "",
      mubanData: [],
      mubanData2: [],

      guoChengPingGu: [{}], // 过程评估列表

      historyInfoData: [],
      formLabelWidth: "100px",
      pgForm: {
        estimateHeadYear: "",
        estimateHeadType: "", // 评估类型
        estimateHeadRemark: "", // 评估说明
        supplierName: "", // 供应商名称
        estimateHeadModel: "", // 评估模板
        supplierCode: "",
        estimateHeadEndDate: "", // 评估截止时间
        estimateBy: "", // 评估人
      },
      pgPeople: [],
      pgInfo: {
        name: "",
        type: "",
        sort: "",
        status: "",
      },
      estimateLineOpinion: "",
      estimateScore: "",
      nowScore: 0,
    };
  },

  mounted() {
    var urlV = window.location.href;
    var pathT = urlV.indexOf("type=");
    var pathS = urlV.indexOf("supplierCode=");
    var pathE = urlV.indexOf("estimateHeadCode=");
    if (pathT != -1) {
      var type = urlV.substring(pathT + 5, pathS - 1);
    } else {
      //   this.$message.error('数据有误，请核实后重新进入页面！');
      var type = "e1";
    }
    if (pathS != -1) {
      var supplierCode = urlV.substring(pathS + 13, pathE - 1);
    } else {
      //   this.$message.error('数据有误，请核实后重新进入页面！');
      var supplierCode = "42fb7405-cd54-4b38-8e2a-d2e39968f5e9";
    }
    if (pathE != -1) {
      var headCode = urlV.substring(pathE + 17, urlV.length);
    } else {
      //   this.$message.error('数据有误，请核实后重新进入页面！');
      var headCode = "42fb7405-cd54-4b38-8e2a-d2e39968f5e9";
    }
    this.supplierCode = supplierCode;
    this.estimateHeadCode = headCode;
    this.estimateHeadType = type;
    this.assessMentFn();
  },
  methods: {
    pgCloseFn() {
      window.location.href = "about:blank";
      window.close();
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
    // 获取评估信息
    assessMentFn(type) {
      //   this.pgInfo.name = this.selectArr[0].supplierName;
      //   this.pgInfo.type = this.selectArr[0].supplierName;
      //   this.pgInfo.status = this.selectArr[0].supplierName;
      //   this.pgInfo.sort = this.selectArr[0].supplierName;
      var params = {
        supplierCode: this.supplierCode,
        estimateHeadCode: this.estimateHeadCode,
        estimateHeadType: this.estimateHeadType,
      };
      this.api.getEstimateByCodeOut(this.sso_sessionid, params).then((res) => {
        var data = res.data.data;
        if (!data) return false;
        if (this.estimateHeadCode) {
          if (data.supplierAndEstimate.length > 0) {
            this.pgInfo.name = data.supplierAndEstimate[0].SUPPLIER_NAME;
            this.pgInfo.type =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_TYPE == "e1"
                ? "年中评估"
                : "年末评估";
            this.pgInfo.status =
              data.supplierAndEstimate[0].ESTABLISHMENT_STATUS;
            this.pgInfo.sort = data.supplierAndEstimate[0].SUPPLIER_NAME;

            this.pgForm.estimateHeadYear =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_YEAR;
            this.pgForm.estimateHeadType =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_TYPE;
            this.pgForm.estimateHeadRemark =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_REMARK;
            this.pgForm.estimateHeadModel =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_MODEL;
            this.pgForm.estimateHeadEndDate =
              data.supplierAndEstimate[0].ESTIMATE_HEAD_END_DATE;
            this.pgForm.estimateBy = data.supplierAndEstimate[0].ESTIMATE_BY;
            if (data.supplierAndEstimate[0].ESTIMATE_HEAD_MODEL) {
              var arr = data.supplierAndEstimate[0].ESTIMATE_HEAD_MODEL.split(
                ","
              );
              for (var i in arr) {
                this.mubanData.push({
                  name: arr[i],
                  url: "",
                });
              }
            } else {
              this.mubanData = [];
            }
          }
        }
        var estimateByItem = res.data.data.estimateByItem;
        this.guoChengPingGu = [];
        if (estimateByItem.length > 0) {
          this.estimateLineOpinion = estimateByItem[0].ESTIMATE_HEAD_REMARK;
          for (var e in estimateByItem) {
            var arr = [];
            if(estimateByItem[e].ITEM_SCORE_STANDARD){
              var arr2 = estimateByItem[e].ITEM_SCORE_STANDARD.split('&');
              for(let i in arr2){
                var indexK = arr2[i].indexOf('（')+1;
                arr.push({
                  title: arr2[i],
                  score: arr2[i].substring(indexK, arr2[i].length-1)
                });
              }
            }
            var params = {
              pgren: estimateByItem[e].ESTIMATE_BY,
              weidu: estimateByItem[e].ITEM_DIMENSION,
              zhibiao: estimateByItem[e].ITEM_INDEX,
              quanzhong: estimateByItem[e].ITEM_WEIGHT,
              score: estimateByItem[e].ESTIMATE_LINE_SCORE,
              weiduCode: estimateByItem[e].ITEM_CODE,
              xize: arr,
              xizeScore: '',
              zgf: estimateByItem[e].ITEM_SCORE,
            };
            this.guoChengPingGu.push(params);
            var sum = 0;
            for(let i in this.guoChengPingGu){
              sum += Number(this.guoChengPingGu[i].score);
            }
            this.nowScore = sum;
          }
        }
      });
    },
    // 执行评估-提交打分
    assessMentDoing() {
      var arr = [];
      if (this.guoChengPingGu.length > 0) {
        for (var i in this.guoChengPingGu) {
          var params = {
            estimateHeadCode: this.estimateHeadCode,
            estimateLineScore: this.guoChengPingGu[i].score,
            estimateScoreItem: this.guoChengPingGu[i].weiduCode,
          };
          arr.push(params);
        }
        arr.push({
          estimateHeadCode: this.estimateHeadCode,
          estimateLineOpinion: this.estimateLineOpinion,
        });
      }
      this.api.saveEstimateList(this.sso_sessionid, arr).then((res) => {
        this.$message.success("操作成功！");
        setTimeout(function () {
          window.location.href = "about:blank";
          window.close();
        }, 1500);
      });
    },
    // 评分改变
    radioChangeFn(row, index){
      // （选择得分*权重*100）/最高分
      console.log(row.xizeScore); // 选择得分
      console.log(row.zgf); // 最高分
      console.log(row.quanzhong); // 权重
      var f = (Number(row.xizeScore) * Number(row.quanzhong) * 100) / Number(row.zgf);
      this.guoChengPingGu[index].score = f.toFixed(2);
      var sum = 0;
      for(let i in this.guoChengPingGu){
        sum += Number(this.guoChengPingGu[i].score);
      }
      this.nowScore = sum;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/utils.less";
.pgDbPage {
  @box();
  width: 1000px;
  margin: 0 auto;
  .pgArea {
      .radioRoup{
        width: 100%;
        float: left;
        line-height: 24px;
        white-space: normal;
      }
    .pgsm {
      width: 100px;
      float: left;
      font-size: 14px;
      color: #666;
      text-align: right;
      padding-right: 12px;
    }
    .pgsm + .el-textarea{
      float: left;
    }
    .footerDiv {
      width: 100%;
      margin-top: 20px;
      text-align: center;
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
      width: 830px;
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
      font-size: 14px;
      color: #666;
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
</style>