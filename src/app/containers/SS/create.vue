<template>
    <div>
       <Sheader :title="title" :operation="operation"></Sheader>
        <v-content>
            <m-form></m-form>
        </v-content>
    </div>
</template>

<script>
import Sheader from '../../components/SSheader'
import form1 from '../../components/form1'
import Content from '../../components/Content'

export default {
    data() {
        return {
            title: '数据源管理',
            operation: '新增'
        }
    },
    components: {
        vContent: Content,
        mForm: form1,
        Sheader,
    }
}
</script>

<style scoped>

</style>

