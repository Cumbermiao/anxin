<template>
    <div class="attrForm">
        <form>
            <h3>业务指标管理</h3>
            <div class="form-group">
                <label class="lWidth">数据字段
                    <span class="required">*</span>
                </label>
                <select class="inWidth">
                    <option v-for="item in sjzdList" :key="item" v-text="item.zdzwjc"></option>
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
                <input class="inWidth" v-model="opAttr.mc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
             <div class="form-group">
                <label class="lWidth">描述
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="opAttr.ms" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
             <div class="form-group">
                <label class="lWidth">备注
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="opAttr.bz" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
             <div class="form-group">
                <label class="lWidth">计算逻辑
                    <span class="required">*</span>
                </label>
                <input class="inWidth" v-model="opAttr.jslj" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>
             <div class="form-group">
                <label class="lWidth">最后修改人
                </label>
                <input class="inWidth" v-model="zdm" required type="text">
            </div>
            <div class="form-group">
                <label class="lWidth">最后修改时间
                </label>
                <input class="inWidth" v-model="zdm" required type="text">
            </div>
        </form>
         <div class="btn-group">
              <label class="lWidth"></label>
            <button class="button" @click="createAttr">确定</button>
            <a class="button" href="/data/obj">取消</a>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            zdm:'',
            // attr:{
            //     bz:'',
            //     jslj:'',
            //     mc:'',
            //     ms:'',
            // }
        }
    },
    // computed:{
    //     attr(){
    //         if(this.opAttr!=''){
    //             return this.opAttr
    //         }
    //     }
    // },
    props:['sjzdList','opAttr'],
    methods:{
        createAttr(){
            this.$emit('createAttr',{opAttr:this.opAttr})
        }
    },
    
    
}
</script>

<style scoped>
.btn-group{
    margin:20px 0;
}
/* .attrForm{
    position:absolute;
    left: 10%;
    top:10%;
    background-color: #eee;
    z-index: 100
} */
</style>

