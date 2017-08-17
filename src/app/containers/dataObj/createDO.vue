<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form></m-form>
        </v-content>
    </div>
</template>

<script>
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form2 from '../../components/form2'
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
    }
}
</script>
<style scoped>

</style>

