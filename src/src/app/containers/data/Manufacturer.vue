<template>
  <v-content title="厂商排名">
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
import TagGroup from '../../components/TagGroup';
import {data} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    Search,
    TagGroup
  },
  data() {
    return {
      loading: true,
      keys: '',
      tag: -1
    }
  },
  computed: {
    ...mapState({
      rows: state => state.manufacturer.rows,
      totalSize: state => state.manufacturer.totalSize
    }),
    columns() {
      return [{
        key: 'rownum',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'pzxxname',
        title: '厂商名称',
        width: 150
      }, {
        key: 'sysname',
        title: '建设内容',
        width: 200
      }, {
        key: 'enablecount',
        title: '故障数',
        width: 50
      }, {
        key: 'enabletime',
        title: '故障处理耗时',
        width: 80
      }, {
        key: 'safecount',
        title: '漏洞数',
        width: 80
      }, {
        key: 'safetime',
        title: '安全处理耗时',
        width: 80
      }, {
        key: 'score',
        title: '得分',
        width: 50
      }, {
        key: 'pzxxid',
        title: '厂商ID',
        width: 50
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
      queryList: data.MANUFACTURER_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        sysname: this.keys,
        days: this.tag
      }).then(() => {
        this.loading = false;
      });
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
    tagChange(tag, idx) {
      this.tag = tag.value;
      this.pageChange();
    }
  }
}
</script>
