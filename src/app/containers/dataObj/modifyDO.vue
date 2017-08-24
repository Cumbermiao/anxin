<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :sjzd='sjzd' :obj='obj' :currentId='currentId' :isModify='isModify' @modifyDO='modifyDO'></m-form>
        </v-content>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import form2 from '../../components/form2';
import axios from '../../utils/axios';
export default {
    data() {
        return {
            title: '数据对象管理',
            operation: '>修改',
            path: '/data/obj',
            isModify: true,
            sjzd: []
        }
    },
    components: {
        Sheader,
        VContent: Content,
        mForm: form2
    },
    computed: {
        ...mapState({
            currentId: state => state.dob.currentId,
            obj: state => state.dob.opObj
        })
    },
    methods: {
        modifyDO(val) {
            alert('modify')
            this.$store.dispatch('modifyDO', val)
        }
    },
    mounted() {
        axios.post('/metadata/datafields/query', this.obj.wid, { "headers": { "content-type": "application/json" } })
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    this.sjzd = res.data.dataSet
                } else {
                    alert('获取数据字段失败')
                }
            }).catch((err) => {
                    alert('获取数据字段失败')
            })
    }
}
</script>
<style scoped>

</style>

