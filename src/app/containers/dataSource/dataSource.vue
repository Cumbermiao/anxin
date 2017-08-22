<template>
    <v-content id="title" title="数据源管理">
        <div class="home_content">
            <section>
                <search placeholder="请输入对象分类名称关键词搜索" @changeKey='changeKey' @search='search'></search>
                <button class="button" @click="toCreate">新建</button>
                <service-list :sys='sys' :watchPath='watchPath' :modifyPath='modifyPath' :keywords='keywords' @changeOpObj='changeOpObj' @remove='remove'></service-list>
                <pages :select='select' @changePageNum='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo'></pages>
            </section>
        </div>
    </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Content from '../../components/Content.vue';
import axios from '../../utils/axios';
import ServiceList from '../../components/ServcieList';
import SearchInput from '../../components/SearchInput';
import Search from '../../components/Search';
import TreeNode from '../../components/TreeNode';
import Pages from '../../components/Pages';
import router from '../../../route'

export default {
    components: {
        ServiceList,
        vContent: Content,
        SearchInput,
        TreeNode,
        Search,
        Pages
    },
    data() {
        return {
            sysTrees: [],
            watchPath: '#/data/source/watchDS',
            modifyPath: '#/data/source/modifyDS',
            createPath: '',
            select: [],
            keywords: '',
        }
    },
    computed: {
        ...mapState({
            mpages: state => state.ds.pages,
            mpageNum: state => state.ds.pageNum,
            mpageSize: state => state.ds.pageSize,
            mtotalSize: state => state.ds.totalSize,
            currentId: state => state.ds.currentId,
            //查询的服务信息
            sys: state => state.ds.res,
            opObj: state => state.ds.opObj,
            sjkljyhm: state => state.ds.sjkljyhm,
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
        search() {
            this.$store.dispatch('searchForDS', { pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize, sjkljyhm: this.sjkljyhm, zcxtzwm: this.keywords })
        },
        changeKey(keywords) {
            this.keywords = keywords;
        },
        toCreate() {
            router.push("/data/source/createDS")
        },
        skipTo(pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.search();
        },
        changeOpObj(val) {
            console.log(val)
            this.$store.commit('changeDSOpObj', val)
        },
        changePageSize(pageSize) {
            this.pageInfo.pageSize = pageSize;
            this.search()
        },
        remove(val) {
            this.$store.commit('removeDS', val)
        },
    },
    mounted() {
        console.log(this.opObj=={})
        if (this.opObj!={}) {
            console.log('this.opObj')
            console.log(this.opObj)
            this.search();
        }
        
    
    },
}
</script>
<style scoped>
.home_content {
    padding: 15px;
    border: 1px solid #d8dcf0;
    min-height: 400px;
}
</style>


