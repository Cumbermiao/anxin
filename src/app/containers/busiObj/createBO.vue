<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :doList='doList' :currentId='currentId' @create='createBO' :isCreate='isCreate'></m-form>
        </v-content>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form3 from '../../components/form33';
import axios from '../../utils/axios';
export default {
    data(){
        return{
            title:'业务对象管理',
            operation:'>新增',
            path:'/data/busiObj',
            doList:[],//数据对象下拉选项
            isCreate:true
        }
    },
    computed:{
        ...mapState({
            currentId:state=>state.bo.currentId,
            
        })
    },
    components:{
        Sheader,
        VContent:Content,
        mForm:form3
    },
    methods:{
        createBO(val){
            this.$store.dispatch('createBO',val)
        }
    },
    mounted(){
        axios.post('/metadata/dataobject/selectList',this.currentId,{"headers":{"content-type": "application/json"}})
        .then((res)=>{
            console.log(res)
            this.doList=res.data.dataSet;
            console.log(this.doList)
        }).catch((err)=>{
            alert('获取下拉列表失败')
        })
    }
}
</script>
<style scoped>

</style>

