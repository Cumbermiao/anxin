<template>
  <v-content title="应用列表">
    <search 
      @search="search"
      placeholder="输入厂商、应用名称"
      />
    <tag-group
      @change="tagChange"
      label="异常状态" 
      :tags="status" />
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
import TagGroup from '../../components/TagGroup';
import {config} from '../../constants';


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
      rows: state => state.apps.rows,
      totalSize: state => state.apps.totalSize
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
        key: 'name',
        title: '应用名称',
        width: 150
      }, {
        key: 'pzxxname',
        title: '厂商',
        width: 150
      }, {
        key: 'duty_dept',
        title: '业务负责部门',
        width: 150
      }, {
        key: 'version',
        title: '版本',
        width: 50
      }, {
        key: 'state',
        title: '建设状态',
        width: 50
      }, {
        key: 'enablestate',
        title: '可用监控',
        width: 50,
        align: 'center',
        render(value, row) {
          if (value == "-1") {
            return `<i class="iconfont icon-keyongxingjiankong" style="color: #999"></i>`;
          } else if (value == "0") {
            return `<i class="iconfont icon-keyongxingjiankong" style="color: #60be29"></i>`;
          } else if (value == "1") {
            return `<i class="iconfont icon-keyongxingjiankong" style="color: #ebd42c"></i>`;
          } else if (value == "2") {
            return `<i class="iconfont icon-keyongxingjiankong" style="color: #e24034"></i>`;
          }
        }
      }, {
        key: 'securitystate',
        title: '安全监控',
        width: 50,
        align: 'center',
        render(value, row) {
          if (value == "-1") {
            return `<i class="iconfont icon-bug" style="color: #999"></i>`;
          } else if (value == "0") {
            return `<i class="iconfont icon-bug" style="color: #60be29""></i>`;
          } else if (value == "1") {
            return `<i class="iconfont icon-bug" style="color: #e24034"></i>`;
          }
        }
      }, {
        key: 'security_protect_open',
        title: '安全防护',
        width: 50,
        align: 'center',
        render(value, row) {
          if (value == 0) {
              return `<i class="iconfont icon-anquan" style="color: #999"></i>`;
          } else if (value == 1) {
              return `<i class="iconfont icon-anquan" style="color: rgb(105,184,74)"></i>`;
          }
        }
      }, {
        key: 'makeframe',
        title: '开发框架'
      }, {
        key: 'environment',
        title: '运行环境'
      }]
    },
    status() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: '可用',
        value: 0
      }, {
        title: '安全',
        value: 1
      }]
    }
  },
  methods: {
    ...mapActions({
      queryList: config.APPS_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      tracker.track('查询下一页数据', {
        page: page,
        size: size
      }, () => {
        this.queryList({
          pageSize: size,
          pageNumber: page,
          sysname: this.keys,
          errorstate: this.tag
        }).then(() => this.loading = false);
      })
    },
    itemClick(row, idx) {
      this.$router.push({name: 'appdetail', params:{id: row.id, domainId: row.domain_id}, query: {name: row.name}})
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
