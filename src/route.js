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
      children: [{
        path: '',
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
        path: 'createDS',
        component: resolve => require(['~/app/containers/dataSource/createDS'], resolve)
      },{
        name: 'watchDS',
        path: 'watchDS',
        component: resolve => require(['./app/containers/dataSource/checkDS.vue'], resolve)
      }, {
        name: 'modifyDS',
        path: 'modifyDS',
        component: resolve => require(['./app/containers/dataSource/modifyDS.vue'], resolve)
      }, {
        name: 'obj',
        path: 'obj',
        component: resolve => require(['~/app/containers/dataObj/dataObj'], resolve)
      }, {
        name: 'createDO',
        path: 'createDO',
        component: resolve => require(['~/app/containers/dataObj/createDO'], resolve)
      },{
        name: 'watchDO',
        path: 'watchDO',
        component: resolve => require(['./app/containers/dataObj/watchDO'], resolve)
      }, {
        name: 'modifyDO',
        path: 'modifyDO',
        component: resolve => require(['./app/containers/dataObj/modifyDO'], resolve)
      },{
        name: 'busiObj',
        path: 'busiObj',
        component: resolve => require(['~/app/containers/busiObj/busiObj'], resolve)
      },{
        name:'createBO',
        path:'createBO',
        component: resolve => require(['~/app/containers/busiObj/createBO'], resolve)
      },{
        name:'watchBO',
        path:'watchBO',
        component: resolve => require(['~/app/containers/busiObj/watchBO'], resolve)
      },{
        name:'modifyBO',
        path:'modifyBO',
        component: resolve => require(['~/app/containers/busiObj/modifyBO'], resolve)
      }
        // {
        //   name: 'hosts',
        //   path: 'hosts',
        //   component: resolve => require(['~/app/containers/config/Hosts'], resolve)
        // }, {
        //   name: 'hostdetail',
        //   path: 'hosts/:id/:tab?',
        //   component: resolve => require(['~/app/containers/config/HostDetail'], resolve)
        // }, {
        //   name: 'odis',
        //   path: 'odis',
        //   component: resolve => require(['~/app/containers/config/Odis'], resolve)
        // }, {
        //   name: 'urls',
        //   path: 'urls',
        //   component: resolve => require(['~/app/containers/config/Urls'], resolve)
        // }
      ],
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