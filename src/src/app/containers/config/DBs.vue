<template>
  <v-content title="数据库列表">
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
import TabNavi from '../../components/TabNavi.vue';
import {config} from '../../constants';

export default {
  components: {
    vContent: Content,
    DataTable,
    TabNavi
  },
  data() {
    return {
      loading: true,
      tabIndex: parseInt(this.$route.params.tab) || 0
    }
  },
  computed: {
    ...mapState({
      rows: state => state.dbs.rows,
      totalSize: state => state.dbs.totalSize
    }),
    columns() {
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
        key: "instanceNa",
        title: "实例名"
      },
      {
        key: "dataNa",
        title: "数据库名称",
        width: 80
      },
      {
        key: "ResNa",
        title: "用途",
        width: 260
      },
      {
        key: "ip",
        title: "IP地址",
        width: 110
      },
      {
        key: "dataVer",
        title: "版本",
        width: 100
      },
      {
        key: "COUNT",
        title: "会话数",
        width: 60
      },
      {
        key: "STATUS",
        title: "状态",
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
      },
      {
        key: "TypeName",
        title: "设备类型",
        width: 70
      },
      {
        key: "ASM",
        title: "ASM磁盘(GB)"
      }]
    },
    tabs() {
      return [{
        title: "oracle",
        type: 0
      }, 
      {
        title: "mysql",
        type: 1
      }, 
      {
        title:"sql server",
        type: 2
      }]
    },
    activeType() {
      return this.tabs[this.tabIndex].type;
    }
  },
  methods: {
    ...mapActions({
      queryList: config.DBS_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        dbtype: this.activeType,
      }).then(() => this.loading = false);
    },
    tabChange(tab, idx) {
      this.tabIndex = idx;
      this.pageChange();
    }
  }
}
</script>


