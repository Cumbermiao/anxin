<template>
  <div class="number-view">
    <div class="number-view-number" :style="{color: color}">{{number}}</div>
    <div class="number-view-text">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: ['number', 'text', 'color']
}
</script>
<style>
.number-view {
  text-align: center;
  font-size: 12px;
  color: #464c5b;
}
.number-view-number {
  font-size: 2.66em;
  font-weight: 300;
}
.number-view-text {
  color: #666;
}
</style>
