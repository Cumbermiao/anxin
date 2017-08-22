<template>
    <div class="home_content">
        <section>
            <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
            <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search' :indent='indent'></tree-node>
        </section>
        <section>
            <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search>
            <button class="button"  @click="toCreate">新建</button>
            <service-list :sys='sys' :watchPath='watchPath' :modifyPath='modifyPath' :keywords='keywords' @changeOpObj='changeOpObj' @remove='remove'></service-list>
            <pages :select='select' @changePageNum='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo' ></pages>
        </section>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import router from '../../route'
// import { home } from '../../constants';
import Button from './Button';
// import Switch from '../../components/Switch';
import SwitchB from './SwitchB'
import Content from './Content.vue';
import ServiceList from './ServcieList'
// import FontIcon from '../../components/FontIcon.vue';
// import NumberView from '../../components/NumberView.vue';
import Search from './Search'
import SearchInput from './SearchInput.vue';
import Pages from './Pages';
// import axios from '../../utils/axios';
import TreeNode from './TreeNode';
export default {
    components: {
        vContent: Content,
        SearchInput,
        Search,
        mButton: Button,
        SwitchB,
        Pages,
        TreeNode,
        ServiceList
    },
    data() {
        return {
            isShow: false,
            select: [10, 20, 40],
            keys: '',
            img: require('../../assets/ico1.png'),
            onColor: '#333',
            offColor: '#999',
            checked: true,
            keywords: '',
            showCheck: false,
            watchPath:'#/home/watchSS',
            modifyPath:'#/home/modifySS',
            indent:0
        }
    },
    computed: {
        ...mapState({
            mpages: state => state.home.pages,
            mpageNum: state => state.home.pageNum,
            mtotalSize: state => state.home.totalSize,
            mpageSize: state => state.home.pageSize,
            currentId: state => state.home.currentId,
            sys: state => state.home.res,
            pageInfo() {
                return {
                    pageNum: this.mpageNum,
                    pageSize: this.mpageSize,
                    pages: this.mpages,
                    totalSize: this.mtotalSize
                }
            }
        })
    },
    props: ['sysTrees'],
    methods: {
        search() {
            this.$store.dispatch('searchInfo', { catalogWid: this.currentId, intfName: this.keywords, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize })
        },
        skipTo(val) {
            console.log('searching')
            this.pageInfo.pageNum = val;
            this.search();
        },
        changePageSize(val){
            this.pageInfo.pageSize = val;
            this.search();
        },
        toCreate(){
            console.log(this.currentId)
            if(this.currentId==''){
                alert('请选择分类')
            }else{
                router.push("home/createSS")
            }
            
        },
        searchSys() {

        },
        changeKey(key) {
            this.keywords = key;
        },
        changeID(id) {
            // console.log('xxxx' + id)
            this.$store.commit('changeID', id)
        },
        showChildrenTree(e) {
            console.log(e.target)
            console.log(e.target.parentNode)
            var childN = e.target.parentNode.getElementsByTagName('ul')[0]
            console.log(childN)

            if (childN.style.display == 'block') {
                childN.style.display = 'none';
                e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-right fa-lg'
            } else {
                childN.style.display = 'block';
                e.target.getElementsByTagName('i')[0].className = 'fa fa-caret-down fa-lg'
            }
            e.target.className = 'liBg active'
        },

        remove(e) {
            this.$store.commit('remove', e.wid)
            this.search();
        },
        changeOpObj(val) {
            this.$store.commit('changeOpObj', val)
        }
    },
    updated() {
        console.log('xxxxxxxxx')
        console.log(this.pageInfo)
    }
}
</script>

<style scoped>

.home_content {
    border: 1px solid #d8dcf0;
}
.home_content>section{
    display: inline-block
}
section{
    vertical-align: top;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}
.home_content section:first-child{
    border-right: 1px solid #d8dcf0;
    min-height: 600px;
    width: 25%;
}
.home_content section:last-child{
    width: 74%;
}


</style>
