<template>
    <div>
        <Sheader :title='title' :operation='operation'></Sheader>
        <v-content>
            <table>
                <tr>
                    <td class="td-title">数据源</td>
                    <td class="td-content"></td>
                    <td class="td-title">服务名称</td>
                    <td class="td-content"></td>
                    <td class="td-title"> 服务描述</td>
                    <td class="td-content"></td>
                </tr>
                <tr>
                    <td class="sql td-title">sql模板</td>
                    <td class="td-content" colspan="5"></td>
                </tr>
            </table>
    
            <div class="types">
                <div class="marker"></div> 入参</div>
            <data-table @pageChange="pageChange" @click="itemClick" :loading="loading" :columns="columns" :totalSize="totalSize" :rows="rows" />

             <div class="types">
                <div class="marker"></div> 出参</div>
            <data-table @pageChange="pageChange" @click="itemClick" :loading="loading" :columns="columns" :totalSize="totalSize" :rows="rows" />
        </v-content>
    </div>
</template>

<script>
import DataTable from '../../components/DataTable';
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import {mapActions, mapState, mapMutations} from 'vuex';


export default {
    data() {
        return {
            title: '实时查询服务管理',
            operation: '>查看',
            loading: true,
        }
    },
    components: {
        Sheader,
        vContent: Content,
        DataTable
    },
    computed: {
        ...mapState({
            rows: state => state.rows,
            totalSize: state => state.totalSize
        }),
        columns() {
            return [{
                key: 'number',
                title: '注册系统描述',
                width: 60,
                align: 'center'
            }, {
                key: 'number',
                title: '注册系统描述',
                width: 60,
                align: 'center'
            }, {
                key: 'number',
                title: '注册系统描述',
                width: 60,
                align: 'center'
            }, {
                key: 'number',
                title: '注册系统描述',
                width: 60,
                align: 'center'
            }]
        }
    },
    methods: {
        pageChange(page = 1, size = 10) {
            this.loading = true;
            this.queryList({
                pageSize: size,
                pageNumber: page,
                filter: this.keys
            }).then(() => this.loading = false);
        },
        itemClick(row, idx) {
            this.$router.push({ name: 'hostdetail', params: { id: row.id }, query: { name: row.name, ip: row.ip } })
        },
    }
}
</script>
<style scoped>
table {
    border-collapse: collapse;
    text-align: center;
}

td {
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid rgba(216, 220, 240, 1);
}

.td-title {
    width: 123px;
    height: 32px;
    background-color: #eee;
    background-color: rgba(240, 241, 249, 1);
    font-size: 12px;
    font-weight: 600
}

.td-content {
    width: 246px;
    height: 32px;
    background-color: rgba(247, 248, 252, 1);
}

.sql {
    height: 65px;
}
.marker {
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #999;
    vertical-align: middle;
    margin: 10px 0;
}

.types {
    font-size: 16px;
}
</style>
