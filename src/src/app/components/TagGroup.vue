<template>
  <div class="tag-group">
    <span class="tag-group-label" v-if="label && label.length > 0">{{label}}:</span>
    <tag 
      v-for="(t, idx) in tags"
      @click.native="select(t, idx)"
      :class="{active: active === idx}"
      :key="t.value">
      {{t.title}}
    </tag>
  </div>
</template>
<script>
import Tag from './Tag';
export default {
  components: {
    Tag
  },
  props: {
    label: String,
    defaultActive: Number,
    tags: Array // title, value
  },
  data() {
    return {
      active: this.defaultActive || 0
    }
  },
  created() {
    // FIXME: 这里只在初始化有数据时才进行处理， 并未watch tags的变化，本项目中动态tag的情况没有
    if (this.tags && this.tags.length > 0) {
      let index = this.active;
      if (!this.tags[index]) {
        index = 0;
      }
      this.select(this.tags[index], index, true);
    }
  },
  methods: {
    // 添加了第三个参数, 表示第一次加载
    select(tag, idx, isFirst = false) {
      this.active = idx;
      this.$emit('change', tag, idx, isFirst);
    }
  }
}
</script>
