<template>
  <v-content id="title" title="数据对象管理">
    <div class="home_content">
      <section>
        <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
        <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search'></tree-node>
      </section>
      <section>
        <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search>
        <button class="button" @click="toCreate">新建</button>
        <service-list :sys='sys' :watchPath='watchPath' :modifyPath='modifyPath' :keywords='keywords' @changeOpObj='changeOpObj' @remove='remove'></service-list>
        <pages :select='select' @changePageNum='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo'></pages>
      </section>
    </div>
  </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import router from '../../../route'
import Content from '../../components/Content.vue';
import axios from '../../utils/axios';
import Search from '../../components/Search';
import SearchInput from '../../components/SearchInput.vue';
import Pages from '../../components/Pages';
import TreeNode from '../../components/TreeNode';
import ServiceList from '../../components/ServcieList'
export default {
  components: {
    vContent: Content,
    SearchInput,
    Search,
    Pages,
    TreeNode,
    ServiceList
  },
  data() {
    return {
      sysTrees: [],
      watchPath: '#/data/watchDO',
      modifyPath: '#/data/modifyDO',
      createPath: '',
      select: [],
      keywords: '',
    }
  },
  computed: {
    ...mapState({
      mpages: state => state.dob.pages,
      mpageNum: state => state.dob.pageNum,
      mpageSize: state => state.dob.pageSize,
      mtotalSize: state => state.dob.totalSize,
      currentId: state => state.dob.currentId,
      //查询的服务信息
      sys: state => state.dob.res,
      pageInfo() {
        return {
          pageNum: this.mpageNum,
          pageSize: this.mpageSize,
          pages: this.mpages,
          totalSize: this.mtotalSize
        }
      },

    })
  },
  methods: {
    searchSys() { },
    changeID(id) {
      console.log('changeid')
      console.log(id)
      this.$store.commit('changeID', id)
    },
    search() {
      this.$store.dispatch('searchForDO', { catalogWid: this.currentId, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize, sjdxzwm: this.keywords })
    },
    changeKey(keywords) {
      this.keywords = keywords;
    },
    toCreate() {
      router.push("/data/createDO")
    },
    skipTo(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.search();
    },
    changeOpObj(val) {
      console.log(val)
      this.$store.commit('changeDOOpObj', val)
    },
    changePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize;
      this.search()
    },
    remove(val) {
      axios.post('/data-open-web/metadata/dataobject/deleteByWid', val, { "headers": { "content-type": "application/json" } })
        .then((res) => {
          if (res.status == 200 && res.data.returnStatus == 1) {
            alert('删除成功')
          } else {
            alert('删除失败')
          }
        }).catch((err) => {
          alert('删除失败')
        })
    },
  },

  mounted() {
    axios.post('/data-open-web/common/catalog/queryTree', 'busiObj', {
      "headers": {
        "content-type": "application/json"
      }
    }).then((res) => {
      console.log(res)
      this.sysTrees = res.data.dataSet.children
      console.log(this.sysTrees)
    })
  },

}



</script>
<style scoped>
section:nth-of-type(2) {
  min-height: 600px;
}

.home_content {
  border: 1px solid #d8dcf0;
}

.home_content section:first-child {
  float: left;
  padding: 15px;
  height: 100%;
}

.home_content section:last-child {
  overflow: hidden;
  padding: 15px;
  border-left: 1px solid #d8dcf0;
}
</style>
