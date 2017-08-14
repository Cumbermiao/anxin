<template>
  <v-content title="应用运行统计" icon="icon-dapingmu01-copy" @iconClick="toBigScreen">
    <search 
      @search="search"
      placeholder="输入厂商、应用名称"
      />
    <tag-group
      @change="tagChange"
      label="时间" 
      :tags="status" />
    <data-table 
      @pageChange="pageChange"
      @click="itemClick"
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :rows="rows" />
    <chart 
      style="margin-top: 1em;"
      v-if="option"
      :option="option"
      :height="35" />
  </v-content>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import Content from '../../components/Content';
import DataTable from '../../components/DataTable';
import Search from '../../components/Search';
import TagGroup from '../../components/TagGroup';
import Chart from '../../components/Chart.vue';
import {report} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    Search,
    TagGroup,
    Chart
  },
  data() {
    return {
      loading: true,
      keys: '',
      tag: -1,
      option: null
    }
  },
  computed: {
    ...mapState({
      rows: state => state.runners.rows,
      totalSize: state => state.runners.totalSize,
      chart: state => state.runners.chart
    }),
    columns() {
      return [{
        key: 'rownum',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'name',
        title: '应用名称',
        width: 150
      }, {
        key: 'pzxxname',
        title: '厂商',
        width: 150
      }, {
        key: 'duty_dept',
        title: '业务负责部门',
        width: 150
      }, {
        key: 'version',
        title: '版本',
        width: 50
      }, {
        key: 'create_time',
        title: '上线时间',
        width: 80
      }, {
        key: 'state',
        title: '建设状态',
        width: 50
      }, {
        key: 'enablecount',
        title: '故障数',
        width: 50
      }, {
        key: 'securitycount',
        title: '漏洞数',
        width: 50
      }, {
        key: 'enablerate',
        title: '可用性',
        width: 50
      }, {
        key: 'zerodays',
        title: '0访问量',
        width: 50
      }, {
        key: 'averycount',
        title: '日均访问量'
      }]
    },
    status() {
      return [{
        title: '近30天',
        value: 30
      }, {
        title: '近半年',
        value: 180
      }, {
        title: '近一年',
        value: 360
      }]
    }
  },
  methods: {
    ...mapActions({
      queryList: report.RUNNERS_QUERY_LIST,
      queryChart: report.RUNNERS_QUERY_CHART
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        filter: this.keys,
        days: this.tag
      }).then(() => {
        if (this.rows && this.rows[0]) {
          this.itemClick(this.rows[0], 0)
        }
        this.loading = false;
      });
    },
    itemClick(row, idx) {
      this.queryChart({
        sysid: row.id
      }).then(() => {
        const xAxis = [], data = [];
        for(let i=0, len=this.chart.length; i<len; i++) {
          xAxis.push(this.chart[i].day);
          data.push(this.chart[i].totalcount);
        }
        this.option = {
          title: {
            text: `${row.name}近30天访问量（PV）趋势:`
          },
          tooltip: {
            trigger: 'axis',
            formatter: '日期: {b}<br/>访问量: {c}'
          },
          xAxis: {
            name: '近30天',
            type: 'category',
            data: xAxis
          },
          yAxis: {
            name: '访问量(PV): 次',
            type: 'value'
          },
          series: [{
              type: 'line',
              lineStyle: {
                normal: {
                  color: '#5277ce'
                }
              },
              showSymbol: false,
              data: data
          }]
        }
      });
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
    tagChange(tag, idx) {
      this.tag = tag.value;
      this.pageChange();
    },
    toBigScreen() {
      this.$router.push('/bigscreenData');
    }
  }
}
</script>
