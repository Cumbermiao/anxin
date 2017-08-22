<template>
    <div>
        <sheader :title="title" :path='path' :operation="operation"></sheader>
        <v-content>
            <m-form :isModify='isModify' :currentId='currentId' @create='update' :opObj='opObj' :opArr='opArr'></m-form>
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
            opArr:[],//操作数组，修改为0，新增为1，删除为2,
            isModify:true
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
        update(val) {
            this.$store.dispatch('updateBO', val)
        }
    }
}
</script>
