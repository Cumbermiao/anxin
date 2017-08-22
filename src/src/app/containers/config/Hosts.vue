<template>
  <v-content title="主机列表">
    <search 
      @search="search"
      placeholder="IP地址、业务系统"
      />
    <data-table 
      @pageChange="pageChange"
      @click="itemClick"
      :loading="loading"
      :columns="columns"
      :totalSize="totalSize"
      :rows="rows" />
  </v-content>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import Content from '../../components/Content';
import DataTable from '../../components/DataTable';
import Search from '../../components/Search';
import {config} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    Search
  },
  data() {
    return {
      loading: true,
      keys: ''
    }
  },
  computed: {
    ...mapState({
      rows: state => state.hosts.rows,
      totalSize: state => state.hosts.totalSize
    }),
    columns() {
      return [{
        key: 'number',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'ip',
        title: 'IP地址',
        width: 150
      }, {
        key: 'hostN',
        title: '主机名',
        width: 130
      }, {
        key: 'sys',
        title: '操作系统',
        width: 120
      }, {
        key: 'osVer',
        title: '操作系统版本',
        width: 80
      }, {
        key: 'disk',
        title: '磁盘(GB)',
        width: 50
      }, {
        key: 'mem',
        title: '内存(GB)',
        width: 50
      }, {
        key: 'cpuuse',
        title: 'CPU使用率',
        width: 80,
        render(value) {
          return `<div class="progress"><div class="progress-bar" style="width: ${value}%"></div><div class="progress-text">${value}</div></div>`;
        }
      }, {
        key: 'memuse',
        title: '内存使用率',
        width: 80,
        render(value) {
          return `<div class="progress"><div class="progress-bar" style="width: ${value}%"></div><div class="progress-text">${value}</div></div>`;
        }
      }, {
        key: 'diskuse',
        title: '磁盘使用率',
        width: 80,
        render(value) {
          return `<div class="progress"><div class="progress-bar" style="width: ${value}%"></div><div class="progress-text">${value}</div></div>`;
        }
      }, {
        key: 'name',
        title: '应用系统'
      }, {
        key: 'status',
        title: '状态',
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
      }]
    }
  },
  created() {
    this.pageChange();
  },
  methods: {
    ...mapActions({
      queryList: config.HOSTS_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        filter: this.keys
      }).then(() => this.loading = false);
    },
    itemClick(row, idx) {
      this.$router.push({name: 'hostdetail', params:{id: row.id}, query: {name: row.name, ip: row.ip}})
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    }
  }
}
</script>
