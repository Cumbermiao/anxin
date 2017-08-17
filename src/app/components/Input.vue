<template>
    <div class="form-group">
        <label class="lWidth">服务名称
            <span class="required">*</span>
        </label>
        <input class="inWidth" :readonly='readonly' @blur="required" v-model="inputValue" required type="text">
        <div>
            <label class="lWidth"></label>
            <span class="invalidate">必填</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputValue:''
        }
    },
    props: ['readonly',]
}
</script>
<style scoped>
.form-group {
    margin-top: 20px;
}

.lWidth {
    display: inline-block;
    width: 100px;
    position: relative;
    padding-left: 8px;
}

.required {
    position: absolute;
    left: -5px;
    color: red;
}

.inWidth {
    width: 412px;
    padding: 5px 0;
    border-radius: 3px;
}

.notes {
    display: inline-block;
    vertical-align: top;
}

.notes p {
    margin: 0;
    margin-bottom: 5px;
    color: #666;
}
</style>

