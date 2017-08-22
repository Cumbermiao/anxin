<template>
    <div class="cForm">
        <form>
            <i class="fa fa-close fa-lg" style="float:right"></i>
            <h3>创建数据字段</h3>
            <div class="form-group">
                <label class="lWidth">字段名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="sjzd.zdm" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">字段中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="sjzd.zdzwjc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">字段类型
                    <span class="required">*</span>
                </label>
                <select class="inWidth" v-model="sjzd.zdlx">

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
                <input class="inWidth" v-model="sjzd.zdmrz" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">是否主键
                    <span class="required">*</span>
                </label>
                <select v-model="sjzd.sfzj">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">是否为空
                    <span class="required">*</span>
                </label>
                <select v-model="sjzd.sfwk">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">是否唯一
                    <span class="required">*</span>
                </label>
                <select v-model="sjzd.sfwy">
                    <option value="1">是</option>
                    <option value="0">否</option>
                </select>
            </div>

            <div class="form-group">
                <label class="lWidth">描述
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" v-model="sjzd.zdms" rows="6"></textarea>
            </div>

            <div class="form-group">
                <label class="lWidth">备注
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" v-model="sjzd.bz" rows="6"></textarea>
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
            sjzd: {
                bz: '',
                // sfqy: '',
                sfwk: '',
                sfwy: '',
                sfzj: '',
                wid: '',
                zdlx: '',
                zdm: '',
                zdmrz: '',
                zdms: '',
                zdzwjc: '',
            },

        }
    },
    props: ['list', 'opObj', 'formShow'],
    methods: {
        sure() {
            console.log('this.sjzd.zdm')
            console.log(this.sjzd.zdm)
            if (this.sjzd.zdm && this.sjzd.zdzwjc && this.sjzd.zdlx && this.sjzd.zdmrz && this.sjzd.sfzj && this.sjzd.sfwk && this.sjzd.sfwy &&
                this.sjzd.zdms && this.sjzd.bz) {
                this.$emit('isShow', false)
                this.$emit('surenew', this.sjzd)
            } else {
                alert('请填写完整')
            }
        },
        cancel() {
            this.$emit('isShow', false)
        }
    },
    updated() {
        if (this.opObj) {
            this.sjzd = this.opObj
        }
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
