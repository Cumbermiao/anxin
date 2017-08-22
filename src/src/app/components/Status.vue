/**
 * @deprecated
 */
<template>
  <div 
    class="status-ball"
    :style="{background: color}">
  </div>
</template>
<script>
const statusColorMap = {
  normal: 'rgb(105,184,74)',
  error: 'rgb(255,0,0)',
  unkown: 'rgb(255,255,0)'
}
export default {
  props: {
    status: 'normal'
  },
  computed: {
    color() {
      return statusColorMap[this.status];
    }
  }
}
</script>
