<template>
  <div class="page">
      <button class="page-prev" @click="prev"><</button>
      <button class="page-next" @click="next">></button>
      <span class="page-range">{{range}}</span>
      <span class="page-total">总记录数 {{totalSize}}</span>
      <span class="page-jump">跳转至<input type="text" :value="page" @keyup.enter="go($event.target.value)" />页</span>
      <span class="page-size">
        <v-select
          label="每页显示"
          @change="pageSizeChange"
          :up="true"
          :items="[10, 20, 50, 100]">
        </v-select>
      </span>
  </div>
</template>
<script>
import Select from './Select.vue';
export default {
  components: {
    vSelect: Select
  },
  props: {
    totalSize: Number
  },
  data() {
    return {
      pageSize: 10,
      page: 1
    }
  },
  computed: {
    range() {
      const currentPage = Number(this.page);
      if(isNaN(currentPage) || currentPage <= 0) {
        return;
      }
      const start = (currentPage - 1) * this.pageSize + 1;
      const end = currentPage * this.pageSize;
      return `${start}-${end > this.totalSize ? this.totalSize : end}`;
    }
  },
  methods: {
    // 前一页
    prev() {
      this.go(this.page - 1);
    },
    // 下一页
    next() {
      this.go(this.page + 1);
    },
    go(page) { 
      const nextPage = Number(page);
      if(isNaN(nextPage) || nextPage <= 0) { // 上一页小于 0, 不处理
        return;
      }
      if ((nextPage - 1) * this.pageSize + 1 > this.totalSize) { // 下一页大于总数, 不处理
        return;
      }
      this.page = nextPage;
      this.$emit('pageChange', nextPage, this.pageSize);
    },
    pageSizeChange(size, idx) {
      this.pageSize = size;
    }
  },
  watch: {
    pageSize() {
      this.go(this.page);
    }
  }
}
</script>
