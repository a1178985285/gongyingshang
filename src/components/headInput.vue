<template>
  <el-form size="mini" class="headinput" :model="searchForm">
    <div class="formLeft">
      <el-form-item
        v-if="headInputData.tabs == '3' || headInputData.tabs == '4'"
        label="年份"
        class="el-col col-md-3"
      >
        <el-date-picker v-model="searchForm.dateYear" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-input placeholder="请输入" v-model="searchForm.supplierName"></el-input>
      </el-form-item>
      <el-form-item label="状态" v-if="headInputData.type == 10">
        <el-select v-model="searchForm.supplierStatus" placeholder="请选择">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="星级" v-if="headInputData.type == 3">
        <el-select v-model="searchForm.supplierStar" placeholder="请选择">
          <el-option label="1星" value="1"></el-option>
          <el-option label="2星" value="2"></el-option>
          <el-option label="3星" value="3"></el-option>
          <el-option label="4星" value="4"></el-option>
          <el-option label="5星" value="5"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-if="headInputData.tabs == '4'" label="供应商类别">
        <el-date-picker v-model="searchForm.dateValue" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>-->
    </div>
    <div class="formRight">
      <el-button type="primary" size="mini" @click="searchFn">查询</el-button>
      <el-button type="primary" size="mini" @click="resetFn">重置</el-button>
      <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C45')" size="mini" @click="exportFn">导出</el-button>
      <div class="type1" v-if="headInputData.tabs == '1' && headInputData.type == 1">
        <el-button v-if="hasQx('aph2_supplier_GYSXXGL-QX-C11')" type="primary" size="mini" @click="addSupplier">新增供应商</el-button>
      </div>
      <div class="type1" v-if="headInputData.tabs == '1' && headInputData.type == 3">
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转备选', '', 3)">转备选</el-button>
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转不合格', '', 3)">转不合格</el-button>
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转黑库', '', 3)">转黑库</el-button>
      </div>
      <div class="type1" v-if="headInputData.tabs == '1' && headInputData.type == 4">
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转潜在', '', 4)">转潜在</el-button>
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转黑库', '', 4)">转黑库</el-button>
      </div>
      <div class="type1" v-if="headInputData.tabs == '1' && headInputData.type == 5">
        <el-button type="primary" v-if="hasQx('aph2_supplier_GYSXXGL-QX-C36')" size="mini" @click="zhuanFn('转潜在', 'lang', 5)">转潜在</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import Vue from "vue";
export default Vue.component("headInput", {
  name: "headInput",
  props: {
    headInputData: {
      default: {},
      type: Object,
    },
  },
  data() {
    return {
      searchForm: {
        supplierStatus: "",
        supplierName: "",
        supplierStar: '',
      },
      selectOptions: [],
      tabsStatusObj: [
        [
          {
            value: "资质审查",
            label: "资质审查",
          },
          {
            value: "现场考察",
            label: "现场考察",
          },
          {
            value: "入库审批",
            label: "入库审批",
          },
          {
            value: "现场考察中",
            label: "现场考察中",
          },
          {
            value: "入库审批中",
            label: "入库审批中",
          },
        ],
        [
          {
            value: "备选",
            label: "2",
          },
        ],
        [
          {
            value: "转不合格审批中",
            label: "转不合格审批中",
          },
          {
            value: "转待观察审批中",
            label: "转待观察审批中",
          },
          {
            value: "转黑库审批中",
            label: "转黑库审批中",
          },
          {
            value: "合格",
            label: "合格",
          },
        ],
        [
          {
            value: "转潜在审批中",
            label: "转潜在审批中",
          },
          {
            value: "转黑库审批中",
            label: "转黑库审批中",
          },
          {
            value: "不合格",
            label: "不合格",
          },
        ],
        [
          {
            value: "转潜在审批中",
            label: "转潜在审批中",
          },
          {
            value: "黑库",
            label: "黑库",
          },
        ],
      ],
    };
  },
  watch: {
    headInputData: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        this.selectOptions = this.tabsStatusObj[newVal.type - 1];
      },
      deep: true,
    },
  },
  mounted() {
    console.log(this.headInputData);
    if (this.headInputData.tabs == "1") {
      this.selectOptions = this.tabsStatusObj[0];
    }
  },
  methods: {
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
    changeDate(res) {
      console.log(res);
    },
    // 导出
    exportFn() {
      this.$emit("exportFnEmit", this.searchForm.supplierName);
    },
    // 查询
    searchFn() {
      this.$emit("searchFn", this.searchForm);
    },
    // 重置
    resetFn() {
      this.searchForm = {};
      this.$emit("searchFn", this.searchForm, "reset");
    },
    // 新增供应商
    addSupplier() {
      const { href } = this.$router.resolve({
        path: "/register",
        query: {
          type: "add",
        },
      });
      var winObj = window.open(href, "_blank");

  //     const hrefNew = this.$router.resolve( {
  //       path: "/register",
  //       query: {
  //         type: "add",
  //       }
  //     } );
  //  window.open(hrefNew,'_blank')
      // var loop = setInterval(() => {
      //   if (winObj.closed) {
      //     clearInterval(loop);
      //     this.getListByPageFn();
      //   }
      // }, 1000);
    },
    // 转状态
    zhuanFn(InspectStatusName, type, index) {
      this.$emit("zhuanFn", InspectStatusName, type, index);
    },
  },
});
</script>

<style lang="less">
@import "../assets/utils.less";
.el-select-dropdown__item.selected {
  color: @color !important;
}
.el-date-table td.current:not(.disabled) span {
  background-color: @color !important;
}
.el-date-table td.available:hover {
  color: @color !important;
}
.el-date-table td.today span {
  color: @color !important;
}
.headinput {
  float: left;
  margin: 20px 0 10px 0;
  height: 32px;
}
.formLeft {
  width: 50%;
  float: left;
  margin-left: 20px;
}
.formLeft .el-form-item {
  width: 50%;
  float: left;
  .el-input {
    width: 120px;
  }
  .el-form-item__label {
    width: 82px;
    text-align: right;
  }
}
.formRight {
  float: left;
  width: calc(50% - 20px);
  text-align: right;
  padding-right: 20px;
  .type1 {
    display: inline-block;
    margin-left: 10px;
  }
}
</style>