<template>
  <div class="pagination">
    <el-pagination
      v-if="paginationShow"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>


export default {
  name: "pagination",
  props: {
    //   当前页数
    currentPage: {
      type: Number,
      default: 1
    },
    //   总条数
    total: {
      type: Number,
      default: 1
    },
    paginationShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pageSizes: [10, 20, 50, 100],
      pageSize: 10
    };
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("changePage", page, this.pageSize);
    }
  }
};

</script>

<style lang="less">
@import "../assets/utils.less";
.pagination {
  .el-pagination {
    border: 1px solid #ccc;
    width: auto;
    float: right;
    background: #fff;
    padding: 0;
    margin-right: 20px;
  }
  .el-pagination .el-pager li {
    border-right: 1px solid rgb(214, 199, 199) !important;
    margin: 0 !important;
    border-radius: 0 !important;
    background-color: #fff !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @color !important;
  }
  .el-pagination.is-background .btn-prev {
    border-right: 1px solid #ccc;
  }
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next {
    margin: 0;
    background-color: #fff;
  }
  .el-pagination__total {
    margin: 0;
    padding: 0 6px;
    border-right: 1px solid #ccc;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: @color;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    color: #fff;
  }
}
</style>