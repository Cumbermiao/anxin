<template>
    <div class="form">
        <form>
            <div class="form-group">
                <label class="lWidth">数据源
                    <span class="required">*</span>
                </label>
                 <!-- v-if="!this.opObj"    -->
                <select class="inWidth" name="wid" v-model="wid" @change="changeWid($event)" :disabled='readonly' >
                    <option v-for="item in dataSource" :key='item.zcxtzwm' :value='item.wid' :selected='wid==item.wid?"selected":""'>{{item.zcxtzwm}}</option>
                </select>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate"> {{requireWidText}}</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">服务名称
                    <span class="required">*</span>
                </label>
                <input class="inWidth" name="queryIntfName" :readonly='readonly' @blur="requireName(queryIntfName)" v-model="queryIntfName" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate"> {{requireQueryIntfName}}</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">服务描述
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="queryIntfDesc" @blur="requireDesc(queryIntfDesc)" :readonly='readonly' name="queryIntfDesc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate"> {{requireQueryIntfDesc}}</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">sql模板
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" rows="6" name="sql" @blur="requireSql(sqlTemplate)" :readonly='readonly' required v-model="sqlTemplate"></textarea>
                <div class="notes">
                    <p>sql模板填写说明:</p>
                    <p>1.所有得表和子查询必须有别名；</p>
                    <p>2.所有查询和条件中得字段必须带有别名</p>
                    <p>参数格式:#{paramName}</p>
                </div>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate"> {{requireSqlTemplate}}</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth"></label>
                <div class="button" @click="test">测试</div>
            </div>
        </form>
    
        <div v-show="isShow">
            <div class="types">
                <div class="marker"></div> 入参</div>
            <div class="form-group">
                <label class="lWidth">是否分页
                    <span class="required">*</span>
                </label>
                <input type="radio" checked name="fenye" @click="pagination=true">是
                <input type="radio" name="fenye" @click="pagination=false">否
            </div>
            <div v-if="pagination">
                <div class="form-group">
                    <label class="lWidth">页码
                        <span class="required">*</span>
                    </label>
                    <input class="inWidth" v-model="pageNum" type="text">
                </div>
                <div class="form-group">
                    <label class="lWidth">每页条数
                        <span class="required">*</span>
                    </label>
                    <input class="inWidth" v-model="pageSize" type="text">
                </div>
            </div>
    
            <div v-else class="form-group">
                <label class="lWidth">限制查询条数
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="count" @blur="checkCount" type="text">
                <div class="notes">
                    <p>不超过1000</p>
                </div>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate"> {{countInvalidate}}</span>
                </div>
    
            </div>
    
            <div class="form-group">
                <label class="lWidth">{{inParams.paramDesc}}
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="queryWid" type="text">
                <div class="notes">
                    <p>参数名: {{inParams.paramName}} 参数类型： {{inParams.dataType}}</p>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth"></label>
                <div class="button" @click="query">查询</div>
            </div>
            <div class="types">
                <div class="marker"></div> 结果</div>
            <!-- <data-table @pageChange="pageChange" @click="itemClick" :loading="loading" :columns="columns" :totalSize="totalSize" :rows="rows" />  -->
            <div class="data-table">
                <table>
                    <tr style="background:#f7f8fc">
                        <th v-for="item in outParams" :key="item">
                            {{item.paramName}}
                            <br> {{item.dataType}}
                            <br> {{item.paramDesc}}
                        </th>
                    </tr>
                    <tr v-for="item2 in testArr" :key="item2">
                        <td v-for="item3 in outParams" :key="item3" v-text="item2[item3.paramName]"></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="btn-group">
            <button class="button" @click="save">保存</button>
            <a class="button" href="/">取消</a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import DataTable from './DataTable';
