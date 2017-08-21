<template>
    <!--业务对象基本信息 -->
    <div class="form">
        <div class="background">

        </div>
        <form>
            <div class="types">
                <div class="marker"></div> 业务对象基本信息</div>
            <div class="form-group">
                <label class="lWidth">数据对象
                    <span class="required">*</span>
                </label>
                <select class="inWidth" v-model="dataObjWid" :readonly='readonly'>
                    <option v-for="aitem in doList" :key="aitem" :value="aitem.wid" v-text="aitem.sjdxzwm"></option>
                </select>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">名称
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="busiData.mc" required type="text" :readonly='readonly'>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">描述
                </label>
                <input class="inWidth" v-model="busiData.ms" type="text" :readonly='readonly'>
            </div>

            <div class="form-group">
                <label class="lWidth">备注
                </label>
                <textarea class="inWidth" rows="6" v-model="busiData.bz" :readonly='readonly'></textarea>
            </div>
        </form>
        <div class="types">
            <div class="marker"></div> 业务指标管理</div>
        <button class="button" @click="askForList" v-show='!readonly' style="margin-bottom:20px;">创建</button>
        <table class="data-table">
            <tr>
                <!-- <th> <input type="checkbox"> </th> -->
                <th v-for="item in thead" :key="item" v-text="item"></th>
                <th v-show="!readonly">操作</th>
            </tr>
            <tr v-for="item2 in busiAttrs" :key="item2">
                <td>{{item2.mc}}</td>
                <td>{{item2.ms}}</td>
                <td>{{item2.jslj}}</td>
                <td>{{item2.bz}}</td>
                <td>{{item2.zhxgr}}</td>
                <td>{{item2.zhxgsj}}</td>
                <td v-show="!readonly">
                    <button class="button" @click="modify(item2)">修改</button>
                    <button class="button" @click="remove(item2)">删除</button>
                </td>
            </tr>
        </table>

        <m-form v-show="formShow" :formShow='formShow' @isShow='isShow' @save='save' :sjzdList='sjzdList' :opAttr='opAttr'></m-form>
        <div class="btn-group" v-show="!readonly">
            <button class="button" @click="create">保存</button>
            <a class="button" href="#/data/busiObj">取消</a>
        </div>
    </div>
</template>
<script>
import router from '../../route'
import mForm from './boForm'
import switchB from './SwitchB'
import axios from '../utils/axios';
export default {
    components: {
        switchB,
        mForm,
    },
    props: ['currentId', 'doList', "opObj", 'readonly', 'opArr', 'isModify','ywzbList'],
    data() {
        return {
            dataObjWid: 0,//数据对象id
            busiData: {
                bz: "",
                mc: '',
                ms: '',
                sjdxzwm: "",
                sjdxWid: 0,
                ysjYwdxflWid: this.currentId,
                zhxgr: '',
                zhxgsj: '',
            },
            busiAttrs: [],
            opAttr: {},
            sjzdList: [],
            catalogWid: 0,//分类获取
            formShow: false,
            // sjyWid 不用传,
            thead: ['名称', '描述', '计算逻辑', '备注', '最后修改人', '最后修改时间'],

        }
    },
    methods: {
        isShow(val) {
            this.formShow = val;
        },
        isOpen(val) {
            if (val) {
                this.sfqy = 1
            } else {
                this.sfqy = 0
            }
        },
        deepCopy: function (source) {
            var result = {};
            for (var key in source) {
                result[key] = typeof source[key] === 'object' ? deepCoyp(source[key]) : source[key];
            }
            return result;
        },
        create() {
            var val = {
                busiData: this.busiData,
                busiAttrs: this.busiAttrs
            }
            this.$emit('create', val)
        },
        save(val) {
            val = this.deepCopy(val)
            var isRepeated = false;
            if (this.busiAttrs.length == 0) {
                this.busiAttrs.push(val)
                return;
            }
            var that = this
            this.busiAttrs.forEach(function (item) {
                if (item.zdm == val.zdm) {
                    var idx = that.busiAttrs.indexOf(item)
                    that.busiAttrs[idx] = val
                    isRepeated = true;
                    return
                }
            })
            if (isRepeated == false) {
                this.busiAttrs.push(val)
            }
        },
        askForList() {
            // dataObjWid

            if (this.isModify) {
                this.opAttr.opArr.push('modify')
            }
            this.formShow = true;
            axios.post('/data-open-web/metadata/datafields/query', this.dataObjWid, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    console.log(res)
                    this.sjzdList = res.data.dataSet;
                    console.log('this.sjzdList')
                    console.log(this.sjzdList)
                }).catch((err) => {
                    alert('获取下拉列表失败')
                })
        },
        modify(param) {
            console.log('param')
            console.log(param)
            if (this.isModify) {
                this.opAttr.opArr.push('0')
            }
            this.opAttr = param;
            this.formShow=true;
        },
        remove(item) {
            if (this.isModify) {
                this.opAttr.opArr.push('2')
            }
            var idx = this.busiAttrs.indexOf(item)
            this.busiAttrs.splice(idx,1)

        }
    },
    beforeMount() {
        if (this.opObj) {
            this.busiData = this.opObj;
            axios.post('/data-open-web/metadata/busiIndicator/queryByDataWid', this.busiData.wid, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    console.log('res')
                    this.busiAttrs = res.data.dataSet;
                    this.busiAttrs.opArr = [-1];
                    console.log(this.busiAttrs)

                }).catch((err) => {
                    alert('获取业务指标下拉列表失败')
                })
        }
        if(this.ywzbList){
            console.log('this.ywzbList')
            console.log(this.ywzbList)
            this.busiAttrs=this.ywzbList
        }
    }
}
</script>

<style scoped>
.form {
    position: relative;
}
td,th{
    min-width: 100px;
}








/* .background{
    position:absolute;
    height: 100%;
    width: 100%;
    background:rgba(0, 0, 0, 0.3)
} */

.btn-group {
    margin: 20px 0;
}

.marker {
    display: inline-block;
    width: 4px;
    height: 16px;
    background-color: #999;
    vertical-align: middle;
    margin: 10px 0;
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
</style>
