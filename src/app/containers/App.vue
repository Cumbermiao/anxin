<template>
  <div id="app">
    <menu-bar 
      :index="active"
      :menus="menus" />
      <v-main 
        :tabs="tabs"
        :tabIndex="activeTab"
        :title="title">
        <router-view></router-view>
      </v-main>
  </div>
</template>
<script>
import MenuBar from '../components/MenuBar';
import Main from '../components/Main';
import {mapState, mapMutations} from 'vuex';

const menu = [{
  title: '数据开放服务管理',
  path: '/home',
  icon: 'iconfont icon-gaikuang',
  items: []
},

{
  title: '元数据管理',
  path: '/config',
  icon: 'iconfont icon-peizhizhongxin',
  items: [{
    title: '数据源管理',
    path: 'apps'
  }, {
    title: '数据对象管理',
    path: 'dbs'
  }, {
    title: '业务数据管理',
    path: 'middlewares'
  }, {
    title: '数据业务分类管理',
    path: 'hosts'
  }]
},
 {
  title: '报表中心',
  path: '/report',
  icon: 'iconfont icon-baobiaozhongxin',
  items: [{
    title: '应用运行统计',
    path: 'runners'
  }, {
    title: '事件查询',
    path: 'events'
  }, {
    title: '安全攻击查询',
    path: 'safe'
  }, {
    title: '黑白名单查询',
    path: 'black'
  }]
}, {
  title: '数据分析',
  path: '/data',
  icon: 'iconfont icon-shujufenxi',
  items: [{
    title: '厂商排名',
    path: 'manufacturer'
  }, {
    title: '资源消耗统计',
    path: 'resources'
  }]
}];


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
      const currentRoute = route.fullPath;
      this.active = this.menus.findIndex(m => currentRoute.indexOf(m.path) >= 0);
      this.activeTab = this.menus[this.active].items.findIndex(m => currentRoute.indexOf(m.path) >= 0);
    }
  }
}
</script>