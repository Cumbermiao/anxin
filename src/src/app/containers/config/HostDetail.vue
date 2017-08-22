<template>
  <v-content :title="title">
    <div class="sys-count clearfix">
      <icon-item 
        :distance="5" 
        :width="10" 
        :count="sysCount.dedcount" 
        src="assets/shutdown.png" 
        text="总宕机数" />
      <icon-item 
        :distance="5" 
        :count="sysCount.alarmcount" 
        src="assets/risk.png" 
        text="总风险数" />
      <icon-item 
        :distance="5" 
        :count="sysCount.attackCount" 
        src="assets/attack.png" 
        text="总攻击数" />
      <icon-item 
        :distance="5" 
        :count="sysCount.safecount" 
        src="assets/loophole.png" 
        text="总漏洞数" />
    </div>
    <tab-navi 
      @click="tabChange"
      :not-link="true"
      :items="tabs" 
      :index="tabIndex" />
    <data-table 
      @pageChange="pageChange"
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :rows="rows" />
  </v-content>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Content from '../../components/Content';
import DataTable from '../../components/DataTable';
import IconItem from '../../components/IconItem.vue';
import TabNavi from '../../components/TabNavi.vue';
import Select from '../../components/Select.vue';
import {config} from '../../constants';

export default {
  components: {
    vContent: Content,
    DataTable,
    IconItem,
    TabNavi,
    vSelect: Select
  },
  data() {
    return {
      loading: true,
      title: `${this.$route.query.name}(${this.$route.query.ip})` || '详情',
      tabIndex: parseInt(this.$route.params.tab) || 0,
      columns: []
    }
  },
  computed: {
    ...mapState({
      sysCount: state => state.apps.detail.sysCount,
      rows: state => state.hosts.detail.rows,
      totalSize: state => state.hosts.detail.totalSize
    }),
    // columns() {
    //   return 
    // },
    tabs() {
      return [{
        title: "监控阈值",
        type: 'url'
      }, 
      {
        title: "进程信息",
        type: 'mid'
      }, 
      {
        title:"端口信息",
        type: 'host'
      }]
    },
    activeType() {
      return this.tabs[this.tabIndex].type;
    }
  },
  created() {
    this.querySysCount({
      sysid: this.$route.params.id
    });
  },
  methods: {
    ...mapActions({
      querySysCount: config.APPS_DETAIL_SYSCOUNT,
      queryList: config.HOSTS_QUERY_DETAIL
    }),
    pageChange(type='url', page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        type,
        pageSize: size,
        pageNumber: page,
        devicetype: 'host',
        deviceid: '67',
        domainid: '513'
      }).then(() => this.loading = false);
    },
    tabChange(tab, idx) {
      this.tabIndex = idx;
      if (tab.type == 'url') {
        this.columns = [{ 
          key: 'id',
          title: 'ID',
          hidden: true
        }, {
          key: 'rownum',
          title: '序号',
          width: 30,
          align: 'center'
        }, {
          key: 'name',
          title: '指标名称',
          width: 150
        }, {
          key: 'refValue',
          title: '阈值',
          width: 150
        }, {
          key: 'cycle',
          title: '检测频率',
          width: 150
        }, {
          key: 'status',
          title: '当前状态',
          width: 50,
          align: 'center',
          render(value, row) {
            if (value == "0") {
              return `<div class="status-ball normal"></div>`;
            } else if (value == "1") {
              return `<div class="status-ball error"></div>`;
            } else {
              return  `<div class="status-ball"></div>`;
            }
          }
        }, {
          key: 'failureCount',
          title: '故障数',
          width: 50,
          align: 'center'
        }];
      } else if (tab.type == 'mid') {
        this.columns = [{
          "key": "rownum",
          "title": "序号",
          "width": 50
        },
        {
          "key": "id",
          "title": "进程ID"
        },
        {
          "key": "name",
          "title": "进程名称"
        },
        {
          "key": "user",
          "title": "用户名"
        },
        {
          "key": "pm",
          "title": "物理内存（KB）",
          "width": 120
        },
        {
          "key": "vm",
          "title": "虚拟内存（KB）",
          "width": 120
        },
        {
          "key": "cpu",
          "title": "CPU平均利用率（%）",
          "width": 150
        },
        {
          "key": "process",
          "title": "进程状态"
        },
        {
          "key": "error",
          "title": "异常进程"
        }]
      } else if (tab.type == 'host') {
        this.columns = [{
          "key": "rownum",
          "title": "序号",
          "width": 50
        },
        {
          "key": "id",
          "title": "端口",
          "width": 70
        },
        {
          "key": "name",
          "title": "状态",
          "width": 70
        },
        {
          "key": "pm",
          "title": "协议",
          "width": 70
        },
        {
          "key": "vm",
          "title": "服务",
          "width": 100
        },
        {
          "key": "cpu",
          "title": "版本"
        },
        {
          "key": "process",
          "title": "状态",
          "width": 70
        },
        {
          "key": "error",
          "title": "安全说明"
        }]
      }
      this.pageChange(tab.type);
    }
  }
}
</script>
<style lang="postcss">
.sys-count {
  padding-bottom: 1em;
  & .icon-item {
    float: left;
    margin-right: 1.5em;
    font-size: 12px;
  }
}
</style>