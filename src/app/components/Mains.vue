<template>
    <div class="home_content">
        <section>
            <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
    
            <tree-node :sysTrees='sysTrees' @changeID="changeID" @search='search'></tree-node>
    
        </section>
        <section>
            <search placeholder="请输入对象分了名称关键词搜索" @changeKey='changeKey' @search='search'></search>
            <!--使用button跳转  -->
            <button class="button"  @click="toCreate">新建</button>
    
            <div class="background">
            </div>
            <div class="system">
                <div class="sys_info" v-for="(item,i) in sys">
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
                    </div>
                    <div class="system-hover">
                        <p>
                            <a href="#/home/watchSS" @click="changeOpObj(item)">查看</a>|
                            <a href="#/home/watchSS" @click="changeOpObj(item)">修改</a>|
                            <a href="javascript:;" @click="showRemove(i)">删除</a>
                        </p>
                    </div>
    
                    <div class="delete">
                        <h4>确认删除吗？</h4>
                        <button class="button margin" @click="remove(item,i)">确认</button>
                        <button class="button" @click="closeRemove(i)">取消</button>
                    </div>
    
                </div>
            </div>
            <pages :select='select' @changePages='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo' ></pages>
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
            select: [10, 20, 40],
            keys: '',
            img: require('../../assets/ico1.png'),
            onColor: '#333',
            offColor: '#999',
            checked: true,
            keywords: '',
            showCheck: false
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
            this.pageInfo.pageNum = val;
            this.$store.dispatch('searchInfo', { catalogWid: this.currentId, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize })
        },
        changePageSize(val){
            this.pageInfo.pageSize = val;
            this.$store.dispatch('searchInfo', { catalogWid: this.currentId, pageNum: this.pageInfo.pageNum, pageSize: this.pageInfo.pageSize })
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
            console.log('xxxx' + this.keywords)
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
        showRemove(e) {
            document.getElementsByClassName('background')[0].style.display = 'block';
            document.getElementsByClassName('delete')[e].style.display = 'block';
        },
        closeRemove(e) {
            document.getElementsByClassName('background')[0].style.display = 'none';
            document.getElementsByClassName('delete')[e].style.display = 'none';
        },
        remove(e, i) {
            this.$store.commit('remove', e.wid)
            this.closeRemove(i)
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

section:nth-of-type(2) {
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
    width: 45%;
    border: 1px solid #d8dcf0;
    margin-top: 20px;
}

.sys_info:nth-of-type(2n) {
    margin-left: 15px;
    float: right;
}

.sys_info img {
    padding: 20px;
    background-color: #f7f8fd;
    vertical-align: top;
    margin-left: 15px;
    margin-top: 15px;
}

.detail {
    display: inline-block;
    margin-left: 15px;
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

.background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    display: none;
}

.check,
.modify,
.delete {
    display: none;
    position: absolute;
    width: 200px;
    padding: 50px;
    background-color: #fff;
    left: 40%;
    top: 30%;
}

.check i {
    float: right;
}

.check i:hover {
    cursor: pointer;
}

.desc {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.system-hover {
    background-color: #7c88cc;
    color: #fff;
    width: 100%;
    margin-top: 15px;
    height: 25px;
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

.system-hover p a {
    text-decoration: none;
    color: #fff;
    margin: 0 5px;
}

.system-hover p a:hover {
    cursor: pointer;
}

.form-group {
    margin-top: 20px;
}

input,
textarea {
    padding: 0;
    border: 1px solid rgb(169, 169, 169);
}

textarea {
    resize: none;
    vertical-align: top;
}

.lWidth {
    display: inline-block;
    width: 100px;
    position: relative;
    padding-left: 8px;
}

.inWidth {
    width: 412px;
    padding: 5px 0;
    border-radius: 3px;
}

.delete {
    text-align: center;
}

.margin {
    margin-right: 50px;
}
</style>
