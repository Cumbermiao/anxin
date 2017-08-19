<template>
    <v-content id="title" title="业务对象管理">
        <div class="home_content">
            <section>
                <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
                <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search'></tree-node>
            </section>
            <section>
                <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search>
                <button class="button" @click="toCreate">新建</button>
                <service-list :sys='sys' :watchPath='watchPath' :modifyPath='modifyPath' :keywords='keywords' @changeOpObj='changeBOOpObj' @remove='remove'></service-list>
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
import Search from '../../components/Search'
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
            watchPath: '#/data/watchBO',
            modifyPath: '#/data/modifyBO',
            createPath: '',
            select: [],
            keywords: '',
        }
    },
    computed: {
        ...mapState({
            mpages: state => state.bo.pages,
            mpageNum: state => state.bo.pageNum,
            mpageSize: state => state.bo.pageSize,
            mtotalSize: state => state.bo.totalSize,
            currentId: state => state.bo.currentId,
            //查询的服务信息
            sys: state => state.bo.res,
        }),
        pageInfo() {
            return {
                pageNum: this.mpageNum,
                pageSize: this.mpageSize,
                pages: this.mpages,
                totalSize: this.mtotalSize
            }
        },
    },
    methods: {
        searchSys() { },
        changeID(id) {
            console.log('changeid')
            console.log(id)
            this.$store.commit('changeBOID', id)
        },
        search() {
            this.$store.dispatch('searchForBO', { ywdxflWid : this.currentId, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize, zwmc: this.keywords })
        },
        changeKey(keywords) {
            this.keywords = keywords;
        },
        toCreate() {
            if (this.currentId == '') {
                alert('请选择分类')
            } else {
                router.push("/data/createBO")
            }

        },
        skipTo(pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.search();
        },
        changeBOOpObj(val) {
            console.log(val)
            this.$store.commit('changeBOOpObj', val)
        },
        changePageSize(pageSize) {
            this.pageInfo.pageSize = pageSize;
            this.search()
        },
        remove(val) {
            this.$store.commit('removeBO', val)
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
