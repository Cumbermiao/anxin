<template>
    <div>
        <Sheader :title="title" :operation="operation"></Sheader>
        <v-content>
            <m-form :dataSource='dataSource'></m-form>
        </v-content>
    </div>
</template>

<script>
import Sheader from '../../components/SSheader'
import form1 from '../../components/form1'
import Content from '../../components/Content'
import axios from '../../utils/axios';


export default {
    data() {
        return {
            title: '数据源管理',
            operation: '新增',
            dataSource:[]
        }
    },
    components: {
        vContent: Content,
        mForm: form1,
        Sheader,
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

