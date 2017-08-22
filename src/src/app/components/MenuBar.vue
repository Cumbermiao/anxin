<template>
  <div class="menu1 paper">
    <div class="logo">
      <icon-item :width="24" :distance="15" text="数据开放平台" :src="logo" />
    </div>
    <div class="user">
      <icon-item :width="24" :distance="15" text="admin" :src="userDefaultIcon" />
      <div class="operator">注销</div>
    </div>
    <router-link class="tabItem" v-for="(menu, idx) in menus" @click.native="menuChange(menu, idx)" :key="menu.title" :to="menu.path">
      <icon-item :distance="15" :text="menu.title" src="hack">
        <i :class="menu.icon" :style="{fontSize: menu.icon.indexOf('chart') > 0 ? '20px' : '24px'}" aria-hidden="true" ></i>
      </icon-item>
    </router-link>
  </div>
</template>

<script>

import IconItem from './IconItem';

export default {
  props: {
    menus: Array,
    index: Number
  },
  components: {
    IconItem
  },
  data() {
    return {
      active: this.index || 0,
      logo: require('assets/logo.png'),
      userDefaultIcon: require('assets/u16.png')
    }
  },
  created() {
    this.menuChange(this.menus[this.index], this.index);
  },
  watch: {
    index(n) {
      this.active = n;
    }
  },
  methods: {
    menuChange(menu, idx) {
      // document.getElementsByClassName('navi-item')[idx].color='blue'
      this.active = idx;
      this.$emit('click', idx, menu);
    },
    showOperations(e) {
      var display = e.target.parentNode.parentNode.parentNode.getElementsByClassName('operation')[0].style.display
      if (display != 'block') {
        console.log('xxxx')
        e.target.className = 'fa fa-caret-down fa-lg';
        e.target.parentNode.parentNode.parentNode.getElementsByClassName('operation')[0].style.display = 'block';
      } else {
        e.target.parentNode.parentNode.parentNode.getElementsByClassName('operation')[0].style.display = 'none';
        e.target.className = 'fa fa-caret-right fa-lg';
      }

    }
  }
}
</script>
<style scoped>
.operation {
  display: none;
}

.operation p {
  margin: 5px 0;
  text-indent: 45px;
  overflow: hidden;
  white-space: nowrap;
}
.operation p:hover{
background: rgba(70, 149, 255, .4);
}

.operation a {
  display: inline-block;
  width: 100%;
  text-decoration: none;
  color: #fff;
  padding: 5px 0;
}
</style>

