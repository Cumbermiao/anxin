<template>
    <div class="form">
        <form>
            <div class="types">
                <div class="marker"></div> 对象基本信息</div>
            <div class="form-group">
                <label class="lWidth">数据对象中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="doYsjSjdx.sjdxzwm" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
    
            <div class="form-group">
                <label class="lWidth">数据对象名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="doYsjSjdx.sjdxmc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
    
            <div class="form-group">
                <label class="lWidth">数据对象描述
                </label>
                <input class="inWidth" v-model="doYsjSjdx.sjdxms" type="text">
            </div>
    
            <div class="form-group">
                <label class="lWidth">是否启用
                    <span class="required">*</span>
                </label>
                <switch-b @isOpen='isOpen'></switch-b>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
    
            <div class="form-group">
                <label class="lWidth">备注
                </label>
                <textarea class="inWidth" rows="6" v-model="doYsjSjdx.bz"></textarea>
            </div>
        </form>
        <div class="types">
            <div class="marker"></div> 数据字段处理</div>
        <button class="button" @click='askForList'>创建</button>
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
                <td>{{item2.sfzj}}</td>
                <td>{{item2.sfwk}}</td>
                <td>{{item2.sfwy}}</td>
                <td>{{item2.zhxgr}}</td>
                <td>{{item2.zhxgsj}}</td>
                <td>
                    <button class="button" @click="modify(item2)">修改</button>
                    <button class="button" @click="remove(item2)">删除</button>
                </td>
            </tr>
        </table>
    
        <m-form v-show="formShow" :opObj='opObj' :list='list' @sure='sure'></m-form>
    
        <div class="btn-group">
            <button class="button" @click="save">保存</button>
            <a class="button" href="/data/obj">取消</a>
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
    props: ['currentId'],
    data() {
        return {
            
            // sjyWid 不用传,
            thead: ['字段名', '中文名', '字段类型', '默认值', '是否主键', '是否为空', '是否唯一', '最后修改人', '最后修改时间'],
            doYsjSjdx:{
                bz: this.bz,
                catalogWid: this.currentId,
                sfqy: this.sfqy,
                sjdxmc: this.sjdxmc,
                sjdxms: this.sjdxms,
                sjdxzwm: this.sjdxzwm
            },
            doYsjSjdxzds:[],
            list:[],
            opObj:{},//传递给数据字段的数据
            formShow:false
        }
    },
    methods: {
        isOpen(val) {
            if (val) {
                this.doYsjSjdx.sfqy = 1
            } else {
                this.doYsjSjdx.sfqy = 0
            }
        },
        save() {
            var val = {
                doYsjSjdx:this.doYsjSjdx,
                doYsjSjdxzds:this.doYsjSjdxzds
            }
            this.$emit('createDO', val)
        },
        askForList() {
            this.formShow=true;
            axios.post('/data-open-web/metadata/datafields/DBDataTypeList', this.currentId, { "headers": { "content-type": "application/json" } })
                .then((res) => {
                    console.log('res')
                    this.list= res.data.dataSet
                    console.log(this.list)

                }).catch((err) => {
                    alert('获取业务指标下拉列表失败')
                })
                
        },
        sure(val){
            this.doYsjSjdxzds.push(val)
            console.log(this.doYsjSjdxzds)
        },
        modify(val){
            this.opObj=val;
            this.formShow=true;
        }
    },
    mounted() {

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
