<template>
  <v-content title="黑白名单查询">
    <search 
      @search="search"
      placeholder="输入应用名称、厂商"
      />
    <tag-group
      @change="eventCategoryChange"
      label="分类" 
      :tags="eventCategory" />
    <tag-group
      @change="errorLevelChange"
      label="类别" 
      :tags="errorLevel" />
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
import {report} from '../../constants';


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
      event: -1,
      level: -1
    }
  },
  computed: {
    ...mapState({
      rows: state => state.black.rows,
      totalSize: state => state.black.totalSize
    }),
    columns() {
      return [{
        key: 'rownum',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'name',
        title: '黑白名单名称',
        width: 150
      }, {
        key: 'catagory',
        title: '分类',
        width: 50
      }, {
        key: 'categoryvalue',
        title: '类别',
        width: 50
      }, {
        key: 'sname',
        title: '归属应用',
        width: 100
      }, {
        key: 'add_time',
        title: '加入时间',
        width: 80
      }, {
        key: 'attack_count',
        title: '攻击学校数',
        width: 50
      }]
    },
    eventCategory() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: 'URL',
        value: 0
      }, {
        title: 'IP',
        value: 1
      }]
    },
    errorLevel() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: '白名单',
        value: 0
      }, {
        title: '黑名单',
        value: 1
      }]
    }
  },
  methods: {
    ...mapActions({
      queryList: report.BLACK_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        sysname: this.keys,
        sfqy: this.event,
        selecttype: this.level
      }).then(() => this.loading = false);
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
    eventCategoryChange(tag, idx, first) {
      this.event = tag.value;
      this.pageChange();
    },
    errorLevelChange(tag, idx, first) {
      this.level = tag.value;
      if (!first) {
        this.pageChange();
      }
    }
  }
}
</script>
