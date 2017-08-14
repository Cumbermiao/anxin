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
      },{
        name:'createSS',
        path:'createSS',
        component: resolve => require(['./app/containers/SS/create.vue'], resolve)
      },{
        name:'watchSS',
        path:'watchSS',
        component: resolve => require(['./app/containers/SS/watch.vue'], resolve)
      }]
    },
    // {
    //   path:'./create',
    //   component:App,
    //   redirect:{name:'create'},
    //   children:[{
    //     name:'create',
    //     path:'create',
    //     component: resolve => require(['./app/components/create.vue'], resolve)
    //   }]
    // },
     {
      path: '/config',
      component: App,
      redirect: {name: 'apps'},
      children: [{
        name: 'apps',
        path: 'apps',
        component: resolve => require(['~/app/containers/config/Apps'], resolve)
        // component: resolve => require(['./app/containers/SS/create.vue'], resolve)
        
      },{
        name: 'appdetail',
        path: 'apps/:id-:domainId/:tab?',
        component: resolve => require(['~/app/containers/config/AppDetail'], resolve)
      },{
        name: 'dbs',
        path: 'dbs',
        component: resolve => require(['~/app/containers/config/DBs'], resolve)
      }, {
        name: 'middlewares',
        path: 'middlewares',
        component: resolve => require(['~/app/containers/config/Middlewares'], resolve)
      }, {
        name: 'hosts',
        path: 'hosts',
        component: resolve => require(['~/app/containers/config/Hosts'], resolve)
      }, {
        name: 'hostdetail',
        path: 'hosts/:id/:tab?',
        component: resolve => require(['~/app/containers/config/HostDetail'], resolve)
      }, {
        name: 'odis',
        path: 'odis',
        component: resolve => require(['~/app/containers/config/Odis'], resolve)
      }, {
        name: 'urls',
        path: 'urls',
        component: resolve => require(['~/app/containers/config/Urls'], resolve)
      }],
    }, 
    {
      path: '/report',
      component: App,
      redirect: {name: 'runners'},
      children: [{
        name: 'runners',
        path: 'runners',
        component: resolve => require(['./app/containers/SS/watch.vue'], resolve)
      }, {
        name: 'events',
        path: 'events',
        component: resolve => require(['~/app/containers/report/Events'], resolve)
      }, {
        name: 'safe',
        path: 'safe',
        component: resolve => require(['~/app/containers/report/Safe'], resolve)
      }, {
        name: 'black',
        path: 'black',
        component: resolve => require(['~/app/containers/report/Black'], resolve)
      }]
    }, {
      path: '/data',
      component: App,
      redirect: {name: 'manufacturer'},
      children: [{
        name: 'manufacturer',
        path: 'manufacturer',
        component: resolve => require(['~/app/containers/data/Manufacturer'], resolve)
      }, {
        name: 'resources',
        path: 'resources',
        component: resolve => require(['~/app/containers/data/Resources'], resolve)
      }]
    },
    {
      path: '/bigscreenData',
      component: resolve => require(['~/app/containers/report/DataScreen'], resolve)
    },
    {
      path: '*',
      component: App,
      children: [{
        path: '',
        component: resolve => require(['~/app/components/404'], resolve)
      }]
    }
  ]
});

router.beforeEach((to, from ,next) => {
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