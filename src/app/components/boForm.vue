<template>
    <div class="attrForm">
        <form>
            <h3>业务指标管理</h3>
            <div class="form-group">
                <label class="lWidth">数据字段
                    <span class="required">*</span>
                </label>
                <!--v-model="sjzdWid"  -->
                <select class="inWidth" @change="change">
                    <option v-for="item in sjzdList" :key="item" :value="item.wid" v-text="item.zdzwjc"></option>
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
                <input class="inWidth" v-model="attr.mc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">描述
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="attr.ms" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">备注
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="attr.bz" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">计算逻辑
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="attr.jslj" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
            <div class="form-group">
                <label class="lWidth">最后修改人
                </label>
                <input class="inWidth" v-model="attr.zhxgr" disabled type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">最后修改时间
                </label>
                <input class="inWidth" v-model="attr.zhxgsj" disabled type="text">
            </div>
        </form>
        <div class="btn-group">
            <label class="lWidth"></label>
            <button class="button" @click="save">确定</button>
            <button class="button" @click="cancel">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            zdm: '',

            // attr: {
            //     bz: '',
            //     sjzdWid: '',
            //     jslj: '',
            //     mc: '',
            //     ms: '',
            //     zhxgr: '',
            //     zhxgsj: '',
            // }
        }
    },
    computed: {
        attr() {
            if (this.opAttr) {
                console.log(this.opAttr)
                return this.opAttr
            } else {
                alert('kong')
                return {
                    bz: '',
                    sjzdWid: '',
                    jslj: '',
                    mc: '',
                    ms: '',
                    zhxgr: '',
                    zhxgsj: '',
                }
                
            }
        }
    },
    props: ['sjzdList', 'opAttr', 'formShow'],
    methods: {
        save() {
            console.log(this.attr)
            this.$emit('isShow', false)
            this.$emit('save', this.attr)
        },
        cancel() {
            this.$emit('isShow', false)
        },
        change() {
            console.log(this.attr.wid)
        }

    },
    // updated() {
    //     console.log('this.opAttr')
    //     console.log(this.opAttr)
    //     if (this.opAttr) {
    //         this.attr = this.opAttr
    //     }
    // }

}
</script>

<style scoped>
.btn-group {
    margin: 20px 0;
}


/* .attrForm{
    position:absolute;
    left: 10%;
    top:10%;
    background-color: #eee;
    z-index: 100
} */
</style>

