<template>
  <span class="font-icon">
    <i :class="['iconfont', icon]" :style="{color: color}"></i>
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    icon: String,
    color: String
  }
}
</script>
<style scoped>
.font-icon {
  font-size: 12px;
  line-height: 1;
  display: inline-block;
}
.font-icon > i {
  vertical-align: middle;
}
</style>

