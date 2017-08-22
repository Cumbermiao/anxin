
<template>
    <div>
        <sheader :path='path' :title="title" :operation="operation"></sheader>
        <v-content>
            <add :select='select' @save='create' @test='test' :readonly='readonly' :opObj='opObj'></add>
        </v-content>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Content from '../../components/Content';
import Input from '../../components/Input';
import Sheader from '../../components/SSheader';
import axios from '../../utils/axios';
import add from '../../components/add'
export default {
    data() {
        return {
            title: '数据源管理',
            operation: '>查看',
            readonly: true,
            select: [],
            path:'/data/source'
        }
    },
    components: {
        vContent: Content,
        Sheader,
        add
    },
    computed: {
        ...mapState({
            opObj: state => state.ds.opObj
        })

    },
    methods: {
        create(val) {
            this.$store.commit('createDS', val)
        },
        test(val) {
            this.$store.commit('testDS', val)
        }
    },
    mounted() {
        axios.post('/metadata/sysdatadic/DBTypeList')
            .then((res) => {
                if (res.status == 200 && res.data.returnStatus == 1) {
                    this.select = res.data.dataSet;
                    console.log(this.select)
                } else {
                    alert('获取下拉列表失败！！！')
                }
            }).catch((err) => {
                alert('获取下拉列表失败！！！')
            })
    }

}
</script>

<style scoped>

</style>
