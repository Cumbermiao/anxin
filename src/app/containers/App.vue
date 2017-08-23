<template>
  <div id="app">
    <menu-bar :index="active" :menus="menus" />
    <v-main :tabs="tabs" :tabIndex="activeTab" :title="title">
      <router-view></router-view>
    </v-main>
  </div>
</template>
<script>
import MenuBar from '../components/MenuBar';
import Main from '../components/Main';
import { mapState, mapMutations } from 'vuex';

const menu = [{
  title: '数据开放服务管理',
  path: '/home',
  icon: 'iconfont icon-gaikuang',
  items: [
    {
      title: '实时查询服务',
      path: ''
    }, {
      title: '即时查询',
      path: 'querySS'
    }
  ]
},

{
  title: '元数据管理',
  path: '/data',
  icon: 'iconfont icon-peizhizhongxin',
  items: [
    {
      title: '数据源管理',
      path: 'source'
    }, {
      title: '数据对象管理',
      path: 'obj'
    }, {
      title: '业务对象管理',
      path: 'busiObj'
    }, {
      title: '数据业务分类管理',
      path: 'busiM'
    }
  ]
},
{
  title: '数据计算管理',
  path: '/datCacl',
  icon: 'iconfont icon-shujufenxi',
  items: [{
    title: '计算脚本管理',
    path: 'script'
  }, {
    title: '计算脚本分类管理',
    path: 'sType'
  }]
},
];


export default {
  components: {
    MenuBar,
    vMain: Main
  },
  data() {
    const route = this.$route;
    const path = route.fullPath
    const active = menu.findIndex(m => path.indexOf(m.path) >= 0);
    const activeTab = menu[active].items.findIndex(m => path.indexOf(m.path) >= 0);
    return {
      active,
      activeTab
    }
  },
  computed: {
    menus() {
      return menu;
    },
    title() {
      return this.menus[this.active].title;
    },
    tabs() {
      return this.menus[this.active].items;
    }
  },

  watch: {
    '$route'(route) {
      console.log('route')
      console.log(route)
      const currentRoute = route.fullPath;
      // this.active = this.menus[1].items.
      // this.menus.findIndex(function(m){
      //   currentRoute.indexOf(m.path)
      // })
      this.active = this.menus.findIndex(m => currentRoute.indexOf(m.path) >= 0);
      console.log(this.active)
      this.activeTab = this.menus[this.active].items.findIndex(m => currentRoute.indexOf(m.path) >= 0);
      console.log(this.activeTab)
    }
  }
}
</script>