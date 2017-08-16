<template>
    <div>
        <Sheader :title="title" :operation="operation"></Sheader>
        <v-content>
            <m-form :dataSource='dataSource' :opObj='opObj' @save='modify'></m-form>
            <!-- <div class="btn-group">
                <button class="button" @click="modify({catalogWid:opObj.dataSourceWid,dataSourceWid,queryIntfDesc,queryIntfName,sqlTemplate})">保存</button>
                <a class="button" href="/">取消</a>
            </div> -->
        </v-content>
    </div>
</template>

<script>
import Sheader from '../../components/SSheader'
import form1 from '../../components/form1'
import Content from '../../components/Content'
import axios from '../../utils/axios';
import { mapActions, mapState, mapMutations } from 'vuex';


export default {
    data() {
        return {
            title: '数据源管理',
            operation: '>查看',
            dataSource:[],
        }
    },
    computed:{
        ...mapState({
            opObj:state=>state.home.opObj,
            pageNum: state => state.home.pageNum,
            totalSize: state => state.home.totalSize,
            keywords: state => state.home.keywords,
            pageSize: state => state.home.pageSize,
            currentId: state => state.home.currentId,
            dataSourceWid: state => state.home.dataSourceWid,
            catalogWid: state => state.home.currentId,
            inParams: state => state.home.inParams,
            outParams: state => state.home.outParams,
        })
    },
    components: {
        vContent: Content,
        mForm: form1,
        Sheader,
    },
    methods:{
        modify(val){
            this.$store.commit('modify',val)
        }
    },
    mounted() {
        console.log('xxx')
        axios.post('/data-open-web/metadata/datasource/selectList').then((res) => { 
            this.dataSource=res.data.dataSet 
            console.log(this.dataSource)
            })
        .catch((err) => { console.log(err) })
    }
}
</script>

<style scoped>

</style>

