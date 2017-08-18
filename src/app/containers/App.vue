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
  path: '/data',
  icon: 'iconfont icon-peizhizhongxin',
  items: [{
    title: '数据源管理',
    path: 'source'
  }, {
    title: '数据对象管理',
    path: 'obj'
  }, {
    title: '业务对象管理',
    path: 'busiObj'
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