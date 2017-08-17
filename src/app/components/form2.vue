<template>
    <div class="form">
        <form>
            <div class="types">
                <div class="marker"></div> 对象基本信息</div>
            <div class="form-group">
                <label class="lWidth">数据对象中文名
                    <span class="required">*</span>
                </label>
                <input class="inWidth"   v-model="sjdxzwm" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">数据对象名
                    <span class="required">*</span>
                </label>
                <input class="inWidth"   v-model="sjdxmc" required type="text">
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">数据对象描述
                </label>
                <input class="inWidth"   v-model="sjdxms" type="text">
            </div>
            
            <div class="form-group">
                <label class="lWidth">是否启用
                    <span class="required">*</span>
                </label>
                <input  name="start"  type="radio">是
                <input name="start"  type="radio">否
                <div>
                    <label class="lWidth"></label>
                    <span class="invalidate">必填</span>
                </div>
            </div>

            <div class="form-group">
                <label class="lWidth">备注
                </label>
                <textarea class="inWidth" rows="6" v-model="bz"></textarea>
            </div>
        </form>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            bz: "",
            catalogWid: 0,//分类获取
            sfqy: 0,
            sjdxmc: "",
            sjdxms: "",
            sjdxzwm: "",
            // sjyWid 不用传
        }
    },
    computed:{
        ...mapState({
            currentId:state=>state.dob.currentId
        })
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
</style>
