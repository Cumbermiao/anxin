<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :currentId='currentId' :readonly='readonly' :opObj='opObj' :ywzbList='ywzbList'></m-form>
        </v-content>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form3 from '../../components/form3';
import axios from '../../utils/axios';
export default {
    data(){
        return{
            title:'业务对象管理',
            operation:'>查看',
            path:'/data/busiObj',
            readonly:true,
            ywzbList:[]
        }
    },
  components:{
        Sheader,
        VContent:Content,
        mForm:form3
    },
    computed:{
        ...mapState({
            opObj:state=>state.bo.opObj,
            currentId:state=>state.bo.currentId
        })
    },
    mounted(){
        axios.post('/data-open-web/metadata/busiIndicator/queryByDataWid',this.opObj.wid,{"headers":{"content-type":"application/json"}})
        .then((res=>{
            if(res.status==200&&res.data.returnStatus==1){
                this.ywzbList=res.data.dataSet
            }else{
                alert('获取业务指标失败')
            }
        })).catch((err)=>{
            alert('获取业务指标失败')
        })
    }
}
</script>
