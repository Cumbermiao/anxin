<template>
    <div>
        <form>
            <div class="form-group">
                <label class="lWidth">脚本名称
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="obj.scriptName" type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">数据源
                    <span class="required">*</span>
                </label>
                <select class="inWidth" v-model="obj.dataSourceWid">
                    <option v-for="item in selectList" :value="item.wid" :key="item" v-text="item.zcxtzwm" :selected='obj.wid==item.wid?selected:unselected'></option>
                </select>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">脚本中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="obj.scriptNameCn" type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">脚本描述
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" rows="6" v-model="obj.scriptDesc"></textarea>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">最后修改人
                    <span class="required">*</span>
                </label>
                <input class="inWidth" type="text" v-model="obj.lastModifiedOperator" disabled>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">最后修改时间
                    <span class="required">*</span>
                </label>
                <input class="inWidth" type="text" v-model="obj.lastModifiedTime" disabled>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">脚本内容
                    <span class="required">*</span>
                </label>
                <textarea class="inWidth" rows="6" v-model="obj.scriptContent"></textarea>
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

        </form>

        <div class="btn-group" v-show="!readonly">
            <label class="lWidth"></label>
            <button class="button" @click="save">保存</button>
            <a class="button" href="#/dataCacl/script">取消</a>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            selected:'selected',
            unselected:'',
            obj:{
                catalogWid:this.currentId
            }
        }
    },
    props: ['opObj', 'readonly','selectList','currentId'],
    methods: {
        save() {
            this.$emit('save',this.obj)
            console.log('this.obj')            
            console.log(this.obj)
         }
    },
    mounted(){
        if(this.opObj){
            this.obj=this.opObj
        }
    }
}
</script>

<style scoped>
.btn-group {
    margin: 20px 0;
}
</style>
