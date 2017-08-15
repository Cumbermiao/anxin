<template>
  <div class="pages">
    <button class="pages-btn pages-prev" @click="prev"><</button>
    <button class="pages-btn" >1</button>
    <button class="pages-btn" >2</button>
    <button class="pages-btn" >3</button>
    <button class="pages-btn" >4</button>
    <button class="pages-btn" >5</button>
    <button class="pages-btn" >...</button>
    <button class="pages-btn" >20</button>
    <button class="pages-btn pages-next" @click="next">></button>
    <span class="skip"> 跳转至 <input type="text"> 页 </span>
    <button class="pages-btn" >GO</button>

    <div class="totals"><span>共20页，198条记录，每页显示</span> <v-select :size="4" :up='up' :items='select'></v-select></div>
  </div>
</template>

<script>
import Select from './Select.vue';
export default {
    data(){
        return{
            up:true
        }
    },
    props:['select'],
    components:{
        vSelect:Select
    },
    computed:{
        
    },
  methods:{
      prev(){

      },
      next(){

      }
  }
}
</script>

<style>
.pages{
    margin-top: 40px;
}
.pages-btn{
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
.skip{
    color: #999;
}
.skip input{
    width: 40px;
    height: 26px;
    border: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.28);
    text-align: center;
}
.totals{
    float: right;
}
.totals span{
    color: #999;
}
</style>

