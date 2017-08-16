<template>
    <div class="pages" v-show="pages>=1">
        <button class="pages-btn pages-prev" @click="prev">
            <</button>
                <div v-if="pageNum>=6" class="btn-group">
                    <input class="pages-btn" value="1" @click="skipTo($event)">
                    <input class="pages-btn" value="2" @click="skipTo($event)">
                    <input class="pages-btn" value="3" @click="skipTo($event)">
                    <input class="pages-btn" value="4" @click="skipTo($event)">
                    <input class="pages-btn" value="5" @click="skipTo($event)">
                    <input class="pages-btn" value="..." @click="skipTo($event)">
                    <input class="pages-btn" :value="pages">
                </div>
                <div v-else class="btn-group">
                    <input type="button" v-for="item in arr" class="pages-btn" @click="skipTo($event)" :value="item" :key="item">
                </div>
                <button class="pages-btn pages-next" @click="next">></button>
                <span class="skip"> 跳转至
                    <input type="text" v-model="skipPage"> 页 </span>
                <button class="pages-btn" @click="skipTos(skipPage)">GO</button>
    
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
            // arr: [],
            skipPage: ''
        }
    },
    props: ['select', 'pageInfo'],
    components: {
        vSelect: Select
    },
    computed: {
        ...mapState({
            // pageNum: state => state.pageNum,
            // totalSize: state => state.totalSize,
            // pages: state => state.pages,
        }),
        pageSize() {
            return this.pageInfo.pageSize
        },
        pageNum() {
            return this.pageInfo.pageNum
        },
        pages() {
            return this.pageInfo.pages

        },
        totalSize() {
            return this.pageInfo.totalSize
        },
        arr() {
            var arr1 = [];
            for (var i = 1; i < this.pages + 1; i++) {
                arr1.push(i)
            }
            console.log('arr1:' + arr1)
            return arr1
        },
        // pageInfo() {
        //     console.log('this.pageInfo')
        //     console.log(this.pageInfo.pages)
        //     return this.pageInfo
        // }
    },
    methods: {
        changePageSize(item, idx) {
            this.$emit('changePageSize',item)
            // this.$store.commit('changePageSize', item)
        },
        skipTo(e) {
            console.log(e.target.value)
            if (e.target.value < 1 || e.target.value > this.pages) {
                alert('超出范围！！！')
            } else {
                this.$emit('changePageNum', e.target.value)
            }
        },
        skipTos(val) {
            if (val < 1 || val > this.pages) {
                alert('超出范围！！！')
            } else {
                this.$emit('changePageNum', val)
            }
        },
        prev() {
            alert(this.pageInfo.pageNum)
            if (this.pageInfo.pageNum > 1) {
                this.pageInfo.pageNum += 1;
                this.$emit('changePageNum', this.pageInfo.pageNum)
            } else {
                alert('已经是首页！！！')
            }

        },
        next() {
            alert(this.pageInfo.pageNum)
            if (this.pageInfo.pageNum < this.pageInfo.pages) {
                this.pageInfo.pageNum += 1;
                this.$emit('changePageNum', this.pageInfo.pageNum)
            } else {
                alert('已经是最后一页！！！')
            }
        }
    },
    mounted() {

        // this.arr = [];
        // for (var i = 1; i < this.pages + 1; i++) {
        //     this.arr.push(i)
        // }
        // console.log('this.pageInfo')
        // console.log(this.pageInfo.pages)
    }
}
</script>

<style scoped>
.pages {
    margin-top: 40px;
}

.btn-group {
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

