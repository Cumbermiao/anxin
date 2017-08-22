<template>
  <header class="navi clearfix">
    <div class="navi-title" v-if="title">
      {{title}}
    </div>
    <div 
      :is="notLink ? 'div' : 'router-link'"
      v-for="(item, idx) in items"
      @click="tabChange(item, idx)"
      :key="item.title"
      :to="{name: item.path}"
      :class="{'navi-item': true, 'active': active === idx}" >
        {{item.title}} 
        <span class="navi-count" v-if="!!item.count" @click="countClick($event, item, idx)">{{item.count}}</span>
      </div>
  </header>
</template>
<script>
export default {
  props: {
    title: String,
    items: Array,
    index: Number,
    notLink: Boolean
  },
  data() {
    return {
      active: this.index || 0
    }
  },
  watch: {
    index(n) {
      this.active = n;
    }
  },
  created() {
    if (this.items && this.items.length > 0) {
      let index = this.active;
      if (!this.items[index]) {
        index = 0;
      }
      this.tabChange(this.items[index], index);
    }
  },
  methods: {
    tabChange(item, idx) {
      this.active = idx;
      this.$emit('click', item, idx);
    },
    countClick(e, item, idx) {
      e.preventDefault();
      e.stopPropagation();
      this.$emit('countClick', item, idx);
    }
  }
};
</script>

