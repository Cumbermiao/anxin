<template>
    <div>
        <form>
            <div class="form-group">
                <label class="lWidth">数据库
                    <span class="star">*</span>
                </label>
                <select class="inWidth">
                    <option>opt1</option>
                    <option>opt2</option>
                    <option>opt3</option>
                </select>
            </div>
            <div class="form-group">
                <label class="lWidth">服务名称
                    <span class="star">*</span>
                </label>
                <input class="inWidth" type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">服务描述
                    <span class="star">*</span>
                </label>
                <input class="inWidth" type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">服务名称
                    <span class="star">*</span>
                </label>
                <textarea class="inWidth" rows="6"></textarea>
                <div class="notes">
                    <p>sql模板填写说明:</p>
                    <p>1.所有得表和子查询必须有别名；</p>
                    <p>2.所有查询和条件中得字段必须带有别名</p>
                    <p>参数格式:#{paramName}</p>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth"></label>
                <button class="button">测试</button>
            </div>
    
            <div class="types">
                <div class="marker"></div> 入参</div>
            <div class="form-group">
                <label class="lWidth">是否分页
                    <span class="star">*</span>
                </label>
                <input type="radio" name="fenye" @click="pagination=true">是
                <input type="radio" name="fenye" @click="pagination=false">否
            </div>
            <div v-if="pagination">
                <div class="form-group">
                    <label class="lWidth">页码
                        <span class="star">*</span>
                    </label>
                    <input class="inWidth" type="text">
                </div>
                <div class="form-group">
                    <label class="lWidth">每页条数
                        <span class="star">*</span>
                    </label>
                    <input class="inWidth" type="text">
                </div>
            </div>
    
            <div v-else class="form-group">
                <label class="lWidth">限制查询条数
                    <span class="star">*</span>
                </label>
                <input class="inWidth" type="text">
                <div class="notes">
                    <p>不超过1000</p>
                </div>
            </div>
    
            <div class="form-group">
                <label class="lWidth">技术主键
                    <span class="star">*</span>
                </label>
                <input class="inWidth" type="text">
                <div class="notes">
                    <p>参数名: wid 参数类型： int</p>
                </div>
            </div>
        </form>
    
        <div class="types">
            <div class="marker"></div> 结果</div>
        <data-table @pageChange="pageChange" @click="itemClick" :loading="loading" :columns="columns" :totalSize="totalSize" :rows="rows" />
    </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
import DataTable from './DataTable';
import Content from './Content.vue';
export default {
    data() {
        return {
            title: '数据源管理',
            operation: '新增',
            pagination: 'true',
            loading: true,
            totalSize:200,
        }
    },
    components: {
        vContent: Content,
        DataTable
    },
    computed: {
        // ...mapState({
        //     rows: state => state.hosts.rows,
        //     totalSize: state => state.hosts.totalSize
        // }),
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
.form-group {
    margin: 5px 0;
}

input,
textarea {
    padding: 0;
    border: 1px solid rgb(169, 169, 169);
}

textarea {
    resize: none;
}

.lWidth {
    display: inline-block;
    width: 100px;
    position: relative;
    padding-left: 8px;
}

.star {
    position: absolute;
    left: -5px;
    color: red;
}

.inWidth {
    width: 412px;
    padding: 5px 0;
    border-radius: 3px;
}

textarea {
    vertical-align: top;
}

.notes {
    display: inline-block;
    vertical-align: top;
}

.notes p {
    margin: 0;
    margin-bottom: 5px;
    color: #666;
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

input[type=radio] {
    margin-left: 20px;
}
</style>

