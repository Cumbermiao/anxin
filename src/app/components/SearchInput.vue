<template>
  <div class="search">
    <span class="search-input" style="margin: 0">
      <i class="search-icon" @click="search"></i>
      <input @keyup.enter="search" v-model="key" :placeholder="placeholder" type="text" />
    </span>
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

