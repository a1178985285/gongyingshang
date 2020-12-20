import Vue from 'vue'
import VueRouter from 'vue-router'


import index from './views/index.vue'
import Information from './views/inforMation.vue'
import Accounts from './views/accounts.vue'
import Assessment from './views/assessMent.vue'
import Assessment2 from './views/assessMent2.vue'
import Starrating from './views/starRating.vue'
import changeList from './views/changeList.vue'

import register from './views/register/register.vue'
import wwRegister from './views/wwRegister.vue'
import supplierInfoLook from './views/supplierInfoLook.vue'
import pgDbPage from './views/pgDbPage.vue'
import kcDbPage from './views/kcDbPage.vue'
import starLevel from './views/starLevel.vue'
import starLevel2 from './views/starLevel2.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    redirect: 'Information',
    children: [{
      path: '/Information',
      name: 'Information',
      component: Information,
    }, {
      path: '/changeList',
      name: 'changeList',
      component: changeList
    }, {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts
    },
    {
      path: '/assessment',
      name: 'Assessment',
      component: Assessment
    },
    {
      path: '/assessment2',
      name: 'Assessment2',
      component: Assessment2
    },
    {
      path: '/starRating',
      name: 'Starrating',
      component: Starrating
    }]
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/supplierInfoLook',
    name: 'supplierInfoLook',
    component: supplierInfoLook
  },
  {
    path: '/wwRegister',
    name: 'wwRegister',
    component: wwRegister
  },
  {
    path: '/pgDbPage',
    name: 'pgDbPage',
    component: pgDbPage
  },
  {
    path: '/kcDbPage',
    name: 'kcDbPage',
    component: kcDbPage
  },
  {
    path: '/starLevel',
    name: 'starLevel',
    component: starLevel
  },
  {
    path: '/starLevel2',
    name: 'starLevel2',
    component: starLevel2
  },
  
   {
      path: '/cessForm',
      component: () => import('./views/cessForm')
    },

]

const router = new VueRouter({
  base: '/sp/',
  routes
})

export default router
