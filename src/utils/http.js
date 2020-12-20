import axios from 'axios'
import Vue from 'vue'
import base from '../api/base';
import { Loading, Message } from 'element-ui';

var service = axios.create({
  timeout: 12000,
  // headers: { 'Content-Type': 'multipart/form-data' }
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.service = service;
console.log(process.env.VUE_APP_BASE_URL);
service.defaults.baseURL = process.env.VUE_APP_BASE_URL;

export default {
  exportWay(url, param) {
    let loadingInstance = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    });
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
      }).then(res => {
        loadingInstance.close();
        cback(res);
      }).catch(err => {
        loadingInstance.close();
        if (err.response) {
          Message({
            message: "请求错误",
            type: 'error'
          })
        } else {
          Message({
            message: "登录失效，请重新登录！",
            type: 'error'
          })
          // window.location.href = base.tologinUrl;
        }
      })
    })
  },
  getWay(url, param) {
    let loadingInstance = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    });
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
      }).then(res => {
        loadingInstance.close();
        if (res.data.returnCode == 0) {
          cback(res)
        } else {
          Message({
            message: res.data.message,
            type: 'error'
          })
        }
      }).catch(err => {
        loadingInstance.close();
        if (err.response) {
          Message({
            message: "请求错误",
            type: 'error'
          })
        } else {
          Message({
            message: "登录失效，请重新登录！",
            type: 'error'
          })
          // window.location.href = base.tologinUrl;
        }
      })
    })
  },
  postWay(url, params, type) {
    let loadingInstance = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    });
    if (type == 'pj') {
      return new Promise((cback, reject) => {
        service({
          method: 'post',
          url,
          params: params,
        }).then(res => {
          loadingInstance.close();
          if (res.data.returnCode == 0) {
            cback(res)
          } else {
            if(res.code == '501'){
              window.location.href = base.tologinUrl;
            } else {
              Message({
                message: res.data.message,
                type: 'error'
              })
            }
          }
        }).catch(err => {
          loadingInstance.close();
          if (err.response) {
            Message({
              message: "请求错误",
              type: 'error'
            })
          } else {
            Message({
              message: "登录失效，请重新登录！",
              type: 'error'
            })
            // window.location.href = base.tologinUrl;
          }
        })

      })
    } else {
      return new Promise((cback, reject) => {
        service({
          method: 'post',
          url,
          data: params,
        }).then(res => {
          loadingInstance.close();
          if (res.data.returnCode == 0) {
            cback(res)
          } else {
            if(res.data.code == '501'){
              window.location.href = base.tologinUrl;
            } else {
              Message({
                message: res.data.message,
                type: 'error'
              })
            }
          }
        }).catch(err => {
          loadingInstance.close();
          if (err.response) {
            Message({
              message: "请求错误",
              type: 'error'
            })
          } else {
            Message({
              message: "登录失效，请重新登录！",
              type: 'error'
            })
            // window.location.href = base.tologinUrl;
          }
        })

      })
    }

  }
} 