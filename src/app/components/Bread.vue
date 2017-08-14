<template>
  <div class="bread">
    <router-link
      v-for="(b, idx) in items"
      :key="b.path"
      :to="b.path">
      <span v-show="idx !== 0">/</span>
      {{b.title}}
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    items: Array
  }
}
</script>

