<template>
  <v-content title="资源消耗统计">
    <search 
      @search="search"
      placeholder="输入应用名称、厂商"
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
      rows: state => state.resources.rows,
      totalSize: state => state.resources.totalSize
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
        width: 100
      }, {
        key: 'sys',
        title: '操作系统',
        width: 100
      }, {
        key: 'osVer',
        title: '操作系统版本',
        width: 100
      }, {
        key: 'name',
        title: '应用系统'
      }, {
        key: 'disk',
        title: '磁盘(GB)',
        width: 80
      }, {
        key: 'mem',
        title: '内存(GB)',
        width: 80
      }, {
        key: 'cpu',
        title: 'CPU(GHz)',
        width: 80
      }, {
        key: 'enableRate',
        title: '可用性',
        width: 50
      }, {
        key: 'freeDays',
        title: '闲置天数',
        width: 50
      }, {
        key: 'busyrate',
        title: '繁忙度',
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
      queryList: data.RESOURCES_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        filter: this.keys,
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
