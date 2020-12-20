<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-menu
        :default-active="indexSi"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#263238"
        text-color="#fff"
        active-text-color="#fff"
      >
        <router-link to="/" v-if="hasQx('aph2_supplier_GYSXXGL-QX-M10')">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">供应商信息管理</span>
          </el-menu-item>
        </router-link>
        <router-link to="changeList" v-if="hasQx('aph2_supplier_BGSHGL-QX-M10')">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">变更审核管理</span>
          </el-menu-item>
        </router-link>

        <router-link to="accounts" v-if="hasQx('aph2_supplier_GYSZHGL-QX-M10')">
          <el-menu-item index="3">
            <i class="el-icon-user-solid"></i>
            <span slot="title">供应商帐号管理</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>供应商评估管理</span>
          </template>
          <router-link to="assessment2" v-if="hasQx('aph2_supplier_GYSNDKH-QX-C11')">
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">半年度/年度考核</span>
            </el-menu-item>
          </router-link>

          <router-link to="assessment" v-if="hasQx('aph2_supplier_GYSNDKH-QX-C19')">
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">半年度/年度考核查询</span>
            </el-menu-item>
          </router-link>
        </el-submenu>

        <router-link to="starrating" v-if="hasQx('aph2_supplier_GYSPXDJ-QX-M10')">
          <el-menu-item index="6">
            <i class="el-icon-star-on"></i>
            <span slot="title">供应商评星定级管理</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "sidebar",
  // props: { indexSi: String },

  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 权限判断
    hasQx(value) {
      return this.commonFn.hasQx(value, this);
    },
  },
  computed: {
    ...mapState({
      indexSi: "indexSi",
    }),
  },
};
</script>

<style lang="less" >
@import "../assets/utils.less";
.el-menu-item.is-active {
  background-color: @color !important;
}
.sidebar {
  width: 100%;
  height: 100%;
  background: rgb(38, 50, 56);
  border-bottom: 1px solid #ccc;
  li {
    text-align: left;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
