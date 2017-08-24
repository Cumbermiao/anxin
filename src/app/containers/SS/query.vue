<template>
    <v-content :title='title'>
        <div class="query">
            <div class="form-group">
                <label class="lWidth">数据源
                </label>
                <select class="inWidth" v-model="dataSourceWid">
                    <option v-for="item in list" :key="item" :value="item.wid" v-text="item.zcxtzwm"></option>
                </select>
            </div>
            <div class="form-group" style="margin-top:40px">
                <label class="lWidth">sql
                </label>
                <textarea class="inWidth" rows="8" v-model="sql"></textarea>
            </div>
            <div class="form-group">
                <label class="lWidth">
                </label>
                <button class="button">查询</button>
            </div>

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
                <pages :select='select' @changePageNum='skipTo' @changePageSize='changePageSize' :pageInfo='pageInfo'></pages>
            </div>
        </div>
        </div>
    </v-content>
</template>

<script>
import Sheader from '../../components/SSheader';
import Content from '../../components/Content';
import axios from '../../utils/axios';
import Pages from '../../components/Pages'
import { mapActions, mapState, mapMutations } from 'vuex';


export default {
    data() {
        return {
            title: '即时查询',
            loading: true,
            list: [],
            dataSourceWid: '',
            sql: '',
            outParams: [],
            testArr: [],
            select: [10, 20, 40],

            pageInfo: {
                totalSize: 0,
                pageNum: 1,
                pageSize: 10,
                pages: 0
            },

        }
    },
    components: {
        Sheader,
        vContent: Content,
        Pages
    },

    methods: {
        search() {
            var val = {
                dataSourceWid: this.dataSourceWid,
                pageNum: this.pageInfo.pageNum,
                pageSize: this.pageInfo.pageSize,
                sql: this.sql
            }
            axios.post('/api/realTimeQuery/getInOutParams', { dataSourceWid: this.dataSourceWid, sql: this.sql })
                .then((res) => {
                    if (res.status = 200 && res.data.returnStatus == 1) {
                        this.outParams = res.data.dataSet.outParams
                        console.log('outParams')
                        console.log(this.outParams)
                    }


                }).catch((err) => {
                    alert(err)
                })

            axios.post('/api/realTimeQuery/immediateQuery', val)
                .then((res) => {
                    if (res.status = 200 && res.data.returnStatus == 1) {
                        this.testArr = res.data.dataSet
                        // this.pageInfo=res.data.pageInfo
                        console.log('testArr')
                        console.log(this.testArr)
                    }
                }).catch((err) => {
                    alert(err)
                })
        },
        skipTo(pageNum) {
            this.pageInfo.pageNum = pageNum;
            this.search();
        },
        changePageSize(pageSize) {
            this.pageInfo.pageSize = pageSize;
            this.search()
        }
    },
    mounted() {
        axios.post('/metadata/datasource/selectList')
            .then((res) => {
                console.log('res')
                this.list = res.data.dataSet
                console.log(this.list)

            }).catch((err) => {
                alert('获取数据源下拉列表失败')
            })
    }
}
</script>
<style scoped>
.query {
    border: 1px solid rgba(216, 220, 240, 1);
    padding: 20px 0;
}

.result {
    margin-top: 40px;
}

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
