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
                <select class="inWidth" :value='busiData.sjdxWid' :readonly='readonly'>
                    <!-- :selected='busiData.sjdxWid==aitem.wid?selected:unselected' -->
                    <option v-for="aitem in doList" :key="aitem" :value="aitem.wid"     v-text="aitem.sjdxzwm"></option>
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
                <label class="lWidth">中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="busiData.sjdxzwm" required type="text" :readonly='readonly'>
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
    props: ['currentId', 'doList', "opObj", 'readonly', 'isModify', 'ywzbList'],
    data() {
        return {
            dataObjWid: 0,//数据对象id
            busiData: {
                bz: "",
                mc: '',
                ms: '',
                sjdxzwm: "",
                sjdxWid: "",
                ysjYwdxflWid: this.currentId,
                zhxgr: '',
                zhxgsj: '',
            },
            busiAttrs: [],
            busiAttrs2: [],//修改时，存放删除的对象
            addBusiAttrs: [],//新增数组
            deleteBusiAttrWids: [],//删除数组
            updateBusiAttrs: [],//修改数组
            //操作数组，修改为0，新增为1，删除为2,
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

        deepCopy: function(source) {
            var result = {};
            for (var key in source) {
                if (source[key] instanceof Array) {
                    result[key] = source[key]
                } else if (source[key] == null) {
                    result[key] = null
                } else {
                    result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
                }

            }
            return result;
        },
        create() {
            if (this.isModify) {
                var that = this
                console.log('this.busiAttrs')
                console.log(this.busiAttrs)
                this.busiAttrs2.forEach((item) => {
                    if (item.opArr.indexOf(0) != -1 && item.opArr.indexOf(1) != -1 && item.opArr.indexOf(2) != -1) {
                        console.log('012不做操作')
                    } else if (item.opArr.indexOf(0) != -1 && item.opArr.indexOf(2)!=-1) {
                        that.deleteBusiAttrWids.push(item.wid)
                        console.log('02删除')
                    } else if (item.opArr.indexOf(1) != -1 && item.opArr.indexOf(2)!=-1) {
                        console.log('12不做操作')
                    } else if (item.opArr.indexOf(2) != -1) {
                        console.log('2删除')
                        that.deleteBusiAttrWids.push(item.wid)
                    }
                })
                this.busiAttrs.forEach((item) => {
                    if (item.opArr.indexOf(0) != -1 && item.opArr.indexOf(1) != -1 && item.opArr.indexOf(2) != -1) {
                        console.log('012不做操作')
                    } else if (item.opArr.indexOf(0) != -1 && item.opArr.indexOf(1)!=-1) {
                        that.addBusiAttrs.push(item)
                        console.log('01新增')
                    } else if (item.opArr.indexOf(0) != -1 && item.opArr.indexOf(2)!=-1) {
                        that.deleteBusiAttrWids.push(item.wid)
                        console.log('02删除')
                    } else if (item.opArr.indexOf(1) != -1 && item.opArr.indexOf(2)!=-1) {
                        console.log('12不做操作')
                    } else if (item.opArr.indexOf(0) != -1) {
                        console.log(item)
                        console.log('0修改')
                        that.updateBusiAttrs.push(item)
                    } else if (item.opArr.indexOf(1) != -1) {
                        console.log('1新增')
                        that.addBusiAttrs.push(item)
                    } else if (item.opArr.indexOf(2) != -1) {
                        console.log('2删除')
                        that.deleteBusiAttrWids.push(item.wid)
                    }
                })
                var val = {
                    busiData: this.busiData,
                    addBusiAttrs: this.addBusiAttrs,
                    updateBusiAttrs: this.updateBusiAttrs,
                    deleteBusiAttrWids: this.deleteBusiAttrWids
                }
                this.$emit('modify', val)
            } else {
                var val = {
                    busiData: this.busiData,
                    busiAttrs: this.busiAttrs
                }
                console.log('val')
                console.log(val)
                this.$emit('create', val)
            }

        },
        save(val) {
            val = this.deepCopy(val)
            console.log('val')
            console.log(val)
            var isRepeated = false;
            if (this.busiAttrs.length == 0) {
                this.busiAttrs.push(val)
                return;
            }
            var that = this
            console.log('this.busiAttrs')
            console.log(this.busiAttrs)
            // this.busiAttrs.push(val)
            this.busiAttrs.forEach(function(item) {
                if (item.mc == val.mc) {
                    var idx = that.busiAttrs.indexOf(item)
                    that.busiAttrs[idx] = val
                    isRepeated = true;
                    if (that.isModify) {
                        console.log(val)
                        val.opArr.push(0)
                        console.log(val)
                    }
                    return
                }
            })
            if (isRepeated == false) {
                if (that.isModify) {
                    console.log('val')
                    console.log(val)
                    val.opArr=[1]
                    console.log(val)
                }
                this.busiAttrs.push(val)
            }
            console.log('this.busiAttrs')
            console.log(this.busiAttrs)
        },
        askForList() {
            // dataObjWid
            this.formShow = true;
           
        },
        modify(param) {
            console.log('param')
            // alert('modify')
            console.log(param)
            this.opAttr = param;
            // if (this.isModify) {
            //     this.opAttr.opArr.push(0)
            //     console.log(this.opAttr)
            // }
            this.formShow = true;
        },
        remove(item) {
            if (this.isModify) {
                console.log(item)
                console.log(this.busiAttrs)
                item.opArr.push(2)
                this.busiAttrs2.push(item)
            }
            var idx = this.busiAttrs.indexOf(item)
            this.busiAttrs.splice(idx, 1)



        }
    },
    mounted() {
         axios.post('/metadata/datafields/query', this.busiData.sjdxWid, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    if (res.status == 200 && res.data.returnStatus == 1) {
                        console.log(res)
                        this.sjzdList = res.data.dataSet;
                        console.log('this.sjzdList')
                        console.log(this.sjzdList)
                    } else {
                        // alert('获取下拉列表失败')
                    }

                }).catch((err) => {
                    // alert('获取下拉列表失败')
                })

        console.log('this.doList')
        console.log(this.doList)

        if (this.opObj) {
            this.busiData = this.deepCopy(this.opObj);
            console.log('this.busiData')
            console.log(this.busiData)
            axios.post('/metadata/busiIndicator/queryByDataWid', this.busiData.wid, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    if (res.status == 200 && res.data.returnStatus == 1) {
                        console.log('res')
                        this.busiAttrs = res.data.dataSet;
                        if (this.isModify) {
                            this.busiAttrs.forEach((item) => {
                                item.opArr = []
                            })
                            console.log("this.busiAttrs")
                            console.log(this.busiAttrs)
                        }
                    } else {
                        // alert('获取业务指标下拉列表失败')
                    }
                }).catch((err) => {
                    // alert('获取业务指标下拉列表失败')
                })
        }


        
    }
}
</script>

<style scoped>
.form {
    position: relative;
}

td,
th {
    min-width: 100px;
}

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
