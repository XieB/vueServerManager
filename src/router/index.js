import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'index',
        component: resolve => {require(['@/components/index/index'], resolve)},
        meta: {
          title: '首页'
        }
      },
      {
          path: '/server/lists',
          component: resolve => {require(['@/components/server/lists'], resolve)},
          meta: {
              title: '服务器列表'
          }
      },
      {
          path: '/server/add',
          component: resolve => {require(['@/components/server/add'], resolve)},
          meta: {
              title: '添加服务器信息'
          }
      },
      {
          path: '/server/:id',
          component: resolve => {require(['@/components/server/add'], resolve)},
          meta: {
              title: '修改信息'
          }
      }
  ]
})
