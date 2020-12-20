<template>
  <div class="star">
    <h4>基本信息</h4>
    <div class="info">
      <p>
        <span>供应商名称</span>
        <span class="ctspan" :title="starInfo.name">{{starInfo.name}}</span>
      </p>
      <p>
        <span>供应商类别</span>
        <span class="ctspan" :title="starInfo.sort">{{starInfo.sort}}</span>
      </p>
    </div>
    <h4>入库得分</h4>
    <div class="historyInfo">
      <el-table :data="rukuScoreList" border size="mini">
        <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index == 0">考察： {{returnDate(scope.row.updatedDate, '111')}}</span>
            <span v-if="scope.$index == 1">入库： {{returnDate(scope.row.updatedDate, '111')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="得分" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index == 0">{{scope.row.inspectScore}}</span>
            <span v-if="scope.$index == 1">{{scope.row.estimateScore}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h4>评分加权平均</h4>
    <el-table :data="pfJiaQuanList" border size="mini">
      <el-table-column label="创建时间" align="center" width="100">
        <template slot-scope="scope">{{returnDate(scope.row.CREATED_DATE)}}</template>
      </el-table-column>
      <el-table-column prop="ESTIMATE_HEAD_TYPE" label="类型" align="center"></el-table-column>
      <el-table-column prop="MEMO" label="付款用途（名称）" align="center"></el-table-column>
      <el-table-column prop="PAY_NUMBER" label="审定编号" align="center"></el-table-column>
      <el-table-column prop="ESTIMATE_SCORE" label="加权得分" align="center"></el-table-column>
    </el-table>

    <h4>半年度/年度考评</h4>
    <el-table :data="yearKpiList" border size="mini">
      <el-table-column prop="estimateHeadYear" label="评估年度" align="center" width="100"></el-table-column>
      <el-table-column prop="estimateHeadType" label="评估类型" align="center">
          <template slot-scope="scope">
              {{scope.row.estimateHeadType == 'e1'? '年中' : '年末'}}
          </template>
      </el-table-column>
      <el-table-column prop="estimateHeadEndDate" label="完成评估时间" align="center"></el-table-column>
      <el-table-column prop="estimateScore" label="合计得分" align="center"></el-table-column>
    </el-table>
    <h4>评星定级</h4>
    <el-table :data="starLevelList1" border size="mini">
      <el-table-column label="供应商名称" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="supplierSortName"
        label="供应商类别"
        align="center"
        show-overflow-tooltip
        width="90"
      ></el-table-column>
      <el-table-column label="入库得分" align="center" width="70">
        <template slot-scope="scope">{{Number(scope.row.supplierInitScore).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column label="评分加权平均" align="center" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.supplierDayScore}}</span>
        </template>
      </el-table-column>
      <el-table-column label="半年度/年度考评" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.supplierYearScore}}</span>
        </template>
      </el-table-column>
      <el-table-column label="调剂分值（-10~10分）" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.starChangScore}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="supplierHistoryStar" label="历史星级" align="center" width="80">
        <template slot-scope="scope">{{scope.row.supplierStar || 0}}星</template>
      </el-table-column>
      <el-table-column prop="starBeginScore" label="综合得分" align="center" width="70"></el-table-column>

      <el-table-column label="星级" align="center" width="60">
        <template slot-scope="scope">{{returnStar(scope.row)}}星</template>
      </el-table-column>
      <el-table-column label="是否战略协议" align="center" width="130">
        <template slot-scope="scope">
          <el-radio-group :disabled="true" v-model="scope.row.supplierStrategy" size="mini">
            <el-radio label="Y">是</el-radio>
            <el-radio label="N">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.starChangOption}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import base from "../api/base";
export default {
  data() {
    return {
      starInfo: {},
      rukuScoreList: [],
      pfJiaQuanList: [],
      yearKpiList: [],
      starLevelList1: [],
      sso_sessionid: "",
      supplierCode: "",
    };
  },
  mounted() {
    var urlV = window.location.href;
    var cCodeIndex = urlV.indexOf("code=");
    var len = urlV.indexOf("&");
    if (cCodeIndex != -1) {
      var code = urlV.substring(cCodeIndex + 5, len);
    } else {
      var code = "42fb7405-cd54-4b38-8e2a-d2e39968f5e9";
    }
    this.starChange(code);
  },
  methods: {
    // 生成星级
    returnStar(row) {
      return this.commonFn.returnStar(row);
    },
    // 获取时间
    returnDate(value, other) {
      return this.commonFn.returnDate(value, other);
    },
    // 星际调整
    starChange(code) {
      this.codeObj = {
        code: code,
      };
      this.api
        .starChangeByCode(this.codeObj)
        .then((res) => {
          this.starInfo.name = res.data.data.supplier[0].supplierName;
          this.starInfo.sort = res.data.data.supplier[0].supplierSortName;

          this.rukuScoreList = [];
          this.rukuScoreList.push(res.data.data.supplierInspect);
          this.rukuScoreList.push(res.data.data.E3[0]);
          this.pfJiaQuanList = res.data.data.dayEstimateList;

          this.yearKpiList = res.data.data.E12;
          for (let i in res.data.data.starChangeList) {
            if (!res.data.data.starChangeList[i].supplierStrategy) {
              res.data.data.starChangeList[i].supplierStrategy = "N";
            }
          }
          res.data.data.starChangeList[0].supplierInitScore =
            res.data.data.supplier[0].supplierScore;
          res.data.data.starChangeList[0].starBeginScore = (
            Number(res.data.data.supplier[0].supplierScore) +
            Number(res.data.data.starChangeList[0].starChangScore)
          ).toFixed(2);

          this.starLevelList1 = res.data.data.starChangeList;
          console.log(this.starLevelList1);
          // debugger
          if (this.starLevelList1[0].approveStatus == "submit") {
            this.approveIng = true;
          } else {
            this.approveIng = false;
          }
        });
    },
  },
};
</script>
<style lang="less" scope>
@import "../assets/utils.less";
.star {
    overflow: hidden;
    background: #fff;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  h4{
      font-size: 14px;
      color: #333;
      line-height: 30px;
      background: rgba(0,0,0,0.1);
      padding-left: 10px;
      width: 100%;
      float: left;
  }
  .info {
    width: 100%;
    float: left;
    padding: 6px 0;
    margin-bottom: 6px;
    p {
      float: left;
      width: 50%;
      line-height: 24px;
      padding-left: 20px;
      font-size: 13px;
      span{
          float: left;
      }
      .ctspan {
        width: 360px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8px;
        color: #555;
      }
    }
  }
  .el-table{
      width: 96%;
      margin: 10px 2%;
      float: left;
  }
}
</style>