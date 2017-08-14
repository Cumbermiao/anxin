<template>
  <div>
    <!--<bread :items="bread" />-->
    <h4 v-if="title">
      {{title}}
      <i 
        v-if="icon" 
        @click="operator" 
        :class="['iconfont', icon]"
        style="cursor: pointer;color:#2196F3;">
      </i>
    </h4>
    <slot></slot>
  </div>
</template>

<script>
import Bread from './Bread';
export default {
  components: {
    Bread
  },
  props: {
    title: String,
    icon: String
  },
  computed: {
    bread() {
      return [];
      // return this.$route.matched.map(route => ({
      //   title: route.meta.title,
      //   path: route.path
      // }))
    }
  },
  methods: {
    operator() {
      this.$emit('iconClick');
    }
  }
}
</script>
