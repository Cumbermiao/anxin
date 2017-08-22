<template>
  <div class="icon-item">
    <div class="icons" v-if="isShowImg" :style="{marginRight: rightMargin + 'px'}">
      <slot>
        <img :width="width" :src="src" />
      </slot>
    </div>
    <div class="texts">{{text}} <span class="texts-num">{{count}}</span></div>
  </div>
</template>

<script>
// @deprecated
export default {
  props: {
    width: Number,
    src: String,
    text: String,
    distance: Number,
    count:Number
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

