<template>
    <v-content id="title" title="业务对象管理">
        <div class="home_content">
            <section>
                <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
                <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search' :indent='indent' :sType='sType'></tree-node>
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
            watchPath: '#/data/busiObj/watchBO',
            modifyPath: '#/data/busiObj/modifyBO',
            createPath: '',
            select: [],
            keywords: '',
            indent:0,
            sType:'bo'
            // searchType:'BO'
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
            searchType:state=>state.bo.searchType
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
    // watch:{
    //     '$route'(to,from){
    //         alert(to.fullPath)
    //     }
    // },
    methods: {
        searchSys() { },
        changeID(id) {
            console.log('changeid')
            console.log(id)
            this.$store.commit('changeBOID', id)
        },
        search() {
            this.$store.dispatch('searchForBO', { ywdxflWid: this.currentId, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize, zwmc: this.keywords })
        },
        changeKey(keywords) {
            this.keywords = keywords;
        },
        toCreate() {
            if (this.currentId == '') {
                alert('请选择分类')
            } else {
                router.push("/data/busiObj/createBO")
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
            this.search();
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
    updated() {
        console.log('this.pageInfo')
        console.log(this.pageInfo)
    }

}



</script>
<style scoped>
.home_content {
    border: 1px solid #d8dcf0;
}

.home_content>section {
    display: inline-block
}

section {
    vertical-align: top;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}

.home_content section:first-child {
    border-right: 1px solid #d8dcf0;
    min-height: 600px;
    width: 25%;
}

.home_content section:last-child {
    width: 74%;
}
</style>
