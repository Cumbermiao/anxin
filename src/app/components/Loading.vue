<template>
  <div class="loading" v-if="load">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    load: Boolean
  }
}
</script>
