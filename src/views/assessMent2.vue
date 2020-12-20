<template>
  <div class="accounts">
    <div class="accounts-box clearfix">
      <el-form size="mini" class="headinput" :model="searchForm">
        <div class="formLeft">
          <el-form-item label="年份" required>
            <el-date-picker
              value-format="yyyy"
              v-model="searchForm.estimateHeadYear"
              type="year"
              placeholder="选择年份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="评估类型" required>
            <el-select
              v-model="searchForm.estimateHeadType"
              placeholder="请选择"
            >
              <el-option label="年中评估" value="e1"></el-option>
              <el-option label="年末评估" value="e2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input
              placeholder="请输入"
              v-model="searchForm.supplierName"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择">
              <el-option label="未启动" value="1"></el-option>
              <el-option label="启动评估" value="2"></el-option>
              <el-option label="执行评估" value="3"></el-option>
              <el-option label="完成评估" value="4"></el-option>
            </el-select>
          </el-form-item>-->
        </div>
        <div class="formRight">
          <el-button
            type="primary"
            v-if="hasQx('aph2_supplier_GYSNDKH-QX-C11')"
            size="mini"
            @click="searchFn"
            >检索本次评估供应商</el-button
          >
          <!-- <el-button type="primary" size="mini" @click="searchFn('reset')">重置</el-button> -->
          <el-button
            type="primary"
            v-if="hasQx('aph2_supplier_GYSNDKH-QX-C11')"
            size="mini"
            @click="qidongPgFn"
            >启动评估</el-button
          >
          <el-button
            type="primary"
            v-if="hasQx('aph2_supplier_GYSNDKH-QX-C11')"
            size="mini"
            @click="assessMentFn(2, '执行评估')"
            >执行评估</el-button
          >
          <el-button
            type="primary"
            v-if="hasQx('aph2_supplier_GYSNDKH-QX-C11')"
            size="mini"
            @click="asmOk"
            >完成评估</el-button
          >
        </div>
      </el-form>
      <el-table
        :data="accountsData"
        border
        size="mini"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        style="width: 100%; margin: 20px auto"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          label="供应商名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="lookDetail(scope.row.supplierCode)"
              >{{ scope.row.supplierName }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="supplierSortName"
          align="left"
          label="供应商类别"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column align="center" label="评估类型" width="70">
          <template slot-scope="scope">
            <span>{{ returnPgType(scope.row.estimateHeadType) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="estimateHeadYear"
          align="center"
          label="年份"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="estimateScore"
          align="center"
          width="60"
          label="得分"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.estimateScore }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" width="90">
          <template slot-scope="scope">
            <span>{{ returnDate(scope.row.createdDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staffName"
          align="center"
          label="创建人"
          width="70"
        ></el-table-column>
        <el-table-column align="center" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{ returnStatus(scope.row.estimateHeadStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.estimateHeadStatus"
              @click="lookPg(scope.row)"
              type="text"
              size="mini"
              >评估详情</el-button
            >
            <el-button
              v-if="scope.row.estimateHeadStatus == 'PASS'"
              @click="backPg(scope.row)"
              type="text"
              size="mini"
              >退回</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :currentPage="currentPage"
        :total="total"
        @changePage="changePage"
      ></Pagination>

      <div class="pgArea">
        <el-dialog
          :title="dialogTitle"
          @close="pgCloseFn"
          :visible.sync="pgFormShow"
          width="880px"
          top="5vh"
        >
          <h4>基本信息</h4>
          <div class="info">
            <p>
              <span>供应商名称</span>
              <span class="ctspan" :title="pgInfo.supplierName">{{
                pgInfo.supplierName
              }}</span>
            </p>
            <p>
              <span>供应商星级</span>
              <span class="ctspan" :title="pgInfo.starLevel"
                >{{ pgInfo.starLevel }}星</span
              >
            </p>
            <p>
              <span>供应商类别</span>
              <span class="ctspan" :title="pgInfo.supplierSortName">{{
                pgInfo.supplierSortName
              }}</span>
            </p>
            <p>
              <span>所在区域</span>
              <span class="ctspan" :title="pgInfo.area">{{ pgInfo.area }}</span>
            </p>
          </div>
          <h4>历史合作信息</h4>
          <div class="historyInfo">
            <el-table
              :data="historyInfoData"
              border
              size="mini"
              style="width: 100%; margin: 20px auto"
            >
              <el-table-column
                prop="createdDate"
                label="日期"
                align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                prop="companyName"
                label="合作公司"
                align="left"
              ></el-table-column>
            </el-table>
            <Pagination
              :currentPage="historyPage"
              :total="historyTotal"
              @changePage="historyChangePage"
            ></Pagination>
          </div>
          <h4>过程评估基本信息</h4>
          <el-form :model="pgForm" size="mini" inline :disabled="flow1">
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
              <el-select
                v-model="pgForm.estimateHeadType"
                size="mini"
                placeholder="请选择"
              >
                <el-option label="请选择" value></el-option>
                <el-option label="年中评估" value="e1"></el-option>
                <el-option label="年末评估" value="e2"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="评估模板" :label-width="formLabelWidth" style="width: 100%">
              <el-button :disabled="flow1" type="primary" @click="choseMuban">选择模板</el-button>
              <span class="mubanSpan" v-for="(item, index) in mubanData" :key="index">{{item.ITEM_INDEX}}</span>
            </el-form-item>-->
            <el-form-item label="评估说明" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="pgForm.estimateHeadRemark"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div v-if="jdType == 1">
            <h4>
              评估人
              <el-button
                :disabled="pgLook"
                type="primary"
                style="float: right"
                size="mini"
                @click="addPgPeople"
                >添加评估人</el-button
              >
            </h4>
            <el-table
              :data="pgPeople"
              border
              size="mini"
              style="width: 100%; margin: 20px auto"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="departmentName"
                label="评估部门"
                align="left"
              ></el-table-column>
              <el-table-column
                prop="staffName"
                label="评估人"
                align="center"
              ></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    :disabled="pgLook"
                    @click="delectPgPeople(scope.$index)"
                    type="text"
                    size="mini"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="jdType != 1">
            <h4>过程评估</h4>
            <el-table
              :data="guoChengPingGu"
              border
              size="mini"
              style="width: 100%; margin: 20px auto"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                v-if="jdType == 3"
                prop="pgren"
                label="评估人"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column
                prop="weidu"
                label="评估维度"
                align="left"
                show-overflow-tooltip
                width="80"
              ></el-table-column>
              <el-table-column
                prop="zhibiao"
                label="评估指标"
                align="left"
                width="120"
              ></el-table-column>
              <el-table-column label="权重" align="left" width="50">
                <template slot-scope="scope">
                  <span>{{ Number(scope.row.quanzhong) + "%" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="评分细则" align="left">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.xizeScore" size="mini">
                    <el-radio
                      :disabled="jdType == 3 || pgLook"
                      @change="radioChangeFn(scope.row, scope.$index)"
                      class="radioRoup"
                      v-for="(item, index) in scope.row.xize"
                      :key="index"
                      :label="Number(item.score)"
                      >{{ item.title }}</el-radio
                    >
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column label="得分" align="center" width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.score }}</span>
                  <!-- <el-input size="mini" :disabled="jdType == 3" v-model="scope.row.score"></el-input> -->
                </template>
              </el-table-column>
            </el-table>
            <div v-if="jdType == 2">
              <span style="float: right; margin-right: 10px">{{
                nowScore
              }}</span>
              <span style="float: right; margin-right: 10px">当前得分</span>
            </div>
            <div v-if="jdType == 2">
              <span style="float: left; margin-right: 10px">评估备注</span>
              <el-input
                type="textarea"
                size="mini"
                v-model="estimateLineOpinion"
              ></el-input>
            </div>
          </div>
          <div v-if="jdType == 3">
            <h4>评估人信息</h4>
            <el-table
              :data="PGrenInfo"
              :summary-method="getSummaries"
              show-summary
              border
              size="mini"
              style="width: 100%; margin: 20px auto"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="ESTIMATE_LINE_NAME"
                label="评估人"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="ESTIMATE_LINE_REMARK"
                label="评估说明"
                align="left"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="SCORECOUNT"
                label="得分"
                align="center"
              ></el-table-column>
              <!-- <el-table-column prop="ESTIMATE_HEAD_REMARK" label="备注" align="left"></el-table-column> -->
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="pgCloseFn">取 消</el-button>
            <!-- <el-button :disabled="pgLook" v-if="jdType == 1" size="mini" type="primary" @click="fqPgFn">发起评估</el-button> -->
            <el-button
              v-if="!pgLook"
              size="mini"
              type="primary"
              @click="assessMentDoing"
              >提交打分</el-button
            >
            <!-- <el-button :disabled="pgLook" v-if="jdType == 3" size="mini" type="primary" @click="assessMentFinish">完成评估</el-button> -->
          </div>
        </el-dialog>
      </div>

      <div class="pgArea">
        <el-dialog
          title="启动评估"
          @close="pgCloseFn"
          :visible.sync="pgFormShowQd"
          width="880px"
          top="5vh"
        >
          <h4>评估基本信息</h4>
          <el-form :model="pgForm" size="mini" inline :disabled="flow1">
            <el-form-item label="评估年度" :label-width="formLabelWidth">
              <el-date-picker
                disabled
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
              <el-select
                v-model="pgForm.estimateHeadType"
                size="mini"
                disabled
                placeholder="请选择"
              >
                <el-option label="请选择" value></el-option>
                <el-option label="年中评估" value="e1"></el-option>
                <el-option label="年末评估" value="e2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评估说明" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="pgForm.estimateHeadRemark"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="评估模板" :label-width="formLabelWidth">
              <el-select
                size="mini"
                v-model="pgForm.estimateHeadModel"
                placeholder="请选择"
                @change="changeTimat"
              >
                <el-option
                  v-for="item in cooperOptions"
                  :key="item.ITEM_NUM"
                  :label="item.ITEM_INDEX"
                  :value="item.ITEM_NUM"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <h4>
            评估人
            <el-button
              :disabled="pgLook"
              type="primary"
              style="float: right"
              size="mini"
              @click="addPgPeople"
              >添加评估人</el-button
            >
          </h4>
          <el-table
            :data="pgPeople"
            border
            size="mini"
            style="width: 100%; margin: 20px auto"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="companyCodeValueDesc"
              label="公司名称"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="departmentName"
              label="评估部门"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="staffName"
              label="评估人"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  :disabled="pgLook"
                  @click="delectPgPeople(scope.$index)"
                  type="text"
                  size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <h4>评估供应商</h4>
          <el-table
            :data="pgSupplier"
            border
            size="mini"
            style="width: 100%; margin: 20px auto"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="SUPPLIER_NAME"
              label="供应商名称"
              align="left"
            ></el-table-column>
            <el-table-column
              prop="SUPPLIER_TYPE"
              label="供应商类型"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="ITEMNAME"
              label="评估模板"
              align="center"
            ></el-table-column>
            <!-- <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.SUPPLIER_REMARK"></el-input>
              </template>
            </el-table-column> -->
          </el-table>
          <h4>历史合作信息</h4>
          <div class="historyInfo">
            <el-table
              :data="historyInfoData"
              border
              size="mini"
              style="width: 100%; margin: 20px auto"
            >
              <el-table-column
                prop="supplierName"
                label="供应商名称"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="createdDate"
                label="日期"
                align="center"
                width="160"
              ></el-table-column>
              <el-table-column
                prop="companyName"
                label="合作公司"
                align="left"
              ></el-table-column>
            </el-table>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="pgCloseFn">取 消</el-button>
            <el-button
              :disabled="pgLook"
              size="mini"
              type="primary"
              @click="fqPgFn"
              >发起评估</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
    <member-list
      ref="member_list"
      :memberList="memberList"
      @memberListFn="memberListFn"
    ></member-list>
  </div>
</template>

<script>
import Pagination from "../components/pagination";
import memberList from "../components/memberList";
export default {
  data() {
    return {
      flow1: false, //过程评估基本信息
      pgLook: false,
      memberList: {
        // 选择职员参数
        isShow: false,
        type: "",
        selectArr: [],
      },
      //修改
      cooperOptions: [],
      choseObj: {},
      mubanDialog: false,
      mubanDialog2: false,
      mubanDataList: [],
      mubanDataList2: [],
      mubanData: [],
      mubanData2: [],
      jdType: 1, // 评估阶段
      guoChengPingGu: [{}], // 过程评估列表
      PGrenInfo: [], //评估人信息列表
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
      dialogTitle: "启动评估",
      pgFormShow: false,
      pgFormShowQd: false,
      historyInfoData: [],
      historyData: {
        supplierCodeList: [],
        headType: "合同审定",
        pageNum: 1,
        size: 10,
      },
      formLabelWidth: "100px",
      pgForm: {
        estimateHeadYear: "",
        estimateHeadType: "", // 评估类型
        estimateHeadRemark: "", // 评估说明
        supplierName: "", // 供应商名称
        supplierCode: "",
        estimateHeadEndDate: "", // 评估截止时间
        estimateBy: "", // 评估人
      },
      pgPeople: [],
      selectArr: [],
      historyTotal: 0,
      historyPage: 1,
      currentPage: 1,
      total: 0,
      pgInfo: {
        supplierName: "",
        area: "",
        starLevel: "",
        supplierSortName: "",
      },
      estimateLineOpinion: "",
      estimateScore: "",
      nowScore: "", //当前的分
      pgSupplier: [],
      pgSupplierList: [],
      optionList: [],
      cooperOptionsTwo: [],
    };
  },

  mounted() {
    this.$store.commit("modifyindexSi", "4");
    let date = new Date();
    this.searchForm.estimateHeadYear = date.getFullYear().toString();
//修改
    // this.searchFn();
    this.getEstimateByModelNameTow();
  },
  methods: {
    changeTimat(e) {
      // console.log(event)
      this.cooperOptions.map((item, i) => {
        console.log(item.ITEM_NUM);
        if (item.ITEM_NUM == e) {
          this.cooperOptionsTwo.ITEM_NUM = item.ITEM_NUM;
          this.cooperOptionsTwo.ITEM_INDEX = item.ITEM_INDEX;
        }
      });
    },
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0 || index === 2) {
          sums[index] = "";
          return;
        }
        if (index === 1) {
          sums[index] = "最终得分";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });
      this.estimateScore = (sums[3] / data.length).toFixed(2);
      sums[3] = this.estimateScore;
      return sums;
    },

    // 评估退回上一部
    backPg(row) {
      var params = {
        supplierCode: row.supplierCode,
        estimateHeadCode: row.estimateHeadCode,
        year: row.estimateHeadYear,
        type: row.estimateHeadType,
      };
      this.api.backEstimateByCode(this.sso_sessionid, params).then((res) => {
        this.$message.success("退回成功！");
        this.searchFn();
      });
    },

    // 历史信息分页
    historyChangePage(page, size) {
      this.historyData.pageNum = page;
      this.getSupplierByContract();
    },
    // 历史信息
    getSupplierByContract() {
      // var arr = [];
      // for(let i in this.selectArr){
      //   arr.push(this.selectArr.supplierCode);
      // }
      // this.historyData.supplierCode = arr;
      console.log(this.historyData, this.historyData.supplierCodeList);
      this.api
        .getSupplierByContract(
          this.sso_sessionid,
          this.historyData,
          this.historyData.supplierCodeList
        )

        .then((res) => {
          this.historyInfoData = res.data.data;
          this.historyTotal = Number(res.data.count);
        });
    },
    // 哈看评估详情
    lookPg(row) {
      this.flow1 = true;
      this.pgLook = true;
      this.jdType = 3;
      this.dialogTitle = "评估详情";

      console.log(row);
      var arr = [];
      arr.push(row.supplierCode);
      this.historyData.supplierCodeList = arr;
      this.getSupplierByContract();

      this.pgForm.supplierName = row.supplierName;
      this.pgForm.supplierCode = row.selSupplierCode;
      var params = {
        estimateHeadCode: row.estimateHeadCode,
      };
      this.api.getEstimateList(this.sso_sessionid, params).then((res) => {
        this.pgFormShow = true;
        var estimateByItem = res.data.data.estimateList;
        this.guoChengPingGu = [];
        if (estimateByItem.length > 0) {
          this.pgInfo.supplierName = estimateByItem[0].SUPPLIER_NAME;
          this.pgInfo.area = estimateByItem[0].SUPPLIER_IN_AREA;
          this.pgInfo.starLevel = estimateByItem[0].SUPPLIER_STAR;
          this.pgInfo.supplierSortName = estimateByItem[0].SUPPLIER_SORT_NAME;

          this.pgForm.estimateHeadYear = estimateByItem[0].ESTIMATE_HEAD_YEAR;
          this.pgForm.estimateHeadType = estimateByItem[0].ESTIMATE_HEAD_TYPE;
          this.pgForm.estimateHeadRemark =
            estimateByItem[0].ESTIMATE_HEAD_REMARK;
          this.pgForm.estimateHeadModel = estimateByItem[0].ESTIMATE_HEAD_MODEL;
          this.pgForm.estimateHeadEndDate =
            estimateByItem[0].ESTIMATE_HEAD_END_DATE;
          this.pgForm.estimateBy = estimateByItem[0].ESTIMATE_BY;
          if (estimateByItem[0].ESTIMATE_HEAD_MODEL) {
            var arr = estimateByItem[0].ESTIMATE_HEAD_MODEL.split(",");
            for (var i in arr) {
              this.mubanData.push({
                name: arr[i],
                url: "",
              });
            }
          } else {
            this.mubanData = [];
          }
          for (var e = 0; e < estimateByItem.length; e++) {
            var arr = [];
            if (estimateByItem[e].ITEM_SCORE_STANDARD) {
              var arr2 = estimateByItem[e].ITEM_SCORE_STANDARD.split("&");
              for (let i in arr2) {
                var indexK = arr2[i].indexOf("（") + 1;
                arr.push({
                  title: arr2[i],
                  score: arr2[i].substring(indexK, arr2[i].length - 1),
                });
              }
            }
            console.log(arr);
            var xizeScore =
              (Number(estimateByItem[e].ESTIMATE_LINE_SCORE) *
                Number(estimateByItem[e].ITEM_SCORE)) /
              Number(estimateByItem[e].ITEM_WEIGHT);
            xizeScore = parseInt(xizeScore);
            xizeScore = xizeScore == 0 ? "xxx" : xizeScore;
            var params = {
              pgren: estimateByItem[e].ESTIMATE_LINE_NAME,
              weidu: estimateByItem[e].ITEM_DIMENSION,
              zhibiao: estimateByItem[e].ITEM_INDEX,
              quanzhong: estimateByItem[e].ITEM_WEIGHT,
              xize: arr,
              score: estimateByItem[e].ESTIMATE_LINE_SCORE,
              weiduCode: estimateByItem[e].ITEM_CODE,
              xizeScore: parseInt(xizeScore),
              zgf: estimateByItem[e].ITEM_SCORE,
            };
            if (estimateByItem[e].ITEM_WEIGHT) {
              this.guoChengPingGu.push(params);
            } else {
              this.optionList.push(estimateByItem[e]);
            }
          }
        }
        var scoreList = [];
        if (res.data.data.scoreList.length > 0) {
          for (let s in res.data.data.scoreList) {
            for (let o in this.optionList) {
              // 匹配到同一个人
              if (
                this.optionList[o].ESTIMATE_LINE_NUMBER ==
                res.data.data.scoreList[s].ESTIMATE_LINE_NUMBER
              ) {
                res.data.data.scoreList[
                  s
                ].ESTIMATE_LINE_REMARK = this.optionList[
                  o
                ].ESTIMATE_LINE_OPINION;
              }
            }
            if (res.data.data.scoreList[s].ESTIMATE_LINE_NUMBER) {
              scoreList.push(res.data.data.scoreList[s]);
            }
          }
          this.PGrenInfo = scoreList;
        }
      });
    },
    // 预览
    lookMuban(row) {
      var params = {
        itemType: "年度/半年度评估",
        itemFNum: row.ITEM_NUM,
      };
      this.mubanDialog2 = true;
      this.api.getEstimateByType(this.sso_sessionid, params).then((res) => {
        this.mubanDataList2 = res.data.data;
      });
    },
    getRowKey(row) {
      return row.ITEM_NUM;
    },
    //修改
    getEstimateByModelNameTow() {
      var params = {
        itemType: "年度/半年度评估",
      };
      this.api
        .getEstimateByModelName(this.sso_sessionid, params)
        .then((res) => {
          console.log(res);
          this.cooperOptions = res.data.data;
        });
    },
    // 模板列表
    getEstimateByModelName() {
      var params = {
        itemType: "年度/半年度评估",
      };
      this.api
        .getEstimateByModelName(this.sso_sessionid, params)
        .then((res) => {
          this.mubanDataList = res.data.data;
        });
    },
    // 选择模板
    choseMuban() {
      this.getEstimateByModelName();
      this.mubanDialog = true;
    },
    // 模板勾选
    mubanSelectFn(arr) {
      this.mubanData2 = arr;
    },
    // 添加评估人
    addPgPeople() {
      this.memberList.selectArr = this.pgPeople;
      this.memberList.isShow = true;
    },
    // 职员组件调用父元素方法
    memberListFn(selectArr) {
      this.pgPeople = selectArr;
      var str = "";
      var arr = [];
      for (var i in selectArr) {
        arr.push(
          selectArr[i].departmentName +
            "+" +
            selectArr[i].staffNumber +
            "+" +
            selectArr[i].username +
            "+" +
            selectArr[i].staffName +
            "+" +
            selectArr[i].companyCodeValueDesc
        );
      }
      str = arr.join(",");
      this.pgForm.estimateBy = str;
    },
    // 删除评估人
    delectPgPeople(index) {
      this.pgPeople.splice(index, 1);
      this.memberListFn(this.pgPeople);
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
    // 查看详情
    lookDetail(code) {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "look",
          supplierCode: code,
        },
      });
      window.open(href, "_blank");
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
    // 关闭弹窗
    pgCloseFn() {
      this.pgFormShow = false;
      this.pgFormShowQd = false;
      this.pgForm = {
        estimateHeadYear: "",
        estimateHeadType: "", // 评估类型
        estimateHeadRemark: "", // 评估说明
        supplierName: "", // 供应商名称
        supplierCode: "",
        estimateHeadEndDate: "", // 评估截止时间
        estimateBy: "", // 评估人
      };
      this.pgInfo = {};
      this.historyInfoData = [];
      this.mubanDataList = [];
      this.mubanData = [];
      this.mubanData2 = [];
      this.estimateLineOpinion = "";
      this.pgPeople = [];
    },

    // 启动评估
    qidongPgFn() {
      var arr = [];
      var arr2 = [];
      console.log(this.selectArr);
      if (this.selectArr.length == 0) {
        this.$message.error("请勾选需要启动评估的供应商！");
        return false;
      }
      for (let i in this.selectArr) {
        for (let j in this.selectArr) {
          if (
            this.selectArr[i].supplierSortName !=
            this.selectArr[j].supplierSortName
          ) {
            this.$message.error("不同类别供应商不能批量启动评估！");
            return false;
          }
        }
        if (this.selectArr[i].estimateHeadStatus == "submit") {
          // this.pgLook = true;
          // this.flow1 = true;
          this.$message.error("所选供应商包含已经启动评估的！");
          return false;
        }
        if (this.selectArr[i].estimateHeadStatus == "edit") {
          // this.pgLook = true;
          // this.flow1 = true;
          this.$message.error("所选供应商包含已经启动评估的！");
          return false;
        }
        if (this.selectArr[i].estimateHeadStatus == "PASS") {
          // this.pgLook = true;
          // this.flow1 = true;
          this.$message.error("所选供应商包含已经完成评估的！");
          return false;
        }
        if (this.selectArr[i].estimateHeadCode) {
          var supplierCodeAndEstimateHeadCode =
            this.selectArr[i].selSupplierCode +
            "+" +
            this.selectArr[i].estimateHeadCode;
        } else {
          var supplierCodeAndEstimateHeadCode = this.selectArr[i]
            .selSupplierCode;
        }
        arr.push(supplierCodeAndEstimateHeadCode);
        // 修改
        // arr2.push(this.selectArr[i].supplierCode);
        arr2.push(this.selectArr[i].selSupplierCode);

        console.log(this.selectArr[i].supplierCode);
      }
      var params = {
        arr: arr,
        estimateHeadType: this.searchForm.estimateHeadType,
      };
      this.historyData.supplierCodeList = arr2;

      this.flow1 = false;
      this.pgLook = false;
      this.getSupplierByContract();
      this.api.getEstimateByCode(this.sso_sessionid, params).then((res) => {
        this.pgFormShowQd = true;
        this.pgForm.estimateHeadYear = this.searchForm.estimateHeadYear;
        this.pgForm.estimateHeadType = this.searchForm.estimateHeadType;
        this.pgSupplier = res.data.data.supplierAndEstimate;
        console.log(res);
        this.pgSupplierList = [];
        for (let i in res.data.data.supplierAndEstimate) {
          this.pgSupplierList.push({
            supplierName: res.data.data.supplierAndEstimate[i].SUPPLIER_NAME,
            supplierCode: res.data.data.supplierAndEstimate[i].SUPPLIER_CODE,
          });
        }
      });
    },
    // 获取评估信息
    assessMentFn(type, title) {
      this.flow1 = true;
      this.pgLook = false;
      this.jdType = type;
      this.dialogTitle = title;
      if (this.selectArr.length != 1) {
        this.$message.error("必选且只能选择一个！");
        return false;
      }
      if (this.selectArr[0].estimateHeadStatus == "PASS") {
        this.pgLook = true;
        this.flow1 = true;
        this.$message.error("该供应商已经完成评估！");
        return false;
      }
      // if (this.selectArr[0].estimateHeadStatus == "edit") {
      //   this.pgLook = true;
      //   this.flow1 = true;
      //   this.$message.error("该供应商已经完成评估打分！");
      //   return false;
      // }
      if (
        this.selectArr[0].estimateHeadStatus != "submit" &&
        this.selectArr[0].estimateHeadStatus != "edit"
      ) {
        this.pgLook = true;
        this.flow1 = true;
        this.$message.error("该供应商必须启动评估后，才能进行评估！");
        return false;
      }

      this.pgForm.supplierName = this.selectArr[0].supplierName;
      this.pgForm.supplierCode = this.selectArr[0].selSupplierCode;

      var params = {
        supplierCode: this.selectArr[0].selSupplierCode,
        estimateHeadCode: this.selectArr[0].estimateHeadCode,
        estimateHeadType:
          this.selectArr[0].estimateHeadType ||
          this.searchForm.estimateHeadType,
      };
      this.api.getEstimateByItem(this.sso_sessionid, params).then((res) => {
        this.pgFormShow = true;
        var data = res.data.data;

        this.pgInfo.supplierName = data.supplierAndEstimate[0].SUPPLIER_NAME;
        this.pgInfo.area = data.supplierAndEstimate[0].SUPPLIER_IN_AREA;
        this.pgInfo.starLevel = data.supplierAndEstimate[0].SUPPLIER_STAR;
        this.pgInfo.supplierSortName =
          data.supplierAndEstimate[0].SUPPLIER_SORT_NAME;

        var arr = [];
        arr.push(this.selectArr[0].selSupplierCode);
        this.historyData.supplierCodeList = arr;
        this.getSupplierByContract();
        if (!data) return false;
        if (this.selectArr[0].estimateHeadCode) {
          if (data.supplierAndEstimate.length > 0) {
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
                  ITEM_INDEX: arr[i],
                  ITEM_NUM: "",
                });
              }
            } else {
              this.mubanData = [];
            }
          }
        }
        if (type != "1") {
          var estimateByItem = res.data.data.estimateByItem;
          this.guoChengPingGu = [];
          if (estimateByItem.length > 0) {
            this.estimateLineOpinion =
              estimateByItem[estimateByItem.length - 1].ESTIMATE_LINE_OPINION ||
              "";
            for (var e in estimateByItem) {
              var arr = [];
              if (estimateByItem[e].ITEM_SCORE_STANDARD) {
                var arr2 = estimateByItem[e].ITEM_SCORE_STANDARD.split("&");
                for (let i in arr2) {
                  var indexK = arr2[i].indexOf("（") + 1;
                  arr.push({
                    title: arr2[i],
                    score: arr2[i].substring(indexK, arr2[i].length - 1),
                  });
                }
              }
              var xizeScore =
                (Number(estimateByItem[e].ESTIMATE_LINE_SCORE) *
                  Number(estimateByItem[e].ITEM_SCORE)) /
                Number(estimateByItem[e].ITEM_WEIGHT);
              xizeScore = parseInt(xizeScore);
              xizeScore = xizeScore == 0 ? "xxx" : xizeScore;
              var params = {
                pgren: estimateByItem[e].ESTIMATE_BY,
                weidu: estimateByItem[e].ITEM_DIMENSION,
                zhibiao: estimateByItem[e].ITEM_INDEX,
                quanzhong: estimateByItem[e].ITEM_WEIGHT,
                score: estimateByItem[e].ESTIMATE_LINE_SCORE,
                weiduCode: estimateByItem[e].ITEM_CODE,
                xize: arr,
                xizeScore: xizeScore,
                zgf: estimateByItem[e].ITEM_SCORE,
              };
              if (estimateByItem[e].ITEM_WEIGHT) {
                this.guoChengPingGu.push(params);
                var sum = 0;
                for (let i in this.guoChengPingGu) {
                  sum += Number(this.guoChengPingGu[i].score);
                }
                this.nowScore = sum;
              }
            }
          }
        }
      });
    },
    // 发起评估
    fqPgFn() {
      if (!this.pgForm.estimateHeadYear) {
        this.$message.error("评估年度不能为空！");
        return false;
      }
      if (!this.pgForm.estimateHeadEndDate) {
        this.$message.error("评估截止时间不能为空！");
        return false;
      }
      if (!this.pgForm.estimateHeadType) {
        this.$message.error("评估类型不能为空！");
        return false;
      }
      if (!this.pgForm.estimateBy) {
        this.$message.error("评估人不能为空！");
        return false;
      }
      var arr = [];
      for (let i in this.pgSupplier) {
        var item = {
          supplierName: this.pgSupplier[i].SUPPLIER_NAME,
          supplierCode: this.pgSupplier[i].SUPPLIER_CODE,
          estimateBy: this.pgForm.estimateBy,
          estimateHeadEndDate: this.pgForm.estimateHeadEndDate,
          estimateHeadRemark: this.pgForm.estimateHeadRemark,
          estimateHeadType: this.pgForm.estimateHeadType,
          estimateHeadYear: this.pgForm.estimateHeadYear,
          //修改
          estimateHeadModel:
            // this.pgSupplier[i].ITEMNAME + "," + this.pgSupplier[i].ITEM_NUM,
            this.cooperOptionsTwo.ITEM_INDEX +
            "," +
            this.cooperOptionsTwo.ITEM_NUM,
        };
        arr.push(item);
      }
      this.api.saveHead(this.sso_sessionid, arr).then((res) => {
        this.$message.success("操作成功！");
        this.pgFormShowQd = false;
        this.searchFn();
      });
    },
    // 执行评估-提交打分
    assessMentDoing() {
      var arr = [];
      if (this.guoChengPingGu.length > 0) {
        for (var i in this.guoChengPingGu) {
          var params = {
            estimateHeadCode: this.selectArr[0].estimateHeadCode,
            estimateLineScore: this.guoChengPingGu[i].score,
            estimateScoreItem: this.guoChengPingGu[i].weiduCode,
          };
          arr.push(params);
        }
        arr.push({
          estimateHeadCode: this.selectArr[0].estimateHeadCode,
          estimateLineOpinion: this.estimateLineOpinion,
          estimateLineType: "option",
        });
      }
      this.api.saveEstimateList(this.sso_sessionid, arr).then((res) => {
        this.$message.success("操作成功！");
        this.pgFormShow = false;
        this.searchFn();
      });
    },
    // 完成评估
    async asmOk() {
      console.log(this.selectArr);
      if (this.selectArr == 0) {
        this.$message.error("请选择需要完成评估的供应商！");
        return false;
      }
      this.$confirm("确认对所选供应商进行完成评估?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.assessMentFinish();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    assessMentFinish() {
      var arr = [];
      for (let i in this.selectArr) {
        var item = {
          estimateHeadCode: this.selectArr[i].estimateHeadCode,
          estimateHeadRemark: this.selectArr[i].estimateHeadRemark,
          estimateScore: this.selectArr[i].estimateScore,
          supplierName: this.selectArr[i].supplierName,
          estimateBy: this.selectArr[i].estimateBy,
          supplierCode: this.selectArr[i].supplierCode,
        };
        arr.push(item);
      }
      this.api.completeEstimate(this.sso_sessionid, arr).then((res) => {
        this.$message.success("操作成功！");
        this.searchFn();
      });
    },
    // 完成评估
    // assessMentFinish() {
    //   var params = {
    //     estimateHeadCode: this.selectArr[0].estimateHeadCode,
    //     estimateScore: this.estimateScore,
    //   };
    //   this.api.completeEstimate(this.sso_sessionid, params).then((res) => {
    //     this.$message.success("操作成功！");
    //     this.pgFormShow = false;
    //     this.searchFn();
    //   });
    // },
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
      } else {
        if (!this.searchForm.estimateHeadYear) {
          this.$message.error("年份不能为空！");
          return false;
        }
        // if (!this.searchForm.estimateHeadType) {
        //   this.$message.error("评估类型不能为空！");
        //   return false;
        // }
      }
      this.api
        .getSupplierListByPage(this.sso_sessionid, this.searchForm)
        .then((res) => {
          console.log(res);
          this.accountsData = res.data.data;
          this.total = Number(res.data.count);
        });
    },

    // 评分改变
    radioChangeFn(row, index) {
      // （选择得分*权重*100）/最高分
      console.log(row.xizeScore); // 选择得分
      console.log(row.zgf); // 最高分
      console.log(row.quanzhong); // 权重
      var f = (Number(row.xizeScore) * Number(row.quanzhong)) / Number(row.zgf);
      this.guoChengPingGu[index].score = f.toFixed(2);
      var sum = 0;
      for (let i in this.guoChengPingGu) {
        sum += Number(this.guoChengPingGu[i].score);
      }
      this.nowScore = sum;
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
        text-align: left;
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