import Content from './Content.vue';
// import axios from '../../utils/axios';d
export default {
    data() {
        return {
            title: '数据源管理',
            operation: '新增',
            pagination: 'true',
            loading: true,
            isShow: false,
            queryIntfName: '',
            queryIntfDesc: '',
            sqlTemplate: '',
            count: 100,
            //数据源id
            wid: '',
            rows: [],
            countInvalidate: '',
            requireWidText: '',
            requireQueryIntfName: '',
            requireQueryIntfDesc: '',
            requireSqlTemplate: '',
            //技术主键
            queryWid: '',
            pageSize:10


            // totalSize:200,
        }
    },
    props: ['dataSource', 'opObj','readonly'],
    components: {
        vContent: Content,
        DataTable
    },
    computed: {
        ...mapState({
            pageNum: state => state.home.pageNum,
            totalSize: state => state.home.totalSize,
            keywords: state => state.home.keywords,
            // pageSize: state => state.home.pageSize,
            currentId: state => state.home.currentId,
            sys: state => state.home.res,
            dataSourceWid: state => state.home.dataSourceWid,
            catalogWid: state => state.home.currentId,
            inParams: state => state.home.inParams,
            outParams: state => state.home.outParams,
            testArr: state => state.home.testArr
        }),

    },
    methods: {
        save() {
            
            var val = {
                catalogWid:this.catalogWid,
                dataSourceWid: this.wid,
                inParams: {
                    wid: this.queryWid,
                    pageSize: this.pagination?this.pageSize:this.count,
                    pageNum: this.pageNum
                },
                queryIntfDesc:this.queryIntfDesc,
                queryIntfName:this.queryIntfName,
                sqlTemplate: this.sqlTemplate,
                wid:this.opObj?this.opObj.wid:''
            }
            if (this.catalogWid == '') {
                alert('请返回上一级选择分类')
            } else {
                this.$emit('save',val)
            }
        },
        changeWid(e) {
            console.log('this.wid')
            this.$store.commit('changeWid', e.target.value)
            console.log(this.wid)
        },
        test() {
            if (this.wid != '' && this.queryIntfName != '' && this.queryIntfDesc != '' && this.sqlTemplate != '') {
                this.isShow = true;
                this.$store.dispatch('askForSql', { dataSourceWid: this.wid, sqlTemplate: this.sqlTemplate })
            } else {
                alert('请填写完整!')
            }

        },
        checkCount() {
            if (this.count > 1000) {
                this.countInvalidate = '查询条数不能超过1000'
            } else {
                this.countInvalidate = ''
            }
        },
        requireWid(val) {
            if (val == '') {
                this.requireWidText = '数据源不能为空'
            } else {
                this.requireWidText = ''
            }
        },
        requireName(val) {
            if (val == '') {
                this.requireQueryIntfName = '服务名称不能为空'
            } else {
                this.requireQueryIntfName = ''
            }
        },
        requireDesc(val) {
            if (val == '') {
                this.requireQueryIntfDesc = '服务描述不能为空'
            } else {
                this.requireQueryIntfDesc = ''
            }
        },
        requireSql(val) {
            console.log(val)
            if (val == '') {
                this.requireSqlTemplate = 'sql模板不能为空'
            } else {
                this.requireSqlTemplate = ''
            }
        },
        query() {
            var param = {
                dataSourceWid: this.wid,
                inParams: {
                    wid: this.queryWid,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                },
                sqlTemplate: this.sqlTemplate
            }
            this.$store.dispatch('testQuery', param)
        },
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

    },
    beforeMount() {
        // catalogWid,dataSourceWid,queryIntfDesc,queryIntfName,sqlTemplate
        console.log('this.opObj')
        console.log(this.opObj)
        console.log(this.wid)
        if (this.opObj) {
            this.wid = this.opObj.dataSourceWid;
            console.log(this.wid)
            this.queryIntfDesc = this.opObj.queryIntfDesc;
            this.queryIntfName = this.opObj.queryIntfName;
            this.sqlTemplate = this.opObj.sqlTemplate;
        }
    }

}
</script>

<style scoped>
.form-group {
    margin-top: 20px;
}

input,
textarea {
    padding: 0;
    border: 1px solid rgb(169, 169, 169);
}

textarea {
    resize: none;
    vertical-align: top;
}

.lWidth {
    display: inline-block;
    width: 100px;
    position: relative;
    padding-left: 8px;
}

.required {
    position: absolute;
    left: -5px;
    color: red;
}

.inWidth {
    width: 412px;
    padding: 5px 0;
    border-radius: 3px;
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

.invalidate {
    color: red;
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



.data-table {
    overflow-x: scroll;
}

table {
    border-collapse: collapse;
    color: #333;
    text-align: left;
}

th,
td {
    font-size: 12px;
    font-weight: 400;
    border: 1px solid #cacaca;
    padding: 14px 8px;
    white-space: nowrap;
}

.btn-group {
    margin-top: 20px;
    text-align: center;
}

.btn-group button {
    margin: 0 10px;
}

.button:first-child {
    background-color: #2196f3;
}

.button:first-child:active {
    background: #2271f2
}
</style>

