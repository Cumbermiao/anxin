<template>
  <v-content title="URL列表">
    <div class="middleware" style="margin-bottom: 1em;">
      <v-select 
        label="状态:"
        :size="6"
        @change="typeChange"
        :autoFire="true"
        :items="select"/>
      <search 
        @search="search"
        placeholder="应用服务、IP"
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
import Select from '../../components/Select.vue';
import Search from '../../components/Search';
import {config} from '../../constants';

export default {
  components: {
    vContent: Content,
    DataTable,
    vSelect: Select,
    Search
  },
  data() {
    return {
      loading: true,
      selected: -1,
      keys: ''
    }
  },
  computed: {
    ...mapState({
      rows: state => state.urls.rows,
      totalSize: state => state.urls.totalSize
    }),
    select() {
      return [{
        text: "全部",
        statusId: "-1"
      },
      {
        text: "正常",
        statusId: "0"
      },
      {
        text: "异常",
        statusId: "1"
      }]
    },
    columns() {
      return [{
        key: 'number',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'sysName',
        title: '应用系统',
        width: 130
      }, {
        key: 'url',
        title: 'URL'
      }, {
        key: 'cycle',
        title: '检测频率',
        width: 110
      }, {
        key: 'time',
        title: '监测时间',
        width: 170
      }, {
        key: 'refValue',
        title: '阈值',
        width: 100
      }, {
        key: 'status',
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
      }]
    }
  },
  methods: {
    ...mapActions({
      queryList: config.URLS_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        urlstatus: this.selected,
        searchname: this.keys
      }).then(() => this.loading = false);
    },
    typeChange(type, idx) {
      this.selected = type.statusId;
      this.pageChange();
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    }
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


