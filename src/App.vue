<template>
  <div id="app">

    <router-view/>

  </div>
</template>
<script>
import base from './api/base'
export default {
  name: "App",
  data() {
    return {
    };
  },
  created() {
    // 取 sso_sessionid
    var urlV = window.location.href;
    var switchV = urlV.indexOf('sso');
    var wwRegisterIndex = urlV.indexOf('wwRegister');
    var kcDbPage = urlV.indexOf('kcDbPage');
    var pgDbPage = urlV.indexOf('pgDbPage');
    var supplierInfoLook = urlV.indexOf('supplierInfoLook');
    var starLevel = urlV.indexOf('starLevel');
    var sso_sessionid = sessionStorage.getItem('sso_sessionid');
    if (wwRegisterIndex != -1 || pgDbPage != -1 || kcDbPage != -1 || supplierInfoLook != -1 || starLevel != -1) {
      return false;
    }
    if (switchV == -1) {
      if (!sso_sessionid) {
        window.location.href = base.tologinUrl;
      } else {
        // window.location.href = base.tologinUrl;
        // var userName = sso_sessionid.substring(0, sso_sessionid.indexOf('_'));
        // this.$store.commit('assignmentSSO', sso_sessionid);
        // this.$store.commit('userName', userName);
        this.login(sso_sessionid);
      }
    } else {
      if (!sso_sessionid) {
        var sso_sessionid2 = urlV.substring(urlV.indexOf('sso_sessionid=') + 14, urlV.indexOf('#/'));
        sessionStorage.setItem('sso_sessionid', sso_sessionid2);
      } else {
        var sso_sessionid2 = sso_sessionid;
      }
      var userName = sso_sessionid2.substring(0, sso_sessionid2.indexOf('_'));
      // this.$store.commit('assignmentSSO', sso_sessionid2);
      // this.$store.commit('userName', userName);
      this.login(sso_sessionid2);
    }
  },
  methods: {
    login(sso_sessionid) {
      this.api.getUserInfo(sso_sessionid).then(res => {
        this.$store.commit('realName', res.data.data.realName);
        var permissionList = [];
        var list = res.data.data.permissionList;
        if(list.length>0){
          for (var p = 0; p < list.length; p++) {
            if (list[p]) {
              if (list[p].indexOf('aph2_supplier') != -1) {
                permissionList.push(list[p]);
              }
            }
          }
        }
        this.$store.commit('permissionList', permissionList);
      })
    }
  },
}
</script>

<style lang="less">

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
/* 列表状态按钮颜色 */

.btnClass {
  width: auto;
  background: none;
  border: 1px solid #dcdfe6;
  color: #606266;
  border-radius: 3px;
  line-height: 1;
  padding: 7px 15px;
  font-size: 12px;
}
.DbtnClass {
  width: auto;
  background: none;
  border: 1px solid #dcdfe6;
  color: #606266;
  border-radius: 3px;
  line-height: 1;
  padding: 7px 15px;
  font-size: 12px;
}
.DbtnClass:focus{
  outline: none!important;
  cursor: default!important;
}
.btnClass:hover{
  cursor: default!important;
}
.btnClass_bjz {
  background: #a1887f;
  color: #fff;
}
.btnClass_ytg {
  background: #4db6ac;
  color: #fff;
}
.btnClass_yzz {
  background: #f05050;
  color: #fff;
}
.btnClass.btnClass_yth {
  background-color: #34d3eb;
  border-color: #34d3eb;
  color: #fff;
}
.btnClass.btnClass_yqh {
  background-color: #34d3eb;
  border-color: #34d3eb;
  color: #fff;
}
.btnClass_spz {
  color: #fff;
  background: #5d9cec;
}
.lineDiv{
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 6px 0;
}
</style>
