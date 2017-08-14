<template>
  <v-content title="ODI列表">
    <div class="odi">
      <v-select 
        label="状态:"
        @change="statusChange"
        :size="6"
        :autoFire="true"
        :items="select"/>
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
import {mapActions, mapState, mapMutations} from 'vuex';
import Content from '../../components/Content';
import DataTable from '../../components/DataTable';
import Select from '../../components/Select.vue';
import {config} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    vSelect: Select
  },
  data() {
    return {
      loading: true,
      status: -1
    }
  },
  computed: {
    ...mapState({
      rows: state => state.odis.rows,
      totalSize: state => state.odis.totalSize
    }),
    select() {
      return [
        {
            text: "全部",
            id: -1
        },
        {
            text: "执行成功",
            id: 0
        },
        {
            text: "执行失败",
            id: 1
        },
        {
            text: "执行中",
            id: 2
        }
      ]
    },
    columns() {
      return [{
        key: 'number',
        title: '序号',
        width: 30,
        align: 'center'
      }, {
        key: 'name',
        title: '接口',
        width: 150
      }, {
        key: 'iname',
        title: '接口名称',
        width: 130
      }, {
        key: 'task',
        title: '任务'
      }, {
        key: 'tname',
        title: '任务名称'
      }, {
        key: 'stime',
        title: '执行开始时间',
        width: 170
      }, {
        key: 'etime',
        title: '执行结束时间',
        width: 170
      }, {
        key: 'status',
        title: '状态',
        width: 50,
        align: 'center',
        render(value, row) {
          if (value == 'D') {
            return `<div class="status-ball normal"></div>`;
          } else if (value == 'E') {
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
      queryList: config.ODIS_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        odistatus: this.status
      }).then(() => this.loading = false);
    },
    statusChange(status, idx) {
      this.status = status.id;
      this.pageChange();
    }
  }
}
</script>

<style scoped>
.odi {
  margin: 1em 0;
}
</style>

