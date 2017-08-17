<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :currentId='currentId' @create='create'></m-form>
        </v-content>
    </div>
</template>

<script>
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form2 from '../../components/form2';
import {mapState} from 'vuex';
export default {
    data(){
        return{
            title:'数据对象管理',
            operation:'>新增',
            path:'/data/obj'
        }
    },
    components:{
        Sheader,
        VContent:Content,
        mForm:form2
    },
    computed:{
        ...mapState({
        currentId:state=>state.do.currentId
        })
    },
    methods:{
        create(val){
            this.$store.dispatch('createDO',val)
        }
    }
}
</script>
<style scoped>

</style>

