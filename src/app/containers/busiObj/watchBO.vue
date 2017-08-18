<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :currentId='currentId' :readonly='readonly' :opObj='opObj'></m-form>
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
            readonly:true
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
    }
}
</script>
