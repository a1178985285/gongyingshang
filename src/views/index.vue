<template>
  <div>
    <page-header></page-header>
    <el-row>
      <el-col :span="leftV" :style="{height: clientHeight + 'px', overflow: 'auto'}">
        <Sidebar :indexSi="indexSi"></Sidebar>
      </el-col>
      <el-col :span="rightV" :style="{height: clientHeight + 'px', overflow: 'auto'}">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pageHeader from "../components/header";
import Sidebar from "../components/sidebar";
export default {
  name: "App",
  data() {
    return {
      leftV: 4,
      rightV: 20,
      isCollapse: false,
      clientHeight: 100,
      indexSi: this.$store.state.indexSi
    };
  },
  mounted() {
    // debugger
    const that = this;
    window.clientHeight = document.body.clientHeight;
    that.clientHeight = Number(window.clientHeight) - 44;
    // window.onresize = () => {
    //   return (() => {
    //     window.clientHeight = document.body.clientHeight;
    //     that.clientHeight = window.clientHeight;
    //   })();
    // };
  },
  methods: {
    closeSidebar() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.leftV = 1;
        this.rightV = 23;
      } else {
        this.leftV = 4;
        this.rightV = 20;
      }
    }
  },
  components: {
    Sidebar
  }
};
</script>
<style lang="less">
@import '../assets/utils.less';
.el-button--primary{
    background: @color!important;
    color: #fff!important;
    border: 1px solid @color!important;
}
.el-button--default:focus, .el-button--default:hover{
    background: #fff !important;
    color: @color!important;
    border: 1px solid @color!important;
}
.el-button--default:focus.el-button--primary:focus, .el-button--default:hover.el-button--primary:hover{
    background: #cb1212 !important;
    color: #fff!important;
    border: 1px solid #cb1212!important;
}
.btn-default{
    background: none!important;
    color: @color!important;
    border: 1px solid @color!important;
}
.el-button--text{
    color: @color!important;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
    border-color: #d8bfc2!important;
}
.el-textarea__inner:focus{
  border: 1px solid #d8bfc2 !important;
}
html {
  background: #f9f9f9;
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.el-button--primary.is-disabled{
    opacity: 0.6;
}
</style>
