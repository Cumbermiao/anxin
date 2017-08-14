<template>
  <div class="search">
    <span class="search-input">
      <i class="search-icon" @click="search"></i>
      <input @keyup.enter="search" v-model="key" :placeholder="placeholder" type="text" />
    </span>
    <m-button @click.native="search">搜索</m-button>
  </div>
</template>
<script>
import Button from './Button';
export default {
  data() {
    return {
      key: ''
    }
  },
  props: {
    placeholder: String
  },
  components: {
    mButton: Button
  },
  methods: {
    search() {
      this.$emit('search', this.key);
    }
  }
}
</script>

