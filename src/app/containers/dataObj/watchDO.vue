<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :readonly='readonly'  :obj='obj' :currentId='currentId' @createDO='createDO'></m-form>
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
            operation: '>查看',
            path: '/data/obj',
            readonly: true,
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
        createDO(val) {
            this.$store.dispatch('createDO', val)
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped>

</style>

