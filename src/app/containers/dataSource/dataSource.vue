<template>
    <v-content id="title" title="元数据管理">
        <mains :sysTrees='sysTrees'></mains>
    </v-content>
</template>

<script>
import Content from '../../components/Content.vue';
import axios from '../../utils/axios';
import Mains from '../../components/Mains'
export default {
    components: {
        Mains,
        vContent: Content,
    },
    data() {
        return {
            sysTrees: []
        }
    },
    mounted() {
        axios.post('/data-open-web/metadata/datasource/query', 'busiObj', {
            "headers": {
                "content-type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            this.sysTrees = res.data.dataSet.children
            console.log(this.sysTrees)
        })
    },
}
</script>
<style scoped>

</style>


