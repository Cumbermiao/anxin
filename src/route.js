import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '~/app/containers/App';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: App,
      redirect: { name: 'realtime' },
      children: [{
        name:'realtime',
        path: 'realtime',
        component: resolve => require(['~/app/containers/home/Home'], resolve)
      }, {
        name: 'createSS',
        path: 'createSS',
        component: resolve => require(['./app/containers/SS/create.vue'], resolve)
      }, {
        name: 'watchSS',
        path: 'watchSS',
        component: resolve => require(['./app/containers/SS/check.vue'], resolve)
      }, {
        name: 'modifySS',
        path: 'modifySS',
        component: resolve => require(['./app/containers/SS/modify.vue'], resolve)
      }, {
        name: 'querySS',
        path: 'querySS',
        component: resolve => require(['./app/containers/SS/query.vue'], resolve)
      }]
    },
    {
      path: '/data',
      component: App,
      redirect: { name: 'source' },
      children: [{
        name: 'source',
        path: 'source',
        component: resolve => require(['~/app/containers/dataSource/dataSource'], resolve)
      }, {
        name: 'createDS',
        path: 'source/createDS',
        component: resolve => require(['~/app/containers/dataSource/createDS'], resolve)
      }, {
        name: 'watchDS',
        path: 'source/watchDS',
        component: resolve => require(['./app/containers/dataSource/checkDS.vue'], resolve)
      }, {
        name: 'modifyDS',
        path: 'source/modifyDS',
        component: resolve => require(['./app/containers/dataSource/modifyDS.vue'], resolve)
      }, {
        name: 'obj',
        path: 'obj',
        component: resolve => require(['~/app/containers/dataObj/dataObj'], resolve)
      }, {
        name: 'createDO',
        path: 'obj/createDO',
        component: resolve => require(['~/app/containers/dataObj/createDO'], resolve)
      }, {
        name: 'watchDO',
        path: 'obj/watchDO',
        component: resolve => require(['./app/containers/dataObj/watchDO'], resolve)
      }, {
        name: 'modifyDO',
        path: 'obj/modifyDO',
        component: resolve => require(['./app/containers/dataObj/modifyDO'], resolve)
      }, {
        name: 'busiObj',
        path: 'busiObj',
        component: resolve => require(['~/app/containers/busiObj/busiObj'], resolve)
      }, {
        name: 'createBO',
        path: 'busiObj/createBO',
        component: resolve => require(['~/app/containers/busiObj/createBO'], resolve)
      }, {
        name: 'watchBO',
        path: 'busiObj/watchBO',
        component: resolve => require(['~/app/containers/busiObj/watchBO'], resolve)
      }, {
        name: 'modifyBO',
        path: 'busiObj/modifyBO',
        component: resolve => require(['~/app/containers/busiObj/modifyBO'], resolve)
      }, {
        name: 'busiM',
        path: 'busiM',
        component: resolve => require(['~/app/containers/busiManage/busiManage'], resolve)
      }
      ],
    },
    {
      path: '/datCacl',
      component: App,
      redirect: { name: 'script' },
      children: [
        {
          name: 'script',
          path: 'script',
          component: resolve => require(['~/app/containers/dataCacl/script'], resolve)
        },
        {
          name: 'watchSp',
          path: 'script/watchSp',
          component: resolve => require(['~/app/containers/dataCacl/watchScript'], resolve)
        },
        {
          name: 'modifySp',
          path: 'script/modifySp',
          component: resolve => require(['~/app/containers/dataCacl/modifyScript'], resolve)
        },
        {
          name: 'createSp',
          path: 'script/createSp',
          component: resolve => require(['~/app/containers/dataCacl/createScript'], resolve)
        },
        {
          name: 'sType',
          path: 'sType',
          component: resolve => require(['~/app/containers/dataCacl/scriptType'], resolve)
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.matched.some(route => route.meta.requireAuth)) {
  //   if () {
  //     next({
  //       path: '/login',
  //       query: {redirect: to.fullPath}
  //     });
  //   }
  // } else {
  next();
  // }
})

export default router;