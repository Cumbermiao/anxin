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
      path: '/data',
      component: App,
      redirect: {name: 'source'},
      children: [{
        name: 'source',
        path: 'source',
        component: resolve => require(['~/app/containers/home/Home'], resolve)
      },{
        name: 'obj',
        path: 'obj',
        component: resolve => require(['~/app/containers/home/Home'], resolve)
      }, {
        name: 'busi',
        path: 'busi',
        component: resolve => require(['~/app/containers/home/Home'], resolve)
      }, 
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