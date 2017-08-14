<template>
  <v-content title="事件查询">
    <search 
      @search="search"
      placeholder="输入应用名称"
      />
    <tag-group
      @change="eventCategoryChange"
      label="事件分类" 
      :tags="eventCategory" />
    <tag-group
      @change="errorLevelChange"
      label="故障等级" 
      :tags="errorLevel" />
    <date-picker @change="selectTime" label="选择时间:" style="margin-bottom: 1em;" />
    <data-table 
      @pageChange="pageChange"
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :rows="rows" />
    <v-select
      style="margin: 1em 0"
      @change="chartChange"
      :items="select"
      :autoFire="true"
     />
    <chart 
      v-if="option"
      :option="option"
      :height="30" />
  </v-content>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import Content from '../../components/Content';
import DataTable from '../../components/DataTable';
import Search from '../../components/Search';
import TagGroup from '../../components/TagGroup';
import Chart from '../../components/Chart.vue';
import Select from '../../components/Select.vue';
import CustomDatePicker from '../../components/CustomDatePicker.vue';
import {report} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    Search,
    TagGroup,
    Chart,
    DatePicker: CustomDatePicker,
    vSelect: Select
  },
  data() {
    return {
      loading: true,
      keys: '',
      event: -1,
      level: -1,
      option: null,
      loadTime: 0,
      stime: null,
      etime: null
    }
  },
  computed: {
    ...mapState({
      rows: state => state.events.rows,
      totalSize: state => state.events.totalSize,
      chart: state => state.events.chart
    }),
    select() {
      return [{id: 0, text: '可用性分析'}, {id:1, text: '安全分析'}];
    },
    columns() {
      return [{
        key: 'rownum',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'sname',
        title: '事件对象',
        width: 150
      }, {
        key: 'content',
        title: '事件描述',
        width: 150
      }, {
        key: 'noticetime',
        title: '发现时间',
        width: 150
      }, {
        key: 'recovertime',
        title: '解决时间',
        width: 100
      }, {
        key: 'subname',
        title: '事件归属',
        width: 80
      }, {
        key: 'dname',
        title: '事件分类',
        width: 50
      }, {
        key: 'lname',
        title: '事件等级',
        width: 50
      }, {
        key: 'processuser',
        title: '处理人'
      }, {
        key: 'pre_state',
        title: '处理状态',
        width: 50
      }, {
        key: 'reason',
        title: '事件原因'
      }]
    },
    eventCategory() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: '可用性',
        value: 0
      }, {
        title: '安全',
        value: 1
      }]
    },
    errorLevel() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: '宕机',
        value: 0
      }, {
        title: '风险',
        value: 1
      }]
    }
  },
  methods: {
    ...mapActions({
      queryList: report.EVENTS_QUERY_LIST,
      queryChart: report.EVENTS_QUERY_CHART
    }),
    pageChange(page = 1, size = 10) {
      if (!this.stime || !this.etime) {
        return;
      }
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        sysname: this.keys,
        pretype: this.event,
        level: this.level,
        stime: this.stime,
        etime: this.etime
      }).then(() => this.loading = false);
      this.chartChange(this.select[0], 0)
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
    eventCategoryChange(tag, idx, first) {
      this.event = tag.value;
      if (!first) {
        this.pageChange();
      }
    },
    errorLevelChange(tag, idx, first) {
      this.level = tag.value;
      if (!first) {
        this.pageChange();
      }
    },
    selectTime(start, end) {
      const startMonth = start.getMonth() + 1;
      const startDate = start.getDate();
      this.stime = `${start.getFullYear()}-${startMonth < 10 ? "0" + startMonth : startMonth}-${startDate < 10 ? "0" + startDate : startDate}`;
      const endMonth = end.getMonth() + 1;
      const endDate = end.getDate();
      this.etime = `${end.getFullYear()}-${endMonth < 10 ? "0" + endMonth : endMonth}-${endDate < 10 ? "0" + endDate : endDate}`;
      this.pageChange();
    },
    chartChange(chart, idx) {
      this.queryChart({
        pretype: chart.id,
        stime: this.stime,
        etime: this.etime
      }).then(() => {
        const legend = this.chart.map(val => val.name);
        this.option = {
          title : {
              text: chart.text,
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: legend
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data: this.chart,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      })
    }
  }
}
</script>
