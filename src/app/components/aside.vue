<template>
  <div class="icon-item">
    <i class="fa fa-caret-right fa-lg" @click="operate"></i>
    {{text}}
    <div>
        <router-link :to='gotoCreate'>创建</router-link>
        <router-link :to='gotoWatch'>查看</router-link>
    </div>
  </div>
</template>

<script>
// @deprecated
export default {
  props: {
    text: String,
    gotoCreate:String,
    gotoWatch:String
  },
  methods:{
    operate(){

    }
  },
  computed: {
    isShowImg() { //src不存在时隐藏
      return this.src && this.src.length !== 0;
    },
    rightMargin() {
      return this.distance || this.width / 3
    }
  }
}
</script>

