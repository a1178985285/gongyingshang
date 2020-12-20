<template>
  <div class="star">
    <el-table
      :data="starLevelList2"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      size="mini"
    >
      <el-table-column prop="SUPPLIER_NAME" label="供应商名称" align="center" width="100"></el-table-column>
      <el-table-column prop="SUPPLIER_SORT_NAME" label="供应商类别" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="入库得分" align="center">
        <template slot-scope="scope">{{scope.row.STAR_LINE_SCORE || 0}}</template>
      </el-table-column>
      <el-table-column label="评分加权平均" align="center">
        <template slot-scope="scope">{{scope.row.STAR_LINE_WEIGHTED_SCORE || 0}}</template>
      </el-table-column>
      <el-table-column label="半年度/年度考评" align="center" width="100">
        <template slot-scope="scope">{{scope.row.STAR_ESTIMATE_SCORE || 0}}</template>
      </el-table-column>
      <el-table-column label="调剂分值（-10~10分）" align="center" width="100">
        <template slot-scope="scope">{{scope.row.STAR_ADD_SCORE || 0}}</template>
      </el-table-column>
      <el-table-column label="历史星级" align="center" width="100">
        <template slot-scope="scope">{{scope.row.STAR_HISTORY_LEVEL || 0}}星</template>
      </el-table-column>
      <el-table-column label="综合得分" align="center" width="100">
        <template slot-scope="scope">{{scope.row.STAR_COUNT_SCORE || 0}}</template>
      </el-table-column>
      <el-table-column prop="STAR_LINE_LEVEL" label="星级" align="center" width="80">
        <!-- <template slot-scope="scope">{{returnStar(scope.row)}}星</template> -->
        <template slot-scope="scope">{{scope.row.STAR_LINE_LEVEL}}星</template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.STAR_ADD_REMARK}}</span>
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
      starLevelList2: [],
      sso_sessionid: "",
      code: ''
    };
  },
  mounted() {
    var urlV = window.location.href;
    var pathS = urlV.indexOf("code=");
    var len = urlV.indexOf("&");
    if (pathS != -1) {
      var code = urlV.substring(pathS + 5, len);
    } else {
      //   this.$message.error('数据有误，请核实后重新进入页面！');
      var code = "42fb7405-cd54-4b38-8e2a-d2e39968f5e9";
    }
    this.code = code;
    this.starList();
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
    // chaxun数据
    starList() {
      var params = {
          code: this.code
        // starHeadDate: this.starHeadDate,
        // starHeadCode: this.starHeadCode,
        // starType: this.starType,
      };
      this.api.getStarList(params).then((res) => {
        this.starLevelList2 = res.data.data;
      });
    },
  },
};
</script>
<style lang="less" scope>
@import "../assets/utils.less";
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
}
</style>