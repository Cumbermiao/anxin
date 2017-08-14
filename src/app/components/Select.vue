<template>
  <div class="select-wrap">
    <span class="label">{{label}}</span>
    <div class="select" :style="{width: size + 'em'}" tabindex="-1">
      <div 
        @click="toggle"
        :disabled="disabled"
        class="select-selectbox" 
        onselectstart="return false" 
        tabindex="-1">
        <div class="select-selectbox-inner">
          {{showText}}
        </div>
        <i class="select-selectbox-icon"></i>
      </div>
      <div 
        ref="dropdown"
        v-show="show"
        @blur="hide"
        :style="{
          top: top
        }"
        class="select-dropdown" 
        tabindex="-1">
        <ul class="select-selectbox-dropdown">
          <li 
            v-for="(item, idx) in items"
            @click="itemClick(item, idx)"
            :key="idx"
            :class="{selected: active === idx}">
            {{item.text || item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    disabled: Boolean,
    items: Array,
    defautActive: Number,
    up: Boolean,
    autoFire: Boolean,
    size: Number
  },
  data() {
    return {
      show: false,
      active: this.defautActive || 0,
      top: 0
    }
  },
  computed: {
    showText() {
      if (this.items && this.items[this.active]) {
        return this.items[this.active].text || this.items[this.active]
      }
      return '';
    }
  },
  created() {
    if (this.autoFire && this.items && this.items.length > 0) {
      let index = this.active;
      if (!this.items[index]) {
        index = 0;
      }
      this.itemClick(this.items[index], index);
    }
  },
  mounted() {
    // 计算下拉框大小, 进行定位
    if (this.up) {
      let totalHeight = this.items.length * 12;
      const dom = this.$refs.dropdown;
      const prev = dom.style.display;
      dom.style.display = 'block';
      totalHeight = dom.clientHeight;
      dom.style.display = prev;
      if (totalHeight > 200) {
        totalHeight = 200;
      }
      this.top = -2 - totalHeight + 'px';
    } else {
      this.top = '25px';
    }
  },
  watch: {
    items(newItems) {
      // FIXME: 由于newItems可能会变成空数组， 可能会有坑， 在事件回调中需要加入空判断
      if (this.autoFire && typeof newItems !== 'undefined') {
        this.itemClick(newItems[0], 0);
      }
    }
  },
  methods: {
    toggle() {
      if (this.disabled || this.items === 'undefined' || this.items.length == 0) {
        return;
      }
      this.show = !this.show;
      if (this.show) {
        // hack !!!
        this.$nextTick(() => this.$refs.dropdown.focus());
      }
    },
    hide() {
      this.show = false;
    },
    itemClick(item, idx) {
      this.$emit('change', item, idx);
      this.active = idx;
      this.show = false;
    }
  }
}
</script>