<template>
  <div class="content">
    <tab-navi 
      class="paper"
      :title="title" 
      :items="tabs" 
      :index="tabIndex" />
    <div class="main paper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TabNavi from './TabNavi';
import Content from './Content';
export default {
  props: {
    title: String,
    tabIndex: Number,
    tabs: Array
  },
  components: {
    vContent: Content,
    TabNavi
  }
}
</script>
