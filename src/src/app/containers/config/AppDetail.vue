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
      @countClick="tabCountClick"
      :not-link="true"
      :items="tabs" 
      :index="tabIndex" />
    <div style="margin-bottom: 1em;">
      <v-select 
        @change="deviceChange"
        v-show="dropItems.length > 0"
        :autoFire="true"
        :items="dropItems"/>
    </div>
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
      title: this.$route.query.name || '详情',
      tabIndex: parseInt(this.$route.params.tab) || 0,
      selected: -1,
      errorClick: null
    }
  },
  computed: {
    ...mapState({
      sysCount: state => state.apps.detail.sysCount,
      errorCount: state => state.apps.detail.errorCount,
      select: state => state.apps.detail.select,
      rows: state => state.apps.detail.rows,
      totalSize: state => state.apps.detail.totalSize
    }),
    dropItems() {
      return this.select.map(item => ({
        id: item.deviceId,
        text: item.deviceName
      }))
    },
    columns() {
      const type = this.activeType;
      if (type == 'url' || type == 'mid' || type == 'host' || type == 'db' || type == 'net') {
        return [{ 
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
          title: '累计故障数',
          width: 50,
          align: 'center'
        }]
      } else if (type == 'api') {
        return [{ 
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
          title: 'API名称',
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
          title: '累计故障数',
          width: 50,
          align: 'center'
        }];
      } else if (type == 'attack') {
        return [{
          key: 'rownum',
          title: '序号',
          width: 30,
          align: 'center'
        }, {
          key: 'happentime',
          title: '攻击时间',
          width: 150
        }, {
          key: 'url',
          title: '攻击地址',
          width: 150
        }, {
          key: 'sip',
          title: '攻击IP',
          width: 150
        }, {
          key: 'sareaname',
          title: 'IP归属地',
          width: 100
        }, {
          key: 'tagname',
          title: '攻击类型',
          width: 80
        }];
      } else if (type == 'loophole') {
        return [{
          key: 'rownum',
          title: '序号',
          width: 30,
          align: 'center'
        }, {
          key: 'sname',
          title: '事件对象',
          width: 100
        }, {
          key: 'content',
          title: '事件描述',
          width: 150
        }, {
          key: 'noticetime',
          title: '发现时间',
          width: 150
        }, {
          key: 'subname',
          title: '事件归属',
          width: 100
        }, {
          key: 'dname',
          title: '事件分类',
          width: 80
        }, {
          key: 'processuser',
          title: '处理人',
          width: 80
        }, {
          key: 'pre_state',
          title: '处理状态',
          width: 80
        }];
      }
      
    },
    tabs() {
      return [{
        title: "可访问性",
        count: this.errorCount.urlcount,
        type: 'url'
      }, 
      {
        title: "中间件",
        count: this.errorCount.midcount,
        type: 'mid'
      }, 
      {
        title:"主机",
        count: this.errorCount.hostcount,
        type: 'host'
      }, 
      {
        title: "数据库",
        count: this.errorCount.dbcount,
        type: 'db'
      }, 
      {
        title: "链路",
        count: this.errorCount.netcount,
        type: 'net'
      },
      {
        title: 'API ',
        type: 'api'
      },
      {
        title: "安全攻击",
        type: 'attack'
      },
      {
        title: "安全漏洞",
        type: 'loophole'
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
    this.queryErrorCount({
      domainid: this.$route.params.domainId
    })
  },
  methods: {
    ...mapActions({
      querySysCount: config.APPS_DETAIL_SYSCOUNT,
      queryErrorCount: config.APPS_DETAIL_ERRORCOUNT,
      querySelect: config.APPS_DETAIL_SELECT,
      queryList: config.APPS_DETAIL_LIST,
      queryAttackList: config.APPS_DETAIL_ATTACK,
      querySafeBug: config.APPS_DETAIL_BUG
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      const selectShow = this.dropItems.length > 0;
      if (this.activeType == 'attack') {
        this.queryAttackList({
          pageSize: size,
          pageNumber: page,  
          sysid: this.$route.params.id
        }).then(() => {
          this.loading = false;
          this.errorClick = null;
        });
      } else if (this.activeType == 'loophole') {
        this.querySafeBug({
          pageSize: size,
          pageNumber: page,  
          sysid: this.$route.params.id
        }).then(() => {
          this.loading = false;
          this.errorClick = null;
        });
      } else {
        this.queryList({
          pageSize: size,
          pageNumber: page,
          devicetype: this.activeType,
          deviceid: this.selected,
          domainid: this.$route.params.domainId,
          s: this.errorClick
        }).then(() => {
          this.loading = false;
          this.errorClick = null;
        });
      }
    },
    tabChange(tab, idx) {
      this.tabIndex = idx;
      this.querySelect({
        domainid: this.$route.params.domainId,
        devicetype: this.activeType
      });
    },
    tabCountClick(tab, idx) {
      this.errorClick = 1;
      this.tabChange(tab, idx)
    },
    deviceChange(device, idx) {
      if (device) {
        this.selected = device.id;
      } else {
        this.selected = null;
      }
      this.pageChange();
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


