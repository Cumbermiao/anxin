<template>
  <div class="search">
    <span class="search-input">
      <i class="search-icon" @click="search"></i>
      <input @change="changeKey" v-model="keywords" :placeholder="placeholder" type="text" />
    </span>
    <m-button @click.native="search">搜索</m-button>
  </div>
</template>
<script>
import Button from './Button';
export default {
  data() {
    return {
      keywords: ''
    }
  },
  props: {
    placeholder: String,
  },
  components: {
    mButton: Button
  },
  methods: {
    changeKey() {
      this.$emit('changeKey', this.keywords);
    },
    search(){
      this.$emit('search');
    }
  }
}
</script>

