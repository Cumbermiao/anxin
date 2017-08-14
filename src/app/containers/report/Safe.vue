<template>
  <v-content title="安心攻击查询">
    <search 
      @search="search"
      placeholder="应用名称、攻击地址、攻击者、IP"
      />
    <v-select
      style="margin: 1em 0"
      label="攻击类型"
      @change="typeChange"
      :size="6"
      :items="select"
      :autoFire="true"
     />
    <date-picker @change="selectTime" label="选择时间:" style="margin-bottom: 1em;" />
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
import Select from '../../components/Select.vue';
import CustomDatePicker from '../../components/CustomDatePicker.vue';
import {report} from '../../constants';


export default {
  components: {
    vContent: Content,
    DataTable,
    Search,
    DatePicker: CustomDatePicker,
    vSelect: Select
  },
  data() {
    return {
      loading: true,
      keys: '',
      type: -1,
      stime: null,
      etime: null
    }
  },
  computed: {
    ...mapState({
      rows: state => state.safe.rows,
      totalSize: state => state.safe.totalSize
    }),
    select() {
      return [
        {text: "全部",statusId: -1},
        {statusId: 1001, text: "可疑攻击"},
        {statusId: 1101, text: "协议违规"},
        {statusId: 1102, text: "协议版本限制"},
        {statusId: 1103, text: "缺失报头"},
        {statusId: 1104, text: "HTTP方法限制"},
        {statusId: 1105, text: "畸形请求"},
        {statusId: 1106, text: "文件限制"},
        {statusId: 1107, text: "头部字段限制"},
        {statusId: 1108, text: "协议违规"},
        {statusId: 1201, text: "SQL注入攻击"},
        {statusId: 1202, text: "SQL盲注攻击"},
        {statusId: 1203, text: "代码注入攻击"},
        {statusId: 1204, text: "命令注入攻击"},
        {statusId: 1205, text: "文件注入攻击"},
        {statusId: 1206, text: "LDAP注入攻击"},
        {statusId: 1207, text: "SSI注入攻击"},
        {statusId: 1208, text: "XPATH注入攻击"},
        {statusId: 1299, text: "其它注入攻击"},
        {statusId: 1301, text: "跨站脚本攻击"},
        {statusId: 1302, text: "针对IE8的跨站攻击"},
        {statusId: 1399, text: "其它跨站攻击"},
        {statusId: 1401, text: "HTTP请求走私"},
        {statusId: 1402, text: "HTTP响应分割"},
        {statusId: 1403, text: "Session-Fixation攻击"},
        {statusId: 1499, text: "其它通用攻击"},
        {statusId: 1501, text: "WebShell后门"},
        {statusId: 1599, text: "其他木马"},
        {statusId: 1601, text: "目录信息泄露"},
        {statusId: 1602, text: "服务器信息泄露"},
        {statusId: 1603, text: "数据库信息泄露"},
        {statusId: 1604, text: "源代码泄露"},
        {statusId: 1699, text: "其它信息泄露"},
        {statusId: 1701, text: "扫描工具"},
        {statusId: 1702, text: "爬虫"},
        {statusId: 1801, text: "漏洞防护"},
        {statusId: 1901, text: "一句话webshell"},
        {statusId: 8001, text: "访问控制"},
        {statusId: 8002, text: "请求包长度限制"},
        {statusId: 8003, text: "响应包长度限制"},
        {statusId: 9901, text: "应用层DOS/CC"},
        {statusId: 9902, text: "暴力猜解"},
        {statusId: 9903, text: "跨站请求伪造"},
        {statusId: 9904, text: "机器人限制"},
        {statusId: 9906, text: "HTTPOnly"},
        {statusId: 9907, text: "Cookie防劫持"},
        {statusId: 9908, text: "Cookie防篡改"},
        {statusId: 9909, text: "目录防猜解"},
        {statusId: 9997, text: "盗链"},
        {statusId: 9998, text: "自学习策略"},
        {statusId: 9999, text: "自定义策略"}]
    },
    columns() {
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
        key: 'sysname',
        title: '应用名称',
        width: 150
      }, {
        key: 'url',
        title: '攻击地址'
      }, {
        key: 'sip',
        title: '攻击者',
        width: 100
      }, {
        key: 'sareaname',
        title: 'IP归属地'
      }, {
        key: 'tagname',
        title: '攻击类型',
        width: 100
      }]
    },
    eventCategory() {
      return [{
        title: '全部',
        value: -1
      }, {
        title: '可用性',
        value: 0
      }, {
        title: '安全',
        value: 1
      }]
    },
  },
  methods: {
    ...mapActions({
      queryList: report.SAFE_QUERY_LIST
    }),
    pageChange(page = 1, size = 10) {
      if (!this.stime || !this.etime) {
        return;
      }
      this.loading = true;
      this.queryList({
        pageSize: size,
        pageNumber: page,
        sysname: this.keys,
        tag_id: this.type,
        stime: this.stime,
        etime: this.etime
      }).then(() => this.loading = false);
    },
    search(key) {
      this.keys = key;
      this.pageChange();
    },
    typeChange(tag, idx, first) {
      this.type = tag.statusId;
      if (!first) {
        this.pageChange();
      }
    },
    selectTime(start, end) {
      const startMonth = start.getMonth() + 1;
      const startDate = start.getDate();
      this.stime = `${start.getFullYear()}-${startMonth < 10 ? "0" + startMonth : startMonth}-${startDate < 10 ? "0" + startDate : startDate}`;
      const endMonth = end.getMonth() + 1;
      const endDate = end.getDate();
      this.etime = `${end.getFullYear()}-${endMonth < 10 ? "0" + endMonth : endMonth}-${endDate < 10 ? "0" + endDate : endDate}`;
      this.pageChange();
    }
  }
}
</script>
