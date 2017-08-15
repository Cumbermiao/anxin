<template>
    <div class="pages" v-show="pages>=1">
        <button class="pages-btn pages-prev" @click="prev">
            <</button>
                <div v-if="pageNum>=6" class="btn-group">
                    <button class="pages-btn">1</button>
                    <button class="pages-btn">2</button>
                    <button class="pages-btn">3</button>
                    <button class="pages-btn">4</button>
                    <button class="pages-btn">5</button>
                    <button class="pages-btn">...</button>
                    <button class="pages-btn">{{pageNum}}</button>
                </div>
                <div v-else class="btn-group">
                    <button v-for="item in arr" class="pages-btn">{{item}}</button>
                </div>
                <button class="pages-btn pages-next" @click="next">></button>
                <span class="skip"> 跳转至
                    <input type="text" v-model="skipTo"> 页 </span>
                <button class="pages-btn">GO</button>
    
                <div class="totals">
                    <span>共{{pages}}页，{{totalSize}}条记录，每页显示</span>
                    <v-select :size="4" :up='up' :items='select' @change="changePageSize"></v-select>
                </div>
    </div>
</template>

<script>
import Select from './Select.vue';
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            up: true,
            arr:[],
            skipTo:''
        }
    },
    props: ['select'],
    components: {
        vSelect: Select
    },
    computed: {
        ...mapState({
            pageSize: state => state.pageSize,
            pageNum: state => state.pageNum,
            totalSize: state => state.totalSize,
            pages: state => state.pages,
        })
    },
    watch:{
        pages(newV,oldV){

            for(var i=1;i<newV+1;i++){
                this.arr.push(i)
            }
            console.log(this.arr)
        }
    },
    methods: {
        changePageSize(item, idx) {
            this.$store.commit('changePageSize', item)
        },
        prev() {

        },
        next() {

        }
    }
}
</script>

<style scoped>
.pages {
    margin-top: 40px;
}
.btn-group{
    display: inline-block;
}
.pages-btn {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    width: 36px;
    text-align: center;
    padding: 5px 0;
    border: 0;
    outline: none;
    background: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
}

.skip {
    color: #999;
}

.skip input {
    width: 40px;
    height: 26px;
    border: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
    text-align: center;
}

.totals {
    float: right;
}

.totals span {
    color: #999;
}
</style>

