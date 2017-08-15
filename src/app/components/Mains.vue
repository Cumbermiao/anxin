<template>
    <div class="home_content">
        <section>
            <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
    
            <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search({catalogWid:currentId,intfName:keywords,pageNum,pageSize})'></tree-node>
    
        </section>
        <section>
            <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search( {catalogWid:currentId,intfName:keywords,pageNum,pageSize})'></search>
            <router-link class="button" to="home/createSS">新建</router-link>
    
            <div class="system" @mouseover="showHover">
                <div class="sys_info" v-for="item in sys">
                    <img :src="img" alt="">
                    <div class="detail">
                        <p class="title">{{item.queryIntfName}}</p>
                        <div>
                            <span class="dtitle">描述</span>
                            <span class="desc">{{item.queryIntfDesc}}</span>
                        </div>
                        <div>
                            <span class="dtitle">最后修改时间</span>
                            <span class="desc">{{item.lastModifiedTime}}</span>
                        </div>
                        <!-- <div v-if="item.isUsed">
                            <span class="dtitle">是否启用</span>
                            <switch-b></switch-b>
                        </div> -->
                    </div>
    
                    <div class="system-hover">
                        <p>
                            <span>查看</span>|
                            <span>修改</span>|
                            <span>删除</span>
                        </p>
                    </div>
                </div>
            </div>
            <pages :select='select'></pages>
        </section>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
// import { home } from '../../constants';
import Button from './Button';
// import Switch from '../../components/Switch';
import SwitchB from './SwitchB'
import Content from './Content.vue';
import WaterBall from './WaterBall.vue';
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
    },
    data() {
        return {
            isShow: false,
            select: [20, 40, 60],
            keys: '',
            img: require('../../assets/ico1.png'),
            onColor: '#333',
            offColor: '#999',
            checked: true,
            keywords:''
        }
    },
    computed: {
        ...mapState({
            pageNum: state => state.pageNum,
            totalSize: state => state.totalSize,
            pageSize: state => state.pageSize,
            currentId: state => state.currentId,
            sys:state => state.res,
        })
    },
    props: ['sysTrees'],
    methods: {
        search(val) {
            console.log(val)
            this.$store.dispatch('searchInfo', val)
        },
        searchSys() {

        },
        changeKey(key) {
            
            this.keywords = key;
            console.log('xxxx' + this.keywords)
        },
        changeID(id) {
            // console.log('xxxx' + id)
            this.$store.commit('changeID', id)
        },
        showHover() {

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
        }
    }
}
</script>

<style>
ul {
    list-style: none;
    padding: 0;
}


li {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin: 10px 0;
}
section:nth-of-type(2){
    min-height: 600px;
}

.cul {
    padding-left: 40px;
}

.liBg {
    padding: 5px 0;
}

.liBg:hover {
    cursor: pointer;
    background-color: #eee
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

.sys_info {
    display: inline-block;
    height: 151px;
    width: 45%;
    border: 1px solid #d8dcf0;
    padding: 15px;
    margin: 15px 0;
    position: relative;
}

.sys_info:nth-of-type(2n) {
    margin-left: 15px;
    float: right;
}

.sys_info img {
    padding: 20px;
    background-color: #f7f8fd;
    float: left;
    vertical-align: top;
}

.detail {
    /* display: inline-block; */
    margin-left: 15px;
    overflow: hidden;
}

.title {
    font-size: 16px;
    font-weight: 700;
}

.dtitle {
    color: #999;
    font-size: 12px;
    display: inline-block;
    width: 120px;
}

.desc {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.system-hover {
    background-color: #7c88cc;
    color: #fff;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 5px 0;
    padding-right: 10px;
    box-sizing: border-box;
    /* display: none; */
    opacity: 0;
    transition-duration: 0.618s;
}

.system-hover:hover {
    opacity: 1
}

.system-hover p {
    float: right;
    margin: 0;
}

.system-hover p span {
    margin: 0 5px;
}

.system-hover p span:hover {
    cursor: pointer;
}
</style>
