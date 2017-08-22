<template>
  <div :style="{height: height + 'em'}">
  </div>  
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';

let chart = null;
export default {
  props: {
    height: Number,
    option: Object
  },
  mounted() {
    chart = echarts.init(this.$el);
    if (this.option) {
      chart.setOption(this.option);
    }
  },
  watch: {
    option(nOpt) {
      if (chart != null) {
        chart.setOption(nOpt, true);
      }
    }
  }
}
</script>
