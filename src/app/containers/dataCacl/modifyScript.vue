<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :opObj='opObj' :selectList='selectList' @save='modify'></m-form>
        </v-content>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form4 from '../../components/form4';
import axios from '../../utils/axios';
export default {
    components: {
        mForm: form4,
        VContent: Content,
        Sheader
    },
    data() {
        return {
            title: '计算脚本管理',
            operation: '>查看',
            path: '/datCacl/script',
            selectList:[],
        }
    },
    computed: {
        ...mapState({
            currentId: state => state.sp.currentId,
            opObj: state => state.sp.opObj
        })
    },
    methods:{
        modify(val){
            this.$store.dispatch('modifyScript',val)
        }
    },
    mounted() {
        console.log('opObj')
        console.log(this.opObj)
        axios.post('/metadata/datasource/selectList')
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    this.selectList = res.data.dataSet
                } else {
                    alert('获取数据源失败')
                }
            }).catch((err) => {
                alert('获取数据源失败')
            })
    }
}
</script>

<style scoped>

</style>
