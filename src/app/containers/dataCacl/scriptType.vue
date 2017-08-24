<template>
    <v-content id="title" title="计算脚本分类管理">
        <div class="home_content" style="position:relative">
            <section>
                <search-input placeholder="请输入对象分了名称关键词搜索" @search='searchSys'></search-input>
                <tree-node :sysTrees='sysTrees' @changeID="changeID" :indent='indent'></tree-node>
            </section>
            <section>
                <h3>业务分类信息</h3>
                <form>
                     <div class="form-group">
                        <label class="lWidth">名称</label>
                        <input class="inWidth" v-model="opObj.catalogName" required type="text">
                    </div> 
                    <div class="form-group">
                        <label class="lWidth">描述</label>
                        <input class="inWidth" v-model="opObj.catalogDesc" required type="text">
                    </div>
                    <div class="form-group">
                        <label class="lWidth">备注</label>
                        <input class="inWidth" v-model="opObj.bak" required type="text">
                    </div>
                    <div class="form-group">
                        <label class="lWidth">最后修改人</label>
                        <input class="inWidth" v-model="opObj.lastModifiedOperator" required type="text">
                    </div>
                    <div class="form-group">
                        <label class="lWidth">最后修改时间</label>
                        <input class="inWidth" v-model="opObj.lastModifiedTime" required type="text">
                    </div>
                </form>
                <div class="btn-group">
                    <label class="lWidth"></label>
                    <button class="button" @click="remove">删除</button>
                    <button class="button" @click="modify">修改</button>
                    <button class="button" @click="create">添加</button>
                </div>
            </section>
            <div v-show="isShow" class="background">
                <div class="create-form">
                    <div class="form-group">
                        <label class="lWidth">名称</label>
                        <input class="inWidth" v-model="mc" required type="text">
                    </div>
                    <div class="form-group">
                        <label class="lWidth">描述</label>
                        <input class="inWidth" v-model="ms" required type="text">
                    </div>
                    <div class="form-group">
                        <label class="lWidth">备注</label>
                        <input class="inWidth" v-model="bz" required type="text">
                    </div>
                    <div class="btn-group">
                        <label class="lWidth"></label>
                        <button class="button" @click="sure">确认</button>
                        <button class="button" @click="cancel">取消</button>
                    </div>
                </div>
            </div>
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
            indent:0,
            isShow: false,
            mc: '',
            ms: '',
            bz: '',
            zhxgr: '',
            zhxgsj: '',
            select: [],
            keywords: '',
            sysTrees: [],
            obj: {}
        }
    },
    computed: {
        ...mapState({
            
            currentId: state => state.st.currentId,
            //查询的服务信息
            sys: state => state.st.res,
            opObj: state => state.st.opObj,
        }),


    },

    methods: {
        searchSys() { },
        changeID(id) {
            console.log('changeid')
            console.log(id)
            console.log(this.opObj)
            this.$store.commit('changeSTId', id)
            this.$store.dispatch('SearchForST', id)
            this.obj = this.opObj
            console.log(this.obj)
        },
        modify() {
            this.$store.commit('modifyST', this.opObj)

        },
        remove() {
            console.log(this.currentId)
            this.$store.commit('removeST', this.currentId)
            // this.search();
        },
        create() {
            this.isShow=true;
        },
        sure() {
            var val={
                catalogName:this.mc,
                catalogDesc:this.ms,
                bak:this.bz,
                catalogObj:"computeScript",
                parentCatalogWid:this.currentId
            }
            this.$store.commit('createST', val)
        },
        cancel(){
            this.isShow=false;
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
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
}

.home_content section:first-child {
    width: 25%;
    border-right: 1px solid #d8dcf0;
    min-height: 600px;
}

.home_content section:last-child {
    width: 74%;
    min-height: 851px;
}

.btn-group {
    margin: 20px 0;
}

.btn-group .button:nth-of-type(1) {
    background-color: #f86c6b;
}

.btn-group .button:nth-of-type(2) {
    background-color: #4dbd74;
}

.btn-group .button:nth-of-type(3) {
    background-color: #20a8d8;
}

.background {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.create-form{
    background: #fff;
    width: 500px;
    box-sizing: border-box;
    padding: 20px;
    margin: 200px auto;
}
</style>
