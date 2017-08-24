<template>
    <div class="cForm">
        <form>
            <h3>数据字段</h3>
            <div class="form-group">
                <label class="lWidth">字段名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="zdm" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">字段中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="zdzwjc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">字段类型
                    <span class="required">*</span>
                </label>
                <select class="inWidth" v-model="zdlx">

                    <!--  -->
                    <option v-for="item in list" :key="item" :value="item.dataValue" v-text="item.dataName"></option>
                </select>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">字段默认值
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="zdmrz" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">是否主键
                    <span class="required">*</span>
                </label>
                <select v-model="sfzj" @change="change">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">是否为空
                    <span class="required">*</span>
                </label>
                <select v-model="sfwk">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">是否唯一
                    <span class="required">*</span>
                </label>
                <select v-model="sfwy">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">描述
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" v-model="zdms" rows="6"></textarea>
            </div>

            <div class="form-group">
                <label class="lWidth">备注
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" v-model="bz" rows="6"></textarea>
            </div>
        </form>
        <div class="btn-group">
            <label class="lWidth"></label>
            <button class="button" @click="sure">确定</button>
            <button class="button" @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

            bz: '',
            sfwk: '',
            sfwy: '',
            sfzj: '',
            wid: '',
            zdlx: '',
            zdm: '',
            zdmrz: '',
            zdms: '',
            zdzwjc: '',
            opArr: []

        }
    },
    // 'opObj', 
    props: ['list', 'formShow', 'zdobj'],
    methods: {
        change() { },
        sure() {
            var val = {
                bz: this.bz,
                sfzj: this.sfzj,
                sfwk: this.sfwk,
                sfwy: this.sfwy,
                wid: this.wid,
                zdlx: this.zdlx,
                zdm: this.zdm,
                zdmrz: this.zdmrz,
                zdms: this.zdms,
                zdzwjc: this.zdzwjc,
                opArr: this.opArr
            }
            console.log('this.sjzd')
            console.log(val)
            this.$emit('isShow', false)
            this.$emit('save', val)

        },
        cancel() {
            this.$emit('isShow', false)
        }
    },
    mounted() {
        console.log('this.zdobj!!!!!!!')
        console.log(this.zdobj)
        if (this.zdobj) {
            this.bz = this.zdobj.bz
            this.sfwk = this.zdobj.sfwk
            this.sfwy = this.zdobj.sfwy
            this.sfzj = this.zdobj.sfzj
            this.wid = this.zdobj.wid
            this.zdlx = this.zdobj.zdlx
            this.zdm = this.zdobj.zdm
            this.zdmrz = this.zdobj.zdmrz
            this.zdms = this.zdobj.zdms
            this.zdzwjc = this.zdobj.zdzwjc
            this.opArr = this.zdobj.opArr
        }
        // if (this.opObj!={}) {
        //     console.log("this.opObj")
        //     console.log(this.opObj)
        //     this.bz = this.opObj.bz
        //     this.sfwk = this.opObj.sfwk
        //     this.sfwy = this.opObj.sfwy
        //     this.sfzj = this.opObj.sfzj
        //     this.wid = this.opObj.wid
        //     this.zdlx = this.opObj.zdlx
        //     this.zdm = this.opObj.zdm
        //     this.zdmrz = this.opObj.zdmrz
        //     this.zdms = this.opObj.zdms
        //     this.zdzwjc = this.opObj.zdzwjc
        //     this.opArr = this.opObj.opArr
        // }
    }
}
</script>

<style scoped>
.cForm {
    width: 800px;
}

.btn-group {
    margin: 20px 0;
}
</style>
