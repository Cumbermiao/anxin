<template>
    <div>
        <v-content id="title" title="业务对象管理">
            <div class="home_content">
                <section>
                    <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
                    <tree-node :sysTrees='sysTrees' @changeID="changeID" :indent='indent'></tree-node>
                </section>
                <section>
                    <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search>
                    <button class="button" @click="toCreate">新建</button>
                    <service-list :sys='sys' :watchPath='watchPath' :isScript='isScript' :modifyPath='modifyPath' :keywords='keywords' @changeOpObj='changeOpObj' @remove='remove'></service-list>
                    <pages :select='select' @changePageNum='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo'></pages>
                </section>
            </div>
        </v-content>
    </div>
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
            indent: 0,
            isShow: false,
            mc: '',
            ms: '',
            bz: '',
            zhxgr: '',
            zhxgsj: '',
            select: [10,20,40],
            keywords: '',
            sysTrees: [],
            obj: {},
            watchPath: '#/datCacl/script/watchSp',
            modifyPath: '#/datCacl/script/modifySp',
            isScript:true
        }
    },
    computed: {
        ...mapState({
            mpages: state => state.sp.pages,
            mpageNum: state => state.sp.pageNum,
            mpageSize: state => state.sp.pageSize,
            mtotalSize: state => state.sp.totalSize,
            currentId: state => state.sp.currentId,
            //查询的服务信息
            sys: state => state.sp.res,
            opObj: state => state.sp.opObj,
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
        search() {
            var val = {
                catalogWid: this.currentId,
                nameKey: this.keywords,
                pageNum: this.mpageNum,
                pageSize: this.mpageSize
            }
            console.log('val')
            console.log(val)
            this.$store.dispatch('SearchForScript', val)
        },
        changeID(id) {
            console.log('changeid')
            console.log(id)
            console.log(this.opObj)
            this.$store.commit('changeScriptId', id)
            this.search()
            console.log(this.currentId)
            this.obj = this.opObj
            console.log(this.obj)
        },
        changeKey(keywords) {
            this.keywords = keywords;
        },
        toCreate() {
            if (this.currentId == '') {
                alert('请选择分类')
            } else {
                router.push("/datCacl/script/createSp")
            }
        },
        skipTo(pageNum) {
            this.mpageNum = pageNum;
            this.$store.commit('changePageNum',pageNum)
            this.search();
        },
        changeOpObj(val) {
            console.log(val)
            this.$store.commit('changeSriptOpObj', val)
        },
        changePageSize(pageSize) {
            this.pageInfo.pageSize = pageSize;
            this.search()
        },

        remove() {
            console.log(this.currentId)
            // this.$store.commit('removeBM', this.currentId)
            // this.search();
        },

        

    },

    mounted() {

        axios.post('/common/catalog/queryTree', 'computeScript', {
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
        // console.log('this.opObj')
        // console.log(this.opObj)
        // if (this.opObj) {
        //     this.mc = this.opObj.catalogName,
        //         this.ms = this.opObj.catalogDesc,
        //         this.bz = this.opObj.bak,
        //         this.zhxgr = this.opObj.lastModifiedOperator,
        //         this.zhxgsj = this.opObj.lastModifiedTime
        // }
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
    padding: 15px;
    box-sizing: border-box;
}

.home_content section:first-child {
    width: 25%;
}
.home_content section:last-child {
    width: 70%;
    border-left: 1px solid #d8dcf0;
    min-height: 851px;
}
</style>
