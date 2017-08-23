<template>
    <div class="form">
        <form>
            <div class="types">
                <div class="marker"></div> 对象基本信息</div>
            <div class="form-group">
                <label class="lWidth">数据对象中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" :readonly='readonly' v-model="doYsjSjdx.sjdxzwm" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">数据对象名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" :readonly='readonly' v-model="doYsjSjdx.sjdxmc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">数据对象描述
                </label>
                <input class="inWidth" :readonly='readonly' v-model="doYsjSjdx.sjdxms" type="text">
            </div>

            <div class="form-group">
                <label class="lWidth">是否启用
                    <span class="required">*</span>
                </label>
                <switch-b @isOpen='isOpen' :readonly='readonly' :open='open'></switch-b>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth" >备注
                </label>
                <textarea class="inWidth" rows="6" :readonly='readonly' v-model="doYsjSjdx.bz"></textarea>
            </div>
        </form>
        <div class="types">
            <div class="marker"></div> 数据字段处理</div>
        <button class="button" @click='askForList' v-show="!readonly" style="margin-bottom:20px;">创建</button>
        <table class="data-table">
            <tr>
                <th v-for="item in thead" :key="item" v-text="item"></th>
                <th>操作</th>
            </tr>
            <tr v-for="item2 in doYsjSjdxzds" :key="item2">
                <td>{{item2.zdm}}</td>
                <td>{{item2.zdzwjc}}</td>
                <td>{{item2.zdlx}}</td>
                <td>{{item2.zdmrz}}</td>
                <td>{{item2.sfzj?'否':'是'}}</td>
                <td>{{item2.sfwk?'否':'是'}}</td>
                <td>{{item2.sfwy?'否':'是'}}</td>
                <td>{{item2.zhxgr}}</td>
                <td>{{item2.zhxgsj}}</td>
                <td v-show="!readonly">
                    <button class="button" @click="modify(item2)">修改</button>
                    <button class="button" @click="remove(item2)">删除</button>
                </td>
            </tr>
        </table>

        <m-form v-show="formShow" :formShow='formShow' @isShow='isShow' :opObj='opObj' :list='list' @surenew='surenew'></m-form>

        <div class="btn-group" v-show="!readonly" style="margin-top:20px;">
            <button class="button" @click="save">保存</button>
            <a class="button" href="#/data/obj">取消</a>
        </div>
    </div>
</template>
<script>
import mForm from './sjzdForm'
import switchB from './SwitchB'
import axios from '../utils/axios';
export default {
    components: {
        switchB,
        mForm,
    },
    props: ['currentId','readonly','sjzd','obj','idModify'],
    data() {
        return {
            sfqy:0,
            // sjyWid 不用传,
            thead: ['字段名', '中文名', '字段类型', '默认值', '是否主键', '是否为空', '是否唯一', '最后修改人', '最后修改时间'],
            doYsjSjdx: {
                bz:'',
                catalogWid:this.currentId,
                sfqy: 0,
                sjdxmc: '',
                sjdxms: '',
                sjdxzwm: ''
            },
            doYsjSjdxzds: [],//新建的数据字段数组
            doYsjSjdxzds2:[],//存放所有被删除的数组

            addDoYsjSjdxzds:[],//新增数组
            delelteDoYsjSjdxzds:[],//删除数组
            updateDoYsjSjdxzds:[],//修改数组
            list: [],//下拉列表
            opObj: {},//传递给数据字段的数据对象
            formShow: false,
            // open:false
            // 操作数组，修改为0，新增为1，删除为2,
        }
    },
    computed:{
        open(){
            if(this.doYsjSjdx.sfqy==1){
                return true
            }else{
                return false
            }
        }
    },
    methods: {
        isOpen(val) {
                this.doYsjSjdx.sfqy = val
        },
        save() {
            var val = {
                doYsjSjdx: this.doYsjSjdx,
                doYsjSjdxzds: this.doYsjSjdxzds
            }
            this.$emit('createDO', val)
        },
        askForList() {
            this.formShow = true;
            axios.post('metadata/datafields/DBDataTypeList', this.currentId, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    console.log('res')
                    this.list = res.data.dataSet
                    console.log(this.list)

                }).catch((err) => {
                    alert('获取业务指标下拉列表失败')
                })

        },
        deepCopy: function (source) {
            var result = {};
            for (var key in source) {
                result[key] = typeof source[key] ==='object'? this.deepCopy(source[key]): source[key];
            }
            return result;
        },
        surenew(val) {
            val = this.deepCopy(val)
            var isRepeated = false;
            if (this.doYsjSjdxzds.length == 0) {
                this.doYsjSjdxzds.push(val)
                console.log('this.doYsjSjdxzds')
                console.log(this.doYsjSjdxzds)
                return;
            }
            var that= this
            this.doYsjSjdxzds.forEach(function(item) {
                if (item.zdm == val.zdm) {
                    var idx = that.doYsjSjdxzds.indexOf(item)
                    that.doYsjSjdxzds[idx]=val
                    isRepeated = true;
                    return
                }
            })
            if (isRepeated == false) {
                this.doYsjSjdxzds.push(val)
            }
            console.log(this.doYsjSjdxzds)
        },
        modify(val) {
            this.opObj = val;
            this.formShow = true;
        },
        remove(val){
            var idx = this.doYsjSjdxzds.indexOf(val)
            this.doYsjSjdxzds.splice(idx,1)
            console.log(this.doYsjSjdxzds)
        },
        isShow(val){
            this.formShow=val
        }
    },
    mounted() {
        console.log("this.obj")
        console.log(this.obj)

        if(this.obj){
            this.doYsjSjdx=this.obj
        }
        console.log(this.open)
        if(this.sjzd){
            this.doYsjSjdxzds=this.sjzd
        }
    }
}
</script>

<style scoped>
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
