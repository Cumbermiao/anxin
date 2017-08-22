<template>
  <v-content title="中间件列表">
    <tab-navi 
      @click="tabChange"
      :not-link="true"
      :items="tabs" 
      :index="tabIndex" />
    <div class="middleware" style="margin-bottom: 1em;">
      <v-select 
        label="状态:"
        @change="typeChange"
        :size="6"
        :autoFire="true"
        :items="select"/>
      <search 
        @search="search"
        placeholder="应用服务、节点、IP、用途"
        />
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
import TabNavi from '../../components/TabNavi.vue';
import Select from '../../components/Select.vue';
import Search from '../../components/Search';
import {config} from '../../constants';

export default {
  components: {
    vContent: Content,
    DataTable,
    TabNavi,
    vSelect: Select,
    Search
  },
  data() {
    return {
      loading: true,
      tabIndex: parseInt(this.$route.params.tab) || 0,
      selected: -1,
      keys: ''
    }
  },
  computed: {
    ...mapState({
      rows: state => state.middlewares.rows,
      totalSize: state => state.middlewares.totalSize
    }),
    select() {
      return [{
        text: "全部",
        statusId: "-1"
      },
      {
        text: "可用",
        statusId: "0"
      },
      {
        text: "不可用",
        statusId: "1"
      }]
    },
    columns() {
      return [{
        key: 'rownum',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'ServerNa',
        title: 'Server名称',
        width: 130
      }, {
        key: 'NodeNa',
        title: '节点'
      }, {
        key: 'ip',
        title: 'IP地址',
        width: 110
      }, {
        key: 'ResNa',
        title: '用途'
      }, {
        key: 'WasVer',
        title: '版本'
      }, {
        key: 'JVMMEMRA',
        title: 'JVM利用率',
        width: 80
      }, {
        key: 'COUNT',
        title: '活动线程数',
        width: 60
      }, {
        key: 'STATUS',
        title: '当前状态',
        width: 50,
        align: 'center',
        render(value, row) {
          if (value == 0) {
            return `<div class="status-ball normal"></div>`;
          } else if (value == 1) {
            return `<div class="status-ball error"></div>`;
          } else {
            return  `<div class="status-ball"></div>`;
          }
        }
      }, {
        key: 'TypeName',
        title: '设备类型',
        width: 140
      }]
    },
    tabs() {
      return [{
        title: "websphere",
        type: 0
      }, 
      {
        title: "weblogic",
        type: 1
      }, 
      {
        title:"tomcat",
        type: 2
      }, 
      {
        title: "apache",
        type: 3
      }, 
      {
        title: "nginx",
        type: 4
      }]
    },
    activeType() {
      return this.tabs[this.tabIndex].type;
    }
  },
  methods: {
    ...mapActions({
      queryList: config.MIDDLEWARES_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        midtype: this.activeType,
        dbtype: this.selected,
        searchname: this.keys
      }).then(() => this.loading = false);
    },
    tabChange(tab, idx) {
      this.tabIndex = idx;
      this.pageChange();
    },
    typeChange(type, idx) {
      this.selected = type.statusId;
      this.pageChange();
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
  }
}
</script>
<style lang="postcss" scoped>
.middleware {
  & .search {
    display: inline-block;
  }
}
</style>


