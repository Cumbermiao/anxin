<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :isModify='isModify' :currentId='currentId' :doList='doList' @modify='modify' :opObj='opObj'></m-form>
        </v-content>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form3 from '../../components/form3';
import axios from '../../utils/axios';
export default {
    data() {
        return {
            title: '业务对象管理',
            operation: '>修改',
            path: '/data/busiObj',
            
            isModify:true,
            doList:[]
        }
    },
    components: {
        Sheader,
        VContent: Content,
        mForm: form3
    },
    computed: {
        ...mapState({
            opObj: state => state.bo.opObj,
            currentId: state => state.bo.currentId
        })
    },
    methods: {
        modify(val) {
            this.$store.dispatch('updateBO', val)
        }
    },
    mounted(){
        axios.post('/metadata/dataobject/selectList',this.opObj.ysjYwdxflWid,{"headers":{"content-type":"application/json"}})
        .then((res=>{
            if(res.status==200&&res.data.returnStatus==1){
                this.doList=res.data.dataSet
            }else{
                alert('获取数据对象下拉列表失败')
            }
        })).catch((err)=>{
            alert('获取数据对象下拉列表失败')
        })
    }
}
</script>